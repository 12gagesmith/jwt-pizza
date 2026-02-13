import { test, expect } from 'playwright-test-coverage';
import { basicInit } from './mocks';

test('orderPizza', async ({ page }) => {
    test.setTimeout(10000);
    await basicInit(page);
  
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('d@jwt.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('a');
    await page.getByRole('button', { name: 'Login' }).click();
    
    await page.waitForLoadState('networkidle');
    await page.getByRole('link', { name: 'Order' }).click();
    await page.waitForLoadState('networkidle');
    await page.getByRole('combobox').waitFor({ state: 'visible' });
    await page.getByRole('combobox').selectOption('4');
    await page.getByRole('link', { name: 'Image Description Pepperoni' }).click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByRole('button', { name: 'Pay now' }).click();
    await expect(page.getByText('Here is your JWT Pizza!')).toBeVisible();
  });