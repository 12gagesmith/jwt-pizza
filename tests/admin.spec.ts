import {test, expect} from 'playwright-test-coverage';
import {basicInit} from './mocks';

test('viewAdminPage', async ({page}) => {
    await basicInit(page);
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('a@jwt.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('admin');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'A', exact: true }).click();
    await expect(page.getByText('AdminPerson')).toBeVisible();
});

test('createAndCloseFranchise', async ({page}) => {
    await basicInit(page);
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('a@jwt.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('admin');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByRole('button', { name: 'Add Franchise' }).click();
    await expect(page.getByText('Want to create franchise?')).toBeVisible();
    await page.getByRole('button', { name: 'Cancel' }).click();
    await page.getByRole('row', { name: 'LotaPizza Close' }).getByRole('button').click();
    await expect(page.getByText('Sorry to see you go')).toBeVisible();
});