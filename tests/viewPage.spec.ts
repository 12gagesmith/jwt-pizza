import { test, expect } from 'playwright-test-coverage';
import { basicInit } from './mocks';

test('viewHistoryPage', async ({ page }) => {
    await await basicInit(page);
    await page.getByRole('link', { name: 'History' }).click();
    await expect(page.getByText('Mama Rucci, my my')).toBeVisible();
});

test('viewAboutPage', async ({ page }) => {
    await await basicInit(page);
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page.getByText('The secret sauce')).toBeVisible();
});

test('viewDefaultFrabchisePage', async ({ page }) => {
    await await basicInit(page);
    await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
    await expect(page.getByText('If you are already a')).toBeVisible();
});