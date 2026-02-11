import { test, expect } from 'playwright-test-coverage';

test('orderPizzaAndVerify', async ({ page }) => {
    test.setTimeout(10000);
    await page.goto('http://localhost:5173/');
  
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('george@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('curious');
    await page.getByRole('button', { name: 'Login' }).click();
    
    await page.waitForLoadState('networkidle');
    await page.getByRole('link', { name: 'Order' }).click();
    await page.waitForLoadState('networkidle');
    await page.getByRole('combobox').waitFor({ state: 'visible' });
    await page.getByRole('combobox').selectOption('19');
    await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByRole('button', { name: 'Pay now' }).click();
    await page.getByRole('button', { name: 'Verify' }).waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'Verify' }).click();
    await page.waitForTimeout(500);
    await expect(page.getByRole('heading', { name: 'JWT Pizza - valid' })).toBeVisible();
  });