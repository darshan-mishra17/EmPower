import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should login as student', async ({ page }) => {
    // Navigate to the application
    await page.goto('/');

    // Click on login link/button
    await page.click('text=Login');

    // Fill in login form
    await page.fill('input[type="email"]', 'student@example.com');
    await page.fill('input[type="password"]', 'password123');

    // Submit the form
    await page.click('button[type="submit"]');

    // Verify successful login by checking for dashboard elements
    await expect(page).toHaveURL(/.*student\/dashboard/);
    await expect(page.locator('text=Student Portal')).toBeVisible();
  });

  test('should login as teacher', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Login');

    await page.fill('input[type="email"]', 'teacher@example.com');
    await page.fill('input[type="password"]', 'password123');

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/.*teacher\/dashboard/);
    await expect(page.locator('text=Teacher Portal')).toBeVisible();
  });

  test('should login as parent', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Login');

    await page.fill('input[type="email"]', 'parent@example.com');
    await page.fill('input[type="password"]', 'password123');

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/.*parent\/dashboard/);
    await expect(page.locator('text=Parent Portal')).toBeVisible();
  });

  test('should login as admin', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Login');

    await page.fill('input[type="email"]', 'admin@example.com');
    await page.fill('input[type="password"]', 'password123');

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/.*admin/);
    await expect(page.locator('text=Admin Panel')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Login');

    await page.fill('input[type="email"]', 'invalid@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');

    await page.click('button[type="submit"]');

    // Check for error message
    await expect(page.locator('text=Invalid credentials')).toBeVisible();
  });
});
