const puppeteer = require('puppeteer');

(async () => {
  // Create a browser instance
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  // Set viewport width and height
  await page.setViewport({ width: 1280, height: 720 });

  const website_url = 'http://localhost:8030/assets/static/output_html.html';

  const selector = 'section.page';
  // Open URL in current page
  //await page.goto(website_url, { waitUntil: 'networkidle0' });
  await page.goto(website_url);
  await page.waitForSelector(selector);
  const element = await page.$(selector);

  // Capture screenshot
//   await page.screenshot({
//     path: 'screenshot.jpg',
//   });
  await element.screenshot({
    path: 'screenshot.jpg',
  });
  // Close the browser instance
  await browser.close();
})();