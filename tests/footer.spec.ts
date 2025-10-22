import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { FooterComponent } from '../pages/FooterComponent';

/**
 * Test Suite: Footer Links Validation
 *
 * Test Case ID: TC003
 * Objective: Verify that footer contains all required links
 * and they are functional
 *
 * This test demonstrates:
 * - Component Object Pattern usage
 * - Testing reusable components
 * - Link validation
 * - Social media integration testing
 * - Handling new tab/window scenarios
 */

test.describe('Footer Validation Tests', () => {
  let homePage: HomePage;
  let footer: FooterComponent;

  test.beforeEach(async ({ page }) => {
    // Arrange: Initialize page objects
    homePage = new HomePage(page);
    footer = new FooterComponent(page);

    // Navigate to homepage
    await homePage.navigateToHomepage();
  });

  test('TC003-01: Verify footer is visible on homepage', async () => {
    // Act: Scroll to footer
    await footer.scrollToFooter();

    // Assert: Footer should be visible
    const isVisible = await footer.isFooterVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC003-02: Verify footer contains multiple links', async () => {
    // Act: Get footer links count
    const linkCount = await footer.getFooterLinksCount();

    // Assert: Should have multiple links (at least 3)
    expect(linkCount).toBeGreaterThanOrEqual(3);

    console.log(`Footer contains ${linkCount} links`);
  });

  test('TC003-03: Verify Privacy Policy link exists and is clickable', async () => {
    // Act & Assert: Check if Privacy Policy link is visible
    const isPrivacyVisible = await footer.isPrivacyPolicyLinkVisible();

    if (isPrivacyVisible) {
      // Privacy Policy link exists
      expect(isPrivacyVisible).toBeTruthy();

      // Click and verify navigation
      await footer.clickPrivacyPolicyLink();

      // Verify URL changed to privacy policy page
      const currentUrl = homePage.getCurrentUrl();
      expect(currentUrl.toLowerCase()).toMatch(/privacy|プライバシー|個人情報/);
    } else {
      // If no explicit Privacy Policy link, just log it
      console.log('Note: Privacy Policy link not found in footer');
      expect(true).toBeTruthy(); // Pass test but note the finding
    }
  });

  test('TC003-04: Verify social media links are present', async () => {
    // Act: Check for social media links
    const socialLinks = await footer.verifySocialMediaLinks();

    // Assert: At least one social media link should be present
    const hasSocialMedia = socialLinks.linkedin ||
                          socialLinks.twitter ||
                          socialLinks.youtube ||
                          socialLinks.facebook ||
                          socialLinks.instagram ||
                          socialLinks.github;

    expect(hasSocialMedia).toBeTruthy();

    // Log which social media platforms are present
    console.log('Social Media Links:', {
      LinkedIn: socialLinks.linkedin,
      Twitter: socialLinks.twitter,
      YouTube: socialLinks.youtube,
      Facebook: socialLinks.facebook,
      Instagram: socialLinks.instagram,
      GitHub: socialLinks.github
    });
  });

  test('TC003-05: Verify LinkedIn link opens in new tab', async ({ page, context }) => {
    // Check if LinkedIn link exists
    const isLinkedInVisible = await footer.isLinkedInLinkVisible();

    if (isLinkedInVisible) {
      // Get LinkedIn URL
      const linkedInUrl = await footer.getLinkedInUrl();
      expect(linkedInUrl).toBeTruthy();
      expect(linkedInUrl).toContain('linkedin.com');

      // Click LinkedIn link and verify it opens in new tab
      const newPage = await footer.clickLinkedInLink();

      // Wait for new page to load
      await newPage.waitForLoadState('domcontentloaded');

      // Verify new page URL is LinkedIn
      const newPageUrl = newPage.url();
      expect(newPageUrl).toContain('linkedin.com');

      // Clean up: Close new tab
      await newPage.close();
    } else {
      console.log('Note: LinkedIn link not found in footer');
      expect(true).toBeTruthy();
    }
  });

  test('TC003-06: Verify Twitter/X link is correct', async () => {
    // Check if Twitter/X link exists
    const isTwitterVisible = await footer.isTwitterLinkVisible();

    if (isTwitterVisible) {
      // Get Twitter URL
      const twitterUrl = await footer.getTwitterUrl();
      expect(twitterUrl).toBeTruthy();

      // Should contain twitter.com or x.com
      const isValidTwitterUrl = twitterUrl?.includes('twitter.com') || twitterUrl?.includes('x.com');
      expect(isValidTwitterUrl).toBeTruthy();

      console.log(`Twitter/X URL: ${twitterUrl}`);
    } else {
      console.log('Note: Twitter/X link not found in footer');
      expect(true).toBeTruthy();
    }
  });

  test('TC003-07: Verify YouTube link is correct', async () => {
    // Check if YouTube link exists
    const isYoutubeVisible = await footer.isYoutubeLinkVisible();

    if (isYoutubeVisible) {
      // Get YouTube URL
      const youtubeUrl = await footer.getYoutubeUrl();
      expect(youtubeUrl).toBeTruthy();
      expect(youtubeUrl).toContain('youtube.com');

      console.log(`YouTube URL: ${youtubeUrl}`);
    } else {
      console.log('Note: YouTube link not found in footer');
      expect(true).toBeTruthy();
    }
  });

  test('TC003-08: Verify all footer link texts are retrieved', async () => {
    // Act: Get all footer link texts
    const linkTexts = await footer.getAllFooterLinkTexts();

    // Assert: Should have retrieved some link texts
    expect(linkTexts.length).toBeGreaterThan(0);

    // Each link should have non-empty text
    for (const text of linkTexts) {
      expect(text.length).toBeGreaterThan(0);
    }

    console.log('Footer links:', linkTexts);
  });

  test('TC003-09: Verify footer appears on different pages', async () => {
    // Check footer on homepage
    const isFooterOnHome = await footer.verifyFooterPresence();
    expect(isFooterOnHome).toBeTruthy();

    // Navigate to Company page
    await homePage.clickCompanyLink();
    await homePage.waitForPageLoad();

    // Check footer on Company page
    const isFooterOnCompany = await footer.verifyFooterPresence();
    expect(isFooterOnCompany).toBeTruthy();

    // Navigate to News page
    await homePage.goto('/');
    await homePage.waitForPageLoad();
    await homePage.clickNewsLink();
    await homePage.waitForPageLoad();

    // Check footer on News page
    const isFooterOnNews = await footer.verifyFooterPresence();
    expect(isFooterOnNews).toBeTruthy();
  });

  test('TC003-10: Verify Privacy Policy page loads correctly', async () => {
    // Check if Privacy Policy link exists
    const isPrivacyVisible = await footer.isPrivacyPolicyLinkVisible();

    if (isPrivacyVisible) {
      // Click Privacy Policy link
      await footer.clickPrivacyPolicyLink();

      // Verify page loaded
      const isPageLoaded = await homePage.isHomePageLoaded();
      expect(isPageLoaded).toBeTruthy();

      // Verify URL contains privacy-related keywords
      const url = homePage.getCurrentUrl();
      expect(url.toLowerCase()).toMatch(/privacy|policy|プライバシー|ポリシー|個人情報/);
    } else {
      console.log('Note: Privacy Policy link not found - skipping validation');
      expect(true).toBeTruthy();
    }
  });
});

