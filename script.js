const puppeteer = require('puppeteer');
const images = require('./third.json');

(async () => {
  const browser = await puppeteer.launch();

  let no = 20;

  const allImages = images.map(async (image,i) => {
    const page = await browser.newPage();
    await page.goto(image.previewLink,{
      timeout: 3000000
    });
    const override = Object.assign(page.viewport(), {width: 1366});
    await page.setViewport(override);

    
    await page.screenshot({
      path: `images/${no++}-${image.name.toLowerCase().split(" ").join("-")}.png`,
      fullPage: true,
      omitBackground: true
    });

    await page.close();


  });

  Promise.all(allImages).then(() => {
    browser.close();
  });
  
})();