const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// ✅ Clean AI response: Extract valid JS Playwright test code
function cleanScript(output) {
  return output
    .split('\n')
    .filter(line =>
      !line.startsWith('```') &&
      !line.toLowerCase().includes('please note') &&
      !line.toLowerCase().includes('require(') &&
      !line.toLowerCase().includes('playwright') &&
      !line.toLowerCase().includes('(async') &&
      !line.toLowerCase().includes('chromium') &&
      !line.toLowerCase().includes('browser.close') &&
      !line.toLowerCase().includes('make sure') &&
      !line.toLowerCase().includes('file:///') &&
      !line.toLowerCase().includes("here's") &&
      !line.toLowerCase().includes("as a qa") &&
      line.trim() !== ''
    )
    .map(line => line.trim())
    .join('\n');
}

// ✅ Check if Ollama is running locally
async function checkOllamaConnection() {
  try {
    const res = await fetch('http://127.0.0.1:11434');
    if (!res.ok) throw new Error('Ollama responded with an error.');
  } catch (err) {
    throw new Error('❌ Cannot connect to Ollama. Is it running on http://127.0.0.1:11434?');
  }
}

// ✅ LangChain-style prompt for OpenChat or Phi-3 model
async function generatePlaywrightScript(dom) {
  await checkOllamaConnection();

  const messages = [
    {
      role: "system",
      content: `You are a senior QA automation engineer.

Your job is to write valid, executable Playwright test scripts in JavaScript based on HTML DOM from a real webpage.

Strict Rules:
❌ DO NOT include:
- require/import statements
- any file:/// URLs
- comments or explanations
- (async ()=>{}) wrappers
- browser, context, or setup/teardown code
- expect(), test(), describe(), or any test runner syntax

✅ DO:
- Start with: await page.goto('<real URL>');
- Use only executable Playwright automation code
- Use selectors found in the DOM (like #login, .btn-primary, input[name="email"], etc.)
- Use: await page.click(...), await page.fill(...), await page.waitForSelector(...), etc.
- Use console.log() for assertions or checks instead of expect()

Output ONLY the test body – valid Playwright lines starting with Playwright commands.`
    },
    {
      role: "user",
      content: `HTML DOM:\n\n${dom.slice(0, 10000)}`
    }
  ];

  const res = await fetch("http://127.0.0.1:11434/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openchat", // or 'phi3' or your installed Ollama model
      messages,
      stream: false
    })
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`❌ Ollama error ${res.status}: ${errorText}`);
  }

  const data = await res.json();
  const raw = data.message?.content || '';

  const cleaned = cleanScript(raw);

  console.log("🔍 Raw AI Output:\n", raw);
  console.log("✅ Cleaned Script:\n", cleaned);

  if (!cleaned || cleaned.length < 10) {
    throw new Error('❌ Empty or invalid script generated. Try a simpler or more structured URL.');
  }

  return cleaned;
}

module.exports = generatePlaywrightScript;