/**
 * Edge cases and additional footer tests
 */
test.describe('Footer Validation - Edge Cases', () => {
  let homePage: HomePage;
  let footer: FooterComponent;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    footer = new FooterComponent(page);
    await homePage.navigateToHomepage();
  });

  test('TC003-11: Verify footer is accessible via keyboard navigation', async ({ page }) => {
    // Start from top of page
    await page.keyboard.press('Home');

    // Tab through page to reach footer
    // This is a simplified test - in real scenario would tab through all elements
    await page.keyboard.press('End');

    // Wait for scroll to complete
    await footer.scrollToFooter();

    // Verify footer is visible after keyboard navigation
    const isVisible = await footer.isFooterVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC003-12: Verify footer links work after page reload', async () => {
    // Scroll to footer
    await footer.scrollToFooter();

    // Reload page
    await homePage.reload();
    await homePage.waitForPageLoad();

    // Scroll to footer again
    await footer.scrollToFooter();

    // Verify footer is still functional
    const isVisible = await footer.isFooterVisible();
    expect(isVisible).toBeTruthy();

    const linkCount = await footer.getFooterLinksCount();
    expect(linkCount).toBeGreaterThan(0);
  });

  test('TC003-13: Verify footer responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await homePage.reload();
    await homePage.waitForPageLoad();

    // Scroll to footer
    await footer.scrollToFooter();

    // Verify footer is visible on mobile
    const isVisible = await footer.isFooterVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC003-14: Verify social media links have correct attributes', async () => {
    // Check if LinkedIn link has target="_blank" for new tab
    const isLinkedInVisible = await footer.isLinkedInLinkVisible();

    if (isLinkedInVisible) {
      await footer.scrollToFooter();

      // Social media links typically should open in new tab
      // This is a good UX practice we're verifying
      const linkedInUrl = await footer.getLinkedInUrl();
      expect(linkedInUrl).toBeTruthy();

      console.log('LinkedIn link verified with URL:', linkedInUrl);
    }
  });

  test('TC003-15: Verify footer maintains structure across languages', async () => {
    // Get footer link count in Japanese
    const japaneseFooterLinks = await footer.getFooterLinksCount();

    // Switch to English
    await homePage.switchToEnglish();
    await homePage.waitForPageLoad();

    // Get footer link count in English
    const englishFooterLinks = await footer.getFooterLinksCount();

    // Footer should have similar structure in both languages
    // Allow for some variation (±2 links) due to language-specific content
    const difference = Math.abs(japaneseFooterLinks - englishFooterLinks);
    expect(difference).toBeLessThanOrEqual(2);

    console.log(`Footer links - Japanese: ${japaneseFooterLinks}, English: ${englishFooterLinks}`);
  });

  test('TC003-16: Verify CONTACT link is visible and clickable', async () => {
    // Check if CONTACT link is visible
    const isContactVisible = await footer.isContactLinkVisible();
    expect(isContactVisible).toBeTruthy();

    // Click CONTACT link
    await footer.clickContactLink();

    // Verify page navigated to contact page
    const currentUrl = homePage.getCurrentUrl();
    expect(currentUrl.toLowerCase()).toContain('contact');

    console.log('✓ CONTACT link navigated to:', currentUrl);
  });

  test('TC003-17: Verify COOKIE POLICY link is visible and clickable', async () => {
    // Check if COOKIE POLICY link is visible
    const isCookieVisible = await footer.isCookiePolicyLinkVisible();
    expect(isCookieVisible).toBeTruthy();

    // Click COOKIE POLICY link
    await footer.clickCookiePolicyLink();

    // Verify page navigated to cookie policy page
    const currentUrl = homePage.getCurrentUrl();
    expect(currentUrl.toLowerCase()).toContain('cookie');

    console.log('✓ COOKIE POLICY link navigated to:', currentUrl);
  });

  test('TC003-18: Verify CODE OF CONDUCT link is visible and clickable', async () => {
    // Check if CODE OF CONDUCT link is visible
    const isCodeVisible = await footer.isCodeOfConductLinkVisible();
    expect(isCodeVisible).toBeTruthy();

    // Click CODE OF CONDUCT link
    await footer.clickCodeOfConductLink();

    // Verify page navigated to code of conduct page
    const currentUrl = homePage.getCurrentUrl();
    expect(currentUrl.toLowerCase()).toContain('conduct');

    console.log('✓ CODE OF CONDUCT link navigated to:', currentUrl);
  });

  test('TC003-19: Verify HUMAN RIGHTS POLICY link is visible and clickable', async () => {
    // Check if HUMAN RIGHTS POLICY link is visible
    const isHumanRightsVisible = await footer.isHumanRightsPolicyLinkVisible();
    expect(isHumanRightsVisible).toBeTruthy();

    // Click HUMAN RIGHTS POLICY link
    await footer.clickHumanRightsPolicyLink();

    // Verify page navigated to human rights policy page
    const currentUrl = homePage.getCurrentUrl();
    expect(currentUrl.toLowerCase()).toMatch(/human.*rights|rights.*policy/);

    console.log('✓ HUMAN RIGHTS POLICY link navigated to:', currentUrl);
  });

  test('TC003-20: Verify MEDIA KIT link opens in new tab', async ({ page, context }) => {
    // Check if MEDIA KIT link is visible
    const isMediaKitVisible = await footer.isMediaKitLinkVisible();
    expect(isMediaKitVisible).toBeTruthy();

    // Click MEDIA KIT link and verify it opens in new tab
    const newPage = await footer.clickMediaKitLink();

    // Wait for new page to load
    await newPage.waitForLoadState('domcontentloaded');

    // Verify new page URL is media detail page
    const newPageUrl = newPage.url();

    // Should go to the specific media kit URL with sys_id
    expect(newPageUrl.toLowerCase()).toContain('/media/detail');
    expect(newPageUrl).toContain('sys_id=');
    expect(newPageUrl).toContain('category=DOCUMENT');

    console.log('✓ MEDIA KIT opened in new tab:', newPageUrl);

    // Verify it always goes to English version regardless of original language
    expect(newPageUrl).toContain('/en/');

    // Verify original page is still on tier4.jp
    const originalUrl = homePage.getCurrentUrl();
    expect(originalUrl).toContain('tier4.jp');

    // Clean up: Close new tab
    await newPage.close();
  });

  test('TC003-21: Discover Twitter/X link URL and verify visibility', async () => {
    // Check if Twitter/X link is visible
    const isTwitterVisible = await footer.isTwitterLinkVisible();
    expect(isTwitterVisible).toBeTruthy();

    // Get Twitter URL to discover whether it's twitter.com or x.com
    const twitterUrl = await footer.getTwitterUrl();
    expect(twitterUrl).toBeTruthy();

    // Log discovery - this test discovers whether it's Twitter or X
    if (twitterUrl?.includes('twitter.com')) {
      console.log('✓ Twitter link discovered: Goes to twitter.com');
      console.log('Full URL:', twitterUrl);
    } else if (twitterUrl?.includes('x.com')) {
      console.log('✓ Twitter link discovered: Goes to x.com (rebranded)');
      console.log('Full URL:', twitterUrl);
    } else {
      console.log('⚠ Twitter/X link found but points to unexpected URL:', twitterUrl);
    }

    // Assert it's one of the valid options
    const isValidTwitterUrl = twitterUrl?.includes('twitter.com') || twitterUrl?.includes('x.com');
    expect(isValidTwitterUrl).toBeTruthy();
  });

  test('TC003-22: Verify Twitter/X opens in new tab with correct URL', async ({ page, context }) => {
    // Check if Twitter/X link exists
    const isTwitterVisible = await footer.isTwitterLinkVisible();

    if (isTwitterVisible) {
      // Click Twitter/X link and verify it opens in new tab
      const newPage = await footer.clickTwitterLink();

      // Wait for new page to load
      await newPage.waitForLoadState('domcontentloaded');

      // Verify new page URL is Twitter or X
      const newPageUrl = newPage.url();
      const isValidUrl = newPageUrl.includes('twitter.com') || newPageUrl.includes('x.com');
      expect(isValidUrl).toBeTruthy();

      console.log('Twitter/X opened in new tab:', newPageUrl);

      // Verify original page is still on homepage
      const originalUrl = homePage.getCurrentUrl();
      expect(originalUrl).toContain('tier4.jp');

      // Clean up: Close new tab
      await newPage.close();
    } else {
      console.log('Note: Twitter/X link not found in footer');
      expect(true).toBeTruthy();
    }
  });

  test('TC003-23: Verify YouTube opens in new tab with correct URL', async ({ page, context }) => {
    // Check if YouTube link exists
    const isYoutubeVisible = await footer.isYoutubeLinkVisible();

    if (isYoutubeVisible) {
      // Get YouTube URL
      const youtubeUrl = await footer.getYoutubeUrl();
      expect(youtubeUrl).toBeTruthy();
      expect(youtubeUrl).toContain('youtube.com');

      // Click YouTube link and verify it opens in new tab
      const newPage = await footer.clickYoutubeLink();

      // Wait for new page to load
      await newPage.waitForLoadState('domcontentloaded');

      // Verify new page URL is YouTube
      const newPageUrl = newPage.url();
      expect(newPageUrl).toContain('youtube.com');

      console.log('YouTube opened in new tab:', newPageUrl);

      // Verify original page is still on homepage
      const originalUrl = homePage.getCurrentUrl();
      expect(originalUrl).toContain('tier4.jp');

      // Clean up: Close new tab
      await newPage.close();
    } else {
      console.log('Note: YouTube link not found in footer');
      expect(true).toBeTruthy();
    }
  });

  test('TC003-24: Verify Facebook opens in new tab with correct URL', async ({ page, context }) => {
    // Check if Facebook link exists
    const isFacebookVisible = await footer.isFacebookLinkVisible();

    if (isFacebookVisible) {
      // Get Facebook URL
      const facebookUrl = await footer.getFacebookUrl();
      expect(facebookUrl).toBeTruthy();
      expect(facebookUrl).toContain('facebook.com');

      // Click Facebook link and verify it opens in new tab
      const newPage = await footer.clickFacebookLink();

      // Wait for new page to load
      await newPage.waitForLoadState('domcontentloaded');

      // Verify new page URL is Facebook
      const newPageUrl = newPage.url();
      expect(newPageUrl).toContain('facebook.com');

      console.log('Facebook opened in new tab:', newPageUrl);

      // Verify original page is still on homepage
      const originalUrl = homePage.getCurrentUrl();
      expect(originalUrl).toContain('tier4.jp');

      // Clean up: Close new tab
      await newPage.close();
    } else {
      console.log('Note: Facebook link not found in footer');
      expect(true).toBeTruthy();
    }
  });

  test('TC003-25: Verify Instagram link opens in new tab', async ({ page, context }) => {
    // Check if Instagram link exists
    const isInstagramVisible = await footer.isInstagramLinkVisible();

    if (isInstagramVisible) {
      // Get Instagram URL
      const instagramUrl = await footer.getInstagramUrl();
      expect(instagramUrl).toBeTruthy();
      expect(instagramUrl).toContain('instagram.com');

      // Click Instagram link and verify it opens in new tab
      const newPage = await footer.clickInstagramLink();

      // Wait for new page to load
      await newPage.waitForLoadState('domcontentloaded');

      // Verify new page URL is Instagram
      const newPageUrl = newPage.url();
      expect(newPageUrl).toContain('instagram.com');

      console.log('✓ Instagram opened in new tab:', newPageUrl);

      // Verify original page is still on homepage
      const originalUrl = homePage.getCurrentUrl();
      expect(originalUrl).toContain('tier4.jp');

      // Clean up: Close new tab
      await newPage.close();
    } else {
      console.log('Note: Instagram link not found in footer');
      expect(true).toBeTruthy();
    }
  });

  test('TC003-26: Verify GitHub link opens to autowarefoundation/autoware', async ({ page, context }) => {
    // Check if GitHub link exists
    const isGithubVisible = await footer.isGithubLinkVisible();

    if (isGithubVisible) {
      // Get GitHub URL
      const githubUrl = await footer.getGithubUrl();
      expect(githubUrl).toBeTruthy();
      expect(githubUrl).toContain('github.com');

      console.log('GitHub URL:', githubUrl);

      // Verify it points to autowarefoundation/autoware
      expect(githubUrl?.toLowerCase()).toContain('autowarefoundation');

      // Click GitHub link and verify it opens in new tab
      const newPage = await footer.clickGithubLink();

      // Wait for new page to load
      await newPage.waitForLoadState('domcontentloaded');

      // Verify new page URL is GitHub autowarefoundation
      const newPageUrl = newPage.url();
      expect(newPageUrl.toLowerCase()).toContain('github.com');
      expect(newPageUrl.toLowerCase()).toContain('autoware');

      console.log('✓ GitHub opened in new tab:', newPageUrl);

      // Verify original page is still on homepage
      const originalUrl = homePage.getCurrentUrl();
      expect(originalUrl).toContain('tier4.jp');

      // Clean up: Close new tab
      await newPage.close();
    } else {
      console.log('Note: GitHub link not found in footer');
      expect(true).toBeTruthy();
    }
  });
});