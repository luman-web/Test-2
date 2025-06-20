try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      console.log("Puppeteer launched successfully.");
      const page = await browser.newPage();
      console.log("New page created.");
      // Navigate to example.com
      await page.goto('https://www.google.com', { waitUntil: 'networkidle2' });
      console.log("Navigated to https://example.com.");
      // Take a screenshot
      const screenshotBuffer = await page.screenshot({ fullPage: true });
      console.log("Screenshot taken.");
      await browser.close();
      console.log("Browser closed.");
      context.data.screenshotBuffer = screenshotBuffer
     } catch(err) {
       context.data.err = err.message
     }