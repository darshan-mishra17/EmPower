import { test, expect } from '@playwright/test';

test.describe('Course Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login as student first
    await page.goto('/');
    await page.click('text=Login');
    await page.fill('input[type="email"]', 'student@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Student Portal')).toBeVisible();
  });

  test('should display available courses', async ({ page }) => {
    // Courses are displayed on the student dashboard
    await expect(page.locator('text=My Courses')).toBeVisible();

    // Verify at least one course is shown
    const courseCards = page.locator('text=Continue Learning');
    await expect(courseCards.first()).toBeVisible();
  });

  test('should access course content', async ({ page }) => {
    // Click on a course link to view details
    const courseLink = page.locator('a:has-text("Continue Learning")').first();
    await courseLink.click();

    // Verify course content is displayed
    await expect(page.locator('text=Course Content')).toBeVisible();
  });
});
