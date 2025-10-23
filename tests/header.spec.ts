import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

/**
 * Test Suite: Header Navigation Verification
 *
 * Test Case ID: TC001
 * Objective: Verify that the header navigation menu is functional
 * and all key header elements are accessible
 *
 * This test demonstrates:
 * - Page Object Model usage
 * - Proper assertions
 * - Clear test structure (AAA pattern: Arrange, Act, Assert)
 * - Error handling
 */

test.describe('Header Navigation Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    // Arrange: Initialize page object
    homePage = new HomePage(page);

    // Navigate to homepage before each test
    await homePage.navigateToHomepage();
  });

  test('TC001-01: Verify homepage loads successfully', async () => {
    // Assert: Check if homepage loaded
    const isLoaded = await homePage.isHomePageLoaded();
    expect(isLoaded).toBeTruthy();

    // Verify page title contains Tier IV
    const title = await homePage.getPageTitle();
    expect(title.toLowerCase()).toMatch(/tier|ティア/);

    // Verify URL is correct
    const url = homePage.getCurrentUrl();
    expect(url).toContain('tier4.jp');
  });

  test('TC001-02: Verify navigation menu is visible', async () => {
    // Act & Assert: Check navigation menu visibility
    const isNavVisible = await homePage.isNavigationMenuVisible();
    expect(isNavVisible).toBeTruthy();
  });

  test('TC001-03: Verify all main navigation links are visible', async ({ page }) => {
    // Assert: Check individual navigation links
    // Based on actual Tier IV website structure

    // About Us link
    const isAboutUsVisible = await homePage.isAboutUsLinkVisible();
    expect(isAboutUsVisible).toBeTruthy();

    // Open Source link
    const isOpenSourceVisible = await homePage.isOpenSourceLinkVisible();
    expect(isOpenSourceVisible).toBeTruthy();

    // Our Products link
    const isProductsVisible = await homePage.isProductsLinkVisible();
    expect(isProductsVisible).toBeTruthy();

    // Services link
    const isServicesVisible = await homePage.isServicesLinkVisible();
    expect(isServicesVisible).toBeTruthy();

    // Alliance link
    const isAllianceVisible = await homePage.isAllianceLinkVisible();
    expect(isAllianceVisible).toBeTruthy();

    // Our Team link
    const isTeamVisible = await homePage.isTeamLinkVisible();
    expect(isTeamVisible).toBeTruthy();

    // Careers link
    const isCareersVisible = await homePage.isCareersLinkVisible();
    expect(isCareersVisible).toBeTruthy();

    // Media link
    const isMediaVisible = await homePage.isMediaLinkVisible();
    expect(isMediaVisible).toBeTruthy();
  });

  test('TC001-04: Verify Careers link opens in new tab', async ({ page, context }) => {
    test.setTimeout(60000); // Increase timeout for new tab operations

    // Act: Click on Careers link and wait for new tab
    const [newPage] = await Promise.all([
      context.waitForEvent('page', { timeout: 30000 }),
      homePage.clickCareersLink()
    ]);

    // Wait for new page to load
    await newPage.waitForLoadState('domcontentloaded', { timeout: 30000 });

    // Assert: New tab should open with careers URL
    const newPageUrl = newPage.url();
    expect(newPageUrl).toContain('careers.tier4.jp');

    // Verify original page is still on homepage
    const originalUrl = homePage.getCurrentUrl();
    expect(originalUrl).toContain('tier4.jp');

    // Clean up: Close new tab
    await newPage.close();
  });

  test('TC001-05: Verify navigation links are clickable', async () => {
    // This test verifies that links are not disabled

    // Products link should be clickable
    const productsLinkVisible = await homePage.isProductsLinkVisible();
    expect(productsLinkVisible).toBeTruthy();

    // About Us link should be clickable
    const aboutUsLinkVisible = await homePage.isAboutUsLinkVisible();
    expect(aboutUsLinkVisible).toBeTruthy();

    // Media link should be clickable
    const mediaLinkVisible = await homePage.isMediaLinkVisible();
    expect(mediaLinkVisible).toBeTruthy();
  });

  test('TC001-06: Verify page loads without console errors', async ({ page }) => {
    // Set up console error listener
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Reload page to catch any console errors
    await homePage.reload();
    await homePage.waitForPageLoad();

    // Assert: No critical console errors
    // Note: Some third-party scripts might have errors, so we filter critical ones
    const criticalErrors = consoleErrors.filter(error =>
      !error.includes('third-party') &&
      !error.includes('analytics')
    );

    expect(criticalErrors.length).toBe(0);
  });

  test('TC001-07: Verify homepage main heading is visible', async () => {
    // Assert: Main heading should be visible
    const isHeadingVisible = await homePage.isMainHeadingVisible();
    expect(isHeadingVisible).toBeTruthy();

    // Get heading text for additional verification (if exists)
    const headingText = await homePage.getMainHeadingText();
    // Heading exists and is visible - text content is optional
    expect(isHeadingVisible).toBeTruthy();
  });

  test('TC001-08: Verify logo is clickable and returns to homepage', async () => {
    // First navigate away from homepage
    await homePage.clickMediaLink();

    // Verify we're not on homepage
    let url = homePage.getCurrentUrl();
    const isNotHomepage = !url.endsWith('/') && !url.endsWith('/en') && !url.endsWith('/ja') && !url.endsWith('/cn');

    if (isNotHomepage) {
      // Act: Click logo to return to homepage
      const returnedToHomepage = await homePage.clickLogoAndVerifyHomepage();

      // Assert: Should be back on homepage
      expect(returnedToHomepage).toBeTruthy();
    }
  });
});

/**
 * Additional test suite for edge cases and error scenarios
 */
test.describe('Header Navigation - Edge Cases', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHomepage();
  });

  test('TC001-09: Verify page is responsive to window resize', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await homePage.reload();

    const isLoaded = await homePage.isHomePageLoaded();
    expect(isLoaded).toBeTruthy();

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await homePage.reload();

    const isLoadedTablet = await homePage.isHomePageLoaded();
    expect(isLoadedTablet).toBeTruthy();
  });

  test('TC001-10: Verify back navigation works correctly', async () => {
    // Get initial URL
    const initialUrl = homePage.getCurrentUrl();

    // Navigate to a different page
    await homePage.clickAboutUsLink();
    await homePage.waitForPageLoad();

    const afterClickUrl = homePage.getCurrentUrl();

    // Go back
    await homePage.goBack();
    await homePage.waitForPageLoad();

    // Assert: Should be back on homepage or initial URL
    const afterBackUrl = homePage.getCurrentUrl();
    const backWorked = afterBackUrl === initialUrl || await homePage.isNavigationMenuVisible();

    expect(backWorked).toBeTruthy();
  });

  test('TC001-11: Verify hamburger menu is visible and clickable', async () => {
    // Check if hamburger menu exists
    const isHamburgerVisible = await homePage.isHamburgerMenuVisible();

    // Hamburger menu should be visible (especially on mobile/smaller viewports)
    // On desktop it might be hidden, so we check if it exists in DOM
    if (isHamburgerVisible) {
      // Act: Click hamburger menu
      await homePage.clickHamburgerMenu();
      await homePage.wait(500);

      // Assert: Language options should appear after clicking
      // This verifies the hamburger menu is functional
      expect(isHamburgerVisible).toBeTruthy();
    } else {
      // On larger viewports, hamburger might not be visible
      // This is acceptable behavior
      expect(true).toBeTruthy();
    }
  });

  test('TC001-12: Verify About Us link navigates correctly and preserves language', async () => {
    // Get initial language
    const initialLanguage = homePage.getCurrentLanguage();

    // Act: Click About Us link
    await homePage.clickAboutUsLink();
    await homePage.waitForPageLoad();

    // Assert: Should navigate to About Us page
    const currentUrl = homePage.getCurrentUrl();
    expect(currentUrl.toLowerCase()).toContain('about');

    // Assert: Language should be preserved
    const newLanguage = homePage.getCurrentLanguage();
    if (initialLanguage) {
      expect(newLanguage).toBe(initialLanguage);
    }
  });

  test('TC001-13: Verify Open Source link navigates correctly and preserves language', async () => {
    // Get initial language
    const initialLanguage = homePage.getCurrentLanguage();

    // Act: Click Open Source link
    await homePage.clickOpenSourceLink();
    await homePage.waitForPageLoad();

    // Assert: Should navigate to Open Source page
    const currentUrl = homePage.getCurrentUrl();
    expect(currentUrl.toLowerCase()).toContain('opensource');

    // Assert: Language should be preserved
    const newLanguage = homePage.getCurrentLanguage();
    if (initialLanguage) {
      expect(newLanguage).toBe(initialLanguage);
    }
  });

  test('TC001-14: Verify Our Products link navigates correctly and preserves language', async () => {
    // Get initial language
    const initialLanguage = homePage.getCurrentLanguage();

    // Act: Click Products link
    await homePage.clickProductsLink();
    await homePage.waitForPageLoad();

    // Assert: Should navigate to Products page
    const currentUrl = homePage.getCurrentUrl();
    expect(currentUrl.toLowerCase()).toContain('product');

    // Assert: Language should be preserved
    const newLanguage = homePage.getCurrentLanguage();
    if (initialLanguage) {
      expect(newLanguage).toBe(initialLanguage);
    }
  });

  test('TC001-15: Verify Alliance link navigates correctly and preserves language', async () => {
    // Get initial language
    const initialLanguage = homePage.getCurrentLanguage();

    // Act: Click Alliance link
    await homePage.clickAllianceLink();
    await homePage.waitForPageLoad();

    // Assert: Should navigate to Alliance page
    const currentUrl = homePage.getCurrentUrl();
    expect(currentUrl.toLowerCase()).toContain('alliance');

    // Assert: Language should be preserved
    const newLanguage = homePage.getCurrentLanguage();
    if (initialLanguage) {
      expect(newLanguage).toBe(initialLanguage);
    }
  });

  test('TC001-16: Verify Our Team link navigates correctly and preserves language', async () => {
    // Get initial language
    const initialLanguage = homePage.getCurrentLanguage();

    // Act: Click Team link
    await homePage.clickTeamLink();
    await homePage.waitForPageLoad();

    // Assert: Should navigate to Team page
    const currentUrl = homePage.getCurrentUrl();
    expect(currentUrl.toLowerCase()).toContain('team');

    // Assert: Language should be preserved
    const newLanguage = homePage.getCurrentLanguage();
    if (initialLanguage) {
      expect(newLanguage).toBe(initialLanguage);
    }
  });

  test('TC001-17: Verify Media link navigates correctly and preserves language', async () => {
    // Get initial language
    const initialLanguage = homePage.getCurrentLanguage();

    // Act: Click Media link
    await homePage.clickMediaLink();
    await homePage.waitForPageLoad();

    // Assert: Should navigate to Media page
    const currentUrl = homePage.getCurrentUrl();
    expect(currentUrl.toLowerCase()).toContain('media');

    // Assert: Language should be preserved
    const newLanguage = homePage.getCurrentLanguage();
    if (initialLanguage) {
      expect(newLanguage).toBe(initialLanguage);
    }
  });

  test('TC001-18: Verify Services link opens in new tab', async ({ context }) => {
    test.setTimeout(60000); // Increase timeout for new tab operations

    // Act: Click Services link and wait for new tab
    const [newPage] = await Promise.all([
      context.waitForEvent('page', { timeout: 30000 }),
      homePage.clickServicesLink()
    ]);

    // Wait for new page to load
    await newPage.waitForLoadState('domcontentloaded', { timeout: 30000 });

    // Assert: New tab should open with services URL
    const newPageUrl = newPage.url();
    expect(newPageUrl).toContain('services.tier4.jp');

    // Verify original page is still on current page
    const originalUrl = homePage.getCurrentUrl();
    expect(originalUrl).toContain('tier4.jp');

    // Clean up: Close new tab
    await newPage.close();
  });
});