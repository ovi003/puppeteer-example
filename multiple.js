const puppeteer = require('puppeteer');
const images = require('./images.json');

(async () => {
  const browser = await puppeteer.launch();

  const allImages = images.map(async (image,i) => {
    const page = await browser.newPage();
    await page.goto(image.previewLink,{
      timeout: 3000000
    });
    const override = Object.assign(page.viewport(), {width: 1366});
    await page.setViewport(override);

    
    await page.screenshot({
      path: `images/${i+1}-${image.name.toLowerCase()}.png`,
      fullPage: true,
      omitBackground: true
    });

    await page.close();

  });

  Promise.all(allImages).then(() => {
    browser.close();
  });
  
})();