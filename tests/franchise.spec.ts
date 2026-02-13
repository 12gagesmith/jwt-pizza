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

test('createStore', async ({page}) => {
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
    await expect(page.getByText('homefranchise-dashboardcreate')).toBeVisible();
});

test('closeStore', async ({page}) => {
    await basicInit(page);
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('f@jwt.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('franchisee');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForLoadState('networkidle');
    await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
    await page.waitForLoadState('networkidle');
    await page.getByRole('row', { name: 'BYU 0.033 ₿ Close' }).getByRole('button').click();
    await expect(page.getByText('Sorry to see you go')).toBeVisible();
});