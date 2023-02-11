const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

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

  const pdf = await page.pdf({
    path: 'result.pdf',
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: false,
    format: 'A4',
  });

  const Config = {
    followNewTab: true,
    fps: 60,
    frames: 60 * 5, // 5 seconds at 60 fps
    ffmpeg_Path: null,
    videoFrame: {
      width: 800,
      height: 470,
    },
    videoCrf: 18,
    videoCodec: 'libx264',
    videoPreset: 'ultrafast',
    videoBitrate: 1000,
    autopad: {
      color: 'black' | '#35A5FF',
    },
    aspectRatio: '4:3',
    recordDurationLimit: 20000
  };
  const recorder = new PuppeteerScreenRecorder(page, Config);
  const savePath = 'demo.mp4';
  await recorder.start(savePath, {omitBackground: true});
  const time_need_to_record = 2;
  await sleep(time_need_to_record * 1000);
  await recorder.stop();
  // Close the browser instance
  await browser.close();

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
})();