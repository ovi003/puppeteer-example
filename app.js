
// var images = require('./images.json');
// images.map(function(image,i){
// 	console.log(image.previewLink);
// });
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  


  const page = await browser.newPage();
  await page.goto('https://technext.github.io/food-funday/',{
    timeout: 3000000
  });
  const override = Object.assign(page.viewport(), {width: 1366});
  await page.setViewport(override);

  const bodyHandle = await page.$('body');
  const { width, height } = await bodyHandle.boundingBox();
  const screenshot = await page.screenshot({
    clip: {
      x: 0,
      y: 0,
      width,
      height
    },
    path: 'images/food-funday.png'
  });

  await bodyHandle.dispose();

  await browser.close();
})();