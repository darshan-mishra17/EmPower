import { test, expect } from '@playwright/test';

test.describe('Accessibility Features', () => {
  test.beforeEach(async ({ page }) => {
    // Login as student first
    await page.goto('/');
    await page.click('text=Login');
    await page.fill('input[type="email"]', 'student@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Student Portal')).toBeVisible();
  });

  test('should display accessibility toolbar', async ({ page }) => {
    // Check if accessibility toolbar is visible
    const toolbar = page.locator('text=Accessibility Options');
    await expect(toolbar).toBeVisible();
  });

  test('should toggle high contrast mode', async ({ page }) => {
    // Click accessibility options to expand
    await page.click('text=Accessibility Options');

    // Click contrast button
    await page.click('button[aria-label*="High contrast"]');

    // Verify high contrast is applied (button should show enabled state)
    const contrastButton = page.locator('button[aria-label*="High contrast enabled"]');
    await expect(contrastButton).toBeVisible();
  });

  test('should change font size', async ({ page }) => {
    await page.click('text=Accessibility Options');

    // Click font size button
    await page.click('button[aria-label*="Font size"]');

    // Verify font size changed (button text should update)
    const fontButton = page.locator('button[aria-label*="Font size: large"]');
    await expect(fontButton).toBeVisible();
  });

  test('should toggle text-to-speech', async ({ page }) => {
    await page.click('text=Accessibility Options');

    // Click TTS button
    await page.click('button[aria-label*="Text to speech"]');

    // Verify TTS is enabled
    const ttsButton = page.locator('button[aria-label*="Text to speech enabled"]');
    await expect(ttsButton).toBeVisible();
  });

  test('should navigate with keyboard', async ({ page }) => {
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Check if focus is on expected element
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });
});
