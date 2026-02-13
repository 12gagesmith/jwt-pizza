import {test, expect} from 'playwright-test-coverage';
import {basicInit} from './mocks';

test('viewFranchisePage', async ({page}) => {
    await basicInit(page);
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('f@jwt.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('franchisee');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForLoadState('networkidle');
    await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Everything you need to run an')).toBeVisible();
    await page.getByRole('button', { name: 'Create store' }).click();
    await expect(page.getByText('Create store')).toBeVisible();
});

test('CreateAndCloseStore', async ({page}) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('f@jwt.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('franchisee');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForLoadState('networkidle');
    await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Everything you need to run an')).toBeVisible();
    
    await page.getByRole('button', { name: 'Create store' }).click();
    await page.getByRole('textbox', { name: 'store name' }).click();
    await page.getByRole('textbox', { name: 'store name' }).fill('Test Store');
    await page.getByRole('button', { name: 'Create' }).click();
    await expect(page.getByRole('cell', { name: 'Test Store' })).toBeVisible();
    await page.getByRole('row', { name: 'Test Store 0 ₿ Close' }).getByRole('button').click();
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.getByRole('cell', { name: 'Test Store' })).toBeHidden();
});