import {test, expect} from 'playwright-test-coverage';

test('viewFranchisePage', async ({page}) => {
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
    await page.locator('tr:nth-child(9) > .px-6.py-4.text-end.text-sm.font-medium > .px-2').click();
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.getByRole('cell', { name: 'Test Store' })).toBeHidden();
});