import { test, expect } from '@playwright/test';

test.describe('Community Features', () => {
  test.beforeEach(async ({ page }) => {
    // Login as student first
    await page.goto('/');
    await page.click('text=Login');
    await page.fill('input[type="email"]', 'student@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Student Portal')).toBeVisible();
  });

  test('should display community posts', async ({ page }) => {
    // Navigate to community page
    await page.click('text=Community');

    // Check if community posts are displayed
    await expect(page.locator('text=Community Discussion')).toBeVisible();

    // Verify posts are loaded
    const posts = page.locator('text=Community Post');
    await expect(posts.first()).toBeVisible();
  });

  test('should create a new post', async ({ page }) => {
    await page.click('text=Community');

    // Click create post button
    await page.click('text=Start New Discussion');

    // Fill in post form
    await page.fill('textarea[placeholder*="Share your thoughts"]', 'This is a test post content for Playwright testing.');

    // Submit the post
    await page.click('button[type="submit"]');

    // Verify post was created
    await expect(page.locator('text=This is a test post content')).toBeVisible();
  });

  test('should like a post', async ({ page }) => {
    await page.click('text=Community');

    // Find and click like button on first post
    const likeButton = page.locator('button[aria-label="Like this post"]').first();
    await expect(likeButton).toBeVisible();
    await likeButton.click();

    // Verify like was registered (count should increase)
    await expect(page.locator('text=1')).toBeVisible();
  });

  test('should add a comment to a post', async ({ page }) => {
    await page.click('text=Community');

    // Click on View Discussion link for first post
    const viewDiscussionLink = page.locator('text=View Discussion').first();
    await viewDiscussionLink.click();

    // Fill in comment
    await page.fill('input[placeholder*="comment"]', 'This is a test comment from Playwright.');

    // Submit comment
    await page.click('button:has-text("Comment")');

    // Verify comment was added
    await expect(page.locator('text=This is a test comment from Playwright.')).toBeVisible();
  });
});
