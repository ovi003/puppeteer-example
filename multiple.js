const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const urls = [
    {
      url: 'https://www.example.com',
      title: 'example'
    },
    {
      url: 'https://www.bing.com',
      title: 'bing'
    },
    {
      url: 'https://www.google.com',
      title: 'google'
    }
  ];

  const images = urls.map(async (image,i) => {
    const page = await browser.newPage();
    await page.goto(image.url,{
      timeout: 3000000
    });
    const override = Object.assign(page.viewport(), {width: 1366});
    await page.setViewport(override);

    
    await page.screenshot({
      path: `images/${image.title}.png`,
      fullPage: true,
      omitBackground: true
    });

    await page.close();

  });

  Promise.all(images).then(() => {
    browser.close();
  });
  
})();