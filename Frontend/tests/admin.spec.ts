import { test, expect } from '@playwright/test';

test.describe('Admin Panel', () => {
  test.beforeEach(async ({ page }) => {
    // Login as admin
    await page.goto('/');
    await page.click('text=Login');
    await page.fill('input[type="email"]', 'admin@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Admin Panel')).toBeVisible();
  });

  test('should display admin dashboard', async ({ page }) => {
    // Verify admin panel sections are visible
    await expect(page.locator('text=User Management')).toBeVisible();
    await expect(page.locator('text=Content Review')).toBeVisible();
    await expect(page.locator('text=Analytics')).toBeVisible();
  });

  test('should view all users', async ({ page }) => {
    // Click on user management
    await page.click('text=User Management');

    // Verify users table is displayed
    const usersTable = page.locator('table');
    await expect(usersTable).toBeVisible();

    // Check if users are listed
    const userRows = page.locator('tbody tr');
    await expect(userRows.first()).toBeVisible();
  });

  test('should create a new course', async ({ page }) => {
    // Navigate to course management
    await page.click('text=Content Review');

    // Click create course button
    await page.click('button:has-text("Create Course")');

    // Fill in course form
    await page.fill('input[name="title"]', 'Playwright Test Course');
    await page.fill('textarea[name="description"]', 'A course created during Playwright testing.');
    await page.selectOption('select[name="subject"]', 'Mathematics');

    // Submit the form
    await page.click('button[type="submit"]');

    // Verify course was created
    await expect(page.locator('text=Playwright Test Course')).toBeVisible();
  });

  test('should view system statistics', async ({ page }) => {
    // Click on analytics tab
    await page.click('text=Analytics');

    // Check statistics section
    await expect(page.locator('text=Total Users')).toBeVisible();
    await expect(page.locator('text=Total Courses')).toBeVisible();
    await expect(page.locator('text=Discussion Posts')).toBeVisible();

    // Verify statistics are displayed
    const stats = page.locator('.bg-white.p-4.rounded-lg.shadow.border');
    await expect(stats).toHaveCount(4);
  });

  test('should manage user roles', async ({ page }) => {
    await page.click('text=User Management');

    // Click edit on first user
    const editButton = page.locator('button:has-text("Edit")').first();
    await editButton.click();

    // Change role
    await page.selectOption('select[name="role"]', 'teacher');

    // Save changes
    await page.click('button:has-text("Save")');

    // Verify role was updated
    await expect(page.locator('text=Role updated successfully')).toBeVisible();
  });
});
