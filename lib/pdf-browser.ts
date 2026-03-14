/**
 * Shared Puppeteer browser launcher for PDF generation.
 * Uses @sparticuz/chromium on Vercel (serverless), falls back to regular puppeteer locally.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function launchBrowser(): Promise<any> {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    // Serverless environment (Vercel / AWS Lambda)
    console.log("[PDF Browser] Launching in serverless mode (Vercel/Lambda)");
    const chromium = (await import("@sparticuz/chromium")).default;
    const puppeteerCore = (await import("puppeteer-core")).default;

    const execPath = await chromium.executablePath();
    console.log("[PDF Browser] Chromium path:", execPath);

    return puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: { width: 1280, height: 720 },
      executablePath: execPath,
      headless: true,
    });
  } else {
    // Local development — use full puppeteer with bundled browser
    console.log("[PDF Browser] Launching in local mode");
    const puppeteer = (await import("puppeteer")).default;

    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-gpu",
        ],
        timeout: 30000,
      });
      console.log("[PDF Browser] Local browser launched successfully");
      return browser;
    } catch (localErr) {
      console.error("[PDF Browser] Local puppeteer launch failed:", localErr);
      throw localErr;
    }
  }
}
