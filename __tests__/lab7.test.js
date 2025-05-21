describe('Basic user flow for Website', () => {
  beforeAll(async () => {
    await page.goto('https://cse110-sp25.github.io/CSE110-Shop/');
  });

  it('Initial Home Page - Check for 20 product items', async () => {
    const numProducts = await page.$$eval('product-item', (prodItems) => prodItems.length);
    expect(numProducts).toBe(20);
  });

  it('Make sure <product-item> elements are populated', async () => {
    const allArePopulated = await page.$$eval('product-item', (prodItems) => {
      return prodItems.every((item) => {
        const data = item.data;
        return data.title && data.price && data.image;
      });
    });
    expect(allArePopulated).toBe(true);
  }, 10000);

  it('Clicking the "Add to Cart" button should change button text', async () => {
    const prodItem = await page.$('product-item');
    const shadowRoot = await prodItem.getProperty('shadowRoot');
    const button = await shadowRoot.$('button');
    await button.click();
    const innerText = await (await button.getProperty('innerText')).jsonValue();
    expect(innerText).toBe('Remove from Cart');
  }, 2500);

  it('Checking number of items in cart on screen', async () => {
    const prodItems = await page.$$('product-item');
    for (const item of prodItems) {
      const shadowRoot = await item.getProperty('shadowRoot');
      const button = await shadowRoot.$('button');
      const innerText = await (await button.getProperty('innerText')).jsonValue();
      if (innerText !== 'Remove from Cart') {
        await button.click();
      }
    }
    const cartCount = await page.$eval('#cart-count', (el) => el.innerText);
    expect(cartCount).toBe('20');
  }, 15000);

  it('Checking number of items in cart on screen after reload', async () => {
    await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });
    const prodItems = await page.$$('product-item');
    for (const item of prodItems) {
      const shadowRoot = await item.getProperty('shadowRoot');
      const button = await shadowRoot.$('button');
      const innerText = await (await button.getProperty('innerText')).jsonValue();
      expect(innerText).toBe('Remove from Cart');
    }
    const cartCount = await page.$eval('#cart-count', (el) => el.innerText);
    expect(cartCount).toBe('20');
  }, 10000);

  it('Checking the localStorage to make sure cart is correct', async () => {
    const cart = await page.evaluate(() => localStorage.getItem('cart'));
    expect(cart).toBe(JSON.stringify(Array.from({ length: 20 }, (_, i) => i + 1)));
  });

  it('Checking number of items in cart on screen after removing from cart', async () => {
    const prodItems = await page.$$('product-item');
    for (const item of prodItems) {
      const shadowRoot = await item.getProperty('shadowRoot');
      const button = await shadowRoot.$('button');
      const innerText = await (await button.getProperty('innerText')).jsonValue();
      if (innerText !== 'Add to Cart') {
        await button.click();
      }
    }
    const cartCount = await page.$eval('#cart-count', (el) => el.innerText);
    expect(cartCount).toBe('0');
  }, 15000);

  it('Checking number of items in cart on screen after reload', async () => {
    await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });
    const prodItems = await page.$$('product-item');
    for (const item of prodItems) {
      const shadowRoot = await item.getProperty('shadowRoot');
      const button = await shadowRoot.$('button');
      const innerText = await (await button.getProperty('innerText')).jsonValue();
      expect(innerText).toBe('Add to Cart');
    }
    const cartCount = await page.$eval('#cart-count', (el) => el.innerText);
    expect(cartCount).toBe('0');
  }, 10000);

  it('Checking the localStorage to make sure cart is correct', async () => {
    const cart = await page.evaluate(() => localStorage.getItem('cart'));
    expect(cart).toBe('[]');
  });
});
