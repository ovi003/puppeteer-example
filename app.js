const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://technext.github.io/caviar/',{
    timeout: 3000000
  });
  const override = Object.assign(page.viewport(), {width: 1366});
  await page.setViewport(override);
  await page.screenshot({
  	path: 'images/caviar.png',
  	fullPage: true,
  	omitBackground: true
  });

  await browser.close();
})();