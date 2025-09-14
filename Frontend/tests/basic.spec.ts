import { test, expect } from '@playwright/test';

test.describe('Basic Navigation', () => {
  test('should navigate to login page', async ({ page }) => {
    await page.goto('/');

    // Click on login link in navbar
    await page.click('text=Login');

    // Check if we're on the login page
    await expect(page).toHaveURL(/.*login/);
    await expect(page.locator('text=Welcome Back')).toBeVisible();
  });

  test('should login as student and reach dashboard', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Login');

    // Wait for login page to load
    await expect(page.locator('text=Welcome Back')).toBeVisible();

    // Fill in login form
    await page.fill('input[type="email"]', 'student@example.com');
    await page.fill('input[type="password"]', 'password123');

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for navigation
    await page.waitForURL(/.*student\/dashboard/);

    // Check if we're on the student dashboard
    await expect(page.locator('text=Student Portal')).toBeVisible();
  });
});
