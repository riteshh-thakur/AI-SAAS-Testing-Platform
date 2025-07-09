const TestRun = require('../models/TestRun');
const scrapeDOM = require('../utils/scrapeDOM');
const generatePlaywrightScript = require('../utils/langchainAgent');
const runScript = require('../utils/playwrightRunner');

// Helper: clean markdown and replace URL placeholders
const cleanScript = (script, url) => {
  return script
    .replace(/```javascript/g, '')
    .replace(/```/g, '')
    .replace(/<real URL>/g, url)
    .trim();
};

// POST /generate-tests
exports.generateTests = async (req, res) => {
  const { url } = req.body;
  try {
    console.log('📥 Received request to generate tests for URL:', url);

    // 1. Crawl the page and extract HTML
    const dom = await scrapeDOM(url);
    console.log('✅ DOM scraped successfully');

    // 2. Generate Playwright script using Langchain + Ollama
    let rawScript = await generatePlaywrightScript(dom);
    console.log('🔍 Raw AI Output:\n', rawScript);

    // 3. Clean script (remove markdown & insert real URL)
    const script = cleanScript(rawScript, url);
    console.log('✅ Cleaned Script:\n', script);

    // 4. Sanity check
    if (
      !script ||
      script.toLowerCase().includes('file:///') ||
      !script.includes('page.goto')
    ) {
      console.warn('⚠️ Generated script is invalid or incomplete');
      return res.status(400).json({
        message: 'Invalid script generated. Please try a different URL.',
      });
    }

    // 5. Save test in DB
    const test = await TestRun.create({
      url,
      script,
      status: 'pending',
    });

    console.log('💾 Test saved to DB with ID:', test._id);
    res.status(201).json(test);
  } catch (err) {
    console.error('❌ Error in generateTests:', err);
    res.status(500).json({ message: 'Failed to generate test', error: err.message });
  }
};

// POST /run-tests/:id
exports.runTestById = async (req, res) => {
  const { id } = req.params;

  try {
    const test = await TestRun.findById(id);
    if (!test) return res.status(404).json({ message: 'Test not found' });

    console.log(`▶️ Running test ID: ${id}`);

    const result = await runScript(test.script, test._id);

    const finalLogs = result.logs && result.logs.trim() !== ''
      ? result.logs
      : '⚠️ No logs were captured. Possible script failure.';

    const finalScreenshots = result.screenshots?.length > 0
      ? result.screenshots
      : [];

    test.logs = finalLogs;
    test.screenshots = finalScreenshots;

    test.status = (finalLogs.includes('❌') || finalScreenshots.length === 0)
      ? 'failed'
      : 'success';

    await test.save();

    console.log(`✅ Test execution completed. Status: ${test.status}`);
    res.json(test);
  } catch (err) {
    console.error('❌ Error in runTestById:', err);
    res.status(500).json({ message: 'Error executing test', error: err.message });
  }
};

// GET /results/:id
exports.getTestResultById = async (req, res) => {
  const { id } = req.params;
  try {
    const test = await TestRun.findById(id);
    if (!test) return res.status(404).json({ message: 'Test not found' });
    res.json(test);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch test result', error: err.message });
  }
};

// GET /results
exports.getAllResults = async (req, res) => {
  try {
    const tests = await TestRun.find().sort({ createdAt: -1 });
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tests', error: err.message });
  }
};
