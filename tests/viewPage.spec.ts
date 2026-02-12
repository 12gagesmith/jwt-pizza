import { test, expect } from 'playwright-test-coverage';

test('viewHistoryPage', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'History' }).click();
    await expect(page.getByText('Mama Rucci, my my')).toBeVisible();
});

test('viewAboutPage', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page.getByText('The secret sauce')).toBeVisible();
});

test('viewDefaultFrabchisePage', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
    await expect(page.getByText('If you are already a')).toBeVisible();
});