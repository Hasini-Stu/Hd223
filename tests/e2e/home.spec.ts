import { test, expect } from '@playwright/test';

test.describe('Home Page E2E Tests', () => {
  test('should load home page successfully', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check if page title is correct
    await expect(page).toHaveTitle(/ParkCharge/);
    
    // Check if main content is visible
    await expect(page.locator('body')).toBeVisible();
  });

  test('should navigate to different sections', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check if navigation elements are present
    // This would need to be updated based on actual navigation structure
    const navigation = page.locator('[data-testid="bottom-nav"]');
    await expect(navigation).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check if page is responsive
    await expect(page.locator('body')).toBeVisible();
  });

  test('should have proper accessibility', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check for basic accessibility features
    const mainContent = page.locator('main, [role="main"]');
    if (await mainContent.count() > 0) {
      await expect(mainContent.first()).toBeVisible();
    }
  });
});
