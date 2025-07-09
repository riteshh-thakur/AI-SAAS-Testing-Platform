// server/utils/playwrightRunner.js
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function runScript(scriptCode, testId) {
  const logs = [];
  const screenshots = [];

  // 🔧 Prepare artifact directory
  const testDir = path.join(__dirname, `../public/test-artifacts/${testId}`);
  fs.mkdirSync(testDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 🎯 Capture browser console logs
  page.on('console', (msg) => {
    logs.push(`${msg.type().toUpperCase()}: ${msg.text()}`);
  });

  // 🧾 Show the code being executed
  logs.push('🧾 Script to Execute:\n```javascript\n' + scriptCode + '\n```');

  // ✅ Wrap the user-provided script safely
  let wrappedScript;
  try {
    wrappedScript = new Function('page', `
      return (async () => {
        ${scriptCode}
      })();
    `);
  } catch (compileError) {
    logs.push(`❌ Script Compilation Error: ${compileError.message}`);
    await browser.close();
    return {
      logs: logs.join('\n'),
      screenshots,
    };
  }

  // 🧪 Run the script and try to capture screenshot
  try {
    await wrappedScript(page);

    // Capture screenshot even if no visual change
    const screenshotPath = path.join(testDir, 'final.png');
    await page.screenshot({ path: screenshotPath });
    screenshots.push(`/test-artifacts/${testId}/final.png`);

    logs.push('✅ Test completed successfully.');
  } catch (runtimeError) {
    logs.push(`❌ Runtime Error: ${runtimeError.message}`);

    // Attempt to screenshot even after failure
    try {
      const errorShotPath = path.join(testDir, 'error.png');
      await page.screenshot({ path: errorShotPath });
      screenshots.push(`/test-artifacts/${testId}/error.png`);
      logs.push('📸 Captured screenshot after error.');
    } catch (screenshotError) {
      logs.push('⚠️ Failed to capture screenshot after error: ' + screenshotError.message);
    }
  }

  await browser.close();

  // Final log fallback if nothing was captured
  if (screenshots.length === 0) {
    logs.push('⚠️ No screenshots captured.');
  }

  return {
    logs: logs.join('\n'),
    screenshots,
  };
}

module.exports = runScript;
