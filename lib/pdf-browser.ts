/**
 * Shared Puppeteer browser launcher for PDF generation.
 * Uses @sparticuz/chromium on Vercel (serverless), falls back to regular puppeteer locally.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function launchBrowser(): Promise<any> {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    // Serverless environment (Vercel / AWS Lambda)
    const chromium = (await import("@sparticuz/chromium")).default;
    const puppeteerCore = (await import("puppeteer-core")).default;

    return puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: { width: 1280, height: 720 },
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  } else {
    // Local development — use full puppeteer with bundled browser
    const puppeteer = (await import("puppeteer")).default;
    return puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  }
}
