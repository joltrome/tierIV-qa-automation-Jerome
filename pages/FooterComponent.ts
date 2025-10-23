import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * FooterComponent Class
 *
 * Component Object for Tier IV footer section
 * Represents the footer that appears across all pages
 *
 * Design Pattern: Component Object Pattern
 * - Represents a reusable component rather than a full page
 * - Can be used across multiple page objects
 */

export class FooterComponent extends BasePage {
  // Footer Container
  private readonly footer: Locator;

  // Footer Links
  private readonly privacyPolicyLink: Locator;
  private readonly termsLink: Locator;
  private readonly companyInfoLink: Locator;
  private readonly contactLink: Locator;
  private readonly cookiePolicyLink: Locator;
  private readonly codeOfConductLink: Locator;
  private readonly humanRightsPolicyLink: Locator;
  private readonly mediaKitLink: Locator;

  // Social Media Links
  private readonly socialMediaSection: Locator;
  private readonly linkedInLink: Locator;
  private readonly twitterLink: Locator;
  private readonly youtubeLink: Locator;
  private readonly facebookLink: Locator;
  private readonly instagramLink: Locator;
  private readonly githubLink: Locator;

  // Footer Sections
  private readonly footerLinks: Locator;

  constructor(page: Page) {
    super(page);

    // Footer container
    this.footer = page.locator('footer').first();

    // Footer links - flexible selectors for EN/JP
    this.privacyPolicyLink = page.locator(
      'a[href*="privacy"], a:has-text("Privacy"), a:has-text("プライバシー"), a:has-text("個人情報")'
    ).first();

    this.termsLink = page.locator(
      'a[href*="terms"], a:has-text("Terms"), a:has-text("利用規約")'
    ).first();

    this.companyInfoLink = page.locator(
      'footer a:has-text("Company"), footer a:has-text("会社"), footer a:has-text("企業情報")'
    ).first();

    this.contactLink = page.locator(
      'footer a:has-text("Contact"), footer a:has-text("CONTACT"), footer a:has-text("お問い合わせ")'
    ).first();

    this.cookiePolicyLink = page.locator(
      'footer a:has-text("Cookie"), footer a:has-text("COOKIE POLICY"), footer a:has-text("クッキー")'
    ).first();

    this.codeOfConductLink = page.locator(
      'footer a:has-text("Code of Conduct"), footer a:has-text("CODE OF CONDUCT"), footer a:has-text("行動規範")'
    ).first();

    this.humanRightsPolicyLink = page.locator(
      'footer a:has-text("Human Rights"), footer a:has-text("HUMAN RIGHTS POLICY"), footer a:has-text("人権")'
    ).first();

    this.mediaKitLink = page.locator(
      'footer a:has-text("Media Kit"), footer a:has-text("MEDIA KIT"), footer a:has-text("メディアキット")'
    ).first();

    // Social media links - scoped to footer only
    this.socialMediaSection = page.locator('footer [class*="social"], footer [aria-label*="social"]').first();
    this.linkedInLink = page.locator('footer a[href*="linkedin.com"]').first();
    this.twitterLink = page.locator('footer a[href*="twitter.com"], footer a[href*="x.com"]').first();
    this.youtubeLink = page.locator('footer a[href*="youtube.com"]').first();
    this.facebookLink = page.locator('footer a[href*="facebook.com"]').first();
    this.instagramLink = page.locator('footer a[href*="instagram.com"]').first();
    this.githubLink = page.locator('footer a[href*="github.com"]').first();

    // All footer links
    this.footerLinks = page.locator('footer a');
  }

  /**
   * Scroll to footer
   */
  async scrollToFooter(): Promise<void> {
    await this.scrollToElement(this.footer);
    await this.wait(500); // Wait for scroll animation
  }

  /**
   * Check if footer is visible
   * @returns Boolean indicating visibility
   */
  async isFooterVisible(): Promise<boolean> {
    return await this.isVisible(this.footer);
  }

  /**
   * Check if Privacy Policy link exists
   * @returns Boolean indicating if link exists
   */
  async isPrivacyPolicyLinkVisible(): Promise<boolean> {
    await this.scrollToFooter();
    return await this.isVisible(this.privacyPolicyLink);
  }

  /**
   * Click on Privacy Policy link
   */
  async clickPrivacyPolicyLink(): Promise<void> {
    await this.scrollToFooter();
    await this.click(this.privacyPolicyLink);
    await this.waitForPageLoad();
  }

  /**
   * Check if Terms link exists
   * @returns Boolean indicating if link exists
   */
  async isTermsLinkVisible(): Promise<boolean> {
    await this.scrollToFooter();
    return await this.isVisible(this.termsLink);
  }

  /**
   * Click on Terms link
   */
  async clickTermsLink(): Promise<void> {
    await this.scrollToFooter();
    await this.click(this.termsLink);
    await this.waitForPageLoad();
  }

  /**
   * Check if Contact link is visible
   * @returns Boolean indicating visibility
   */
  async isContactLinkVisible(): Promise<boolean> {
    await this.scrollToFooter();
    return await this.isVisible(this.contactLink);
  }

  /**
   * Click on Contact link
   */
  async clickContactLink(): Promise<void> {
    await this.scrollToFooter();
    await this.dismissCookieConsent();
    await this.wait(500);
    await this.contactLink.click({ force: true });
    await this.wait(1000);
    await this.waitForPageLoad();
  }

  /**
   * Check if Cookie Policy link is visible
   * @returns Boolean indicating visibility
   */
  async isCookiePolicyLinkVisible(): Promise<boolean> {
    await this.scrollToFooter();
    return await this.isVisible(this.cookiePolicyLink);
  }

  /**
   * Click on Cookie Policy link
   */
  async clickCookiePolicyLink(): Promise<void> {
    await this.scrollToFooter();
    await this.dismissCookieConsent();
    await this.wait(500);
    await this.cookiePolicyLink.click({ force: true });
    await this.wait(1000);
    await this.waitForPageLoad();
  }

  /**
   * Check if Code of Conduct link is visible
   * @returns Boolean indicating visibility
   */
  async isCodeOfConductLinkVisible(): Promise<boolean> {
    await this.scrollToFooter();
    return await this.isVisible(this.codeOfConductLink);
  }

  /**
   * Click on Code of Conduct link
   */
  async clickCodeOfConductLink(): Promise<void> {
    await this.scrollToFooter();
    await this.dismissCookieConsent();
    await this.wait(500);
    await this.codeOfConductLink.click({ force: true });
    await this.wait(1000);
    await this.waitForPageLoad();
  }

  /**
   * Check if Human Rights Policy link is visible
   * @returns Boolean indicating visibility
   */
  async isHumanRightsPolicyLinkVisible(): Promise<boolean> {
    await this.scrollToFooter();
    return await this.isVisible(this.humanRightsPolicyLink);
  }

  /**
   * Click on Human Rights Policy link
   */
  async clickHumanRightsPolicyLink(): Promise<void> {
    await this.scrollToFooter();
    await this.dismissCookieConsent();
    await this.wait(500);
    await this.humanRightsPolicyLink.click({ force: true });
    await this.wait(1000);
    await this.waitForPageLoad();
  }

  /**
   * Check if Media Kit link is visible
   * @returns Boolean indicating visibility
   */
  async isMediaKitLinkVisible(): Promise<boolean> {
    await this.scrollToFooter();
    return await this.isVisible(this.mediaKitLink);
  }

  /**
   * Click on Media Kit link (opens in new tab)
   * @returns Promise with new page context
   */
  async clickMediaKitLink(): Promise<Page> {
    await this.scrollToFooter();
    await this.dismissCookieConsent();
    await this.wait(500);

    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page', { timeout: 30000 }),
      this.click(this.mediaKitLink)
    ]);
    await newPage.waitForLoadState('domcontentloaded', { timeout: 30000 });
    return newPage;
  }

  /**
   * Check if LinkedIn link is visible
   * @returns Boolean indicating visibility
   */
  async isLinkedInLinkVisible(): Promise<boolean> {
    await this.scrollToFooter();
    return await this.isVisible(this.linkedInLink);
  }

  /**
   * Get LinkedIn link URL
   * @returns LinkedIn URL or null
   */
  async getLinkedInUrl(): Promise<string | null> {
    await this.scrollToFooter();
    return await this.getAttribute(this.linkedInLink, 'href');
  }

  /**
   * Click LinkedIn link (opens in new tab)
   * @returns Promise with new page context
   */
  async clickLinkedInLink(): Promise<Page> {
    await this.scrollToFooter();
    // Dismiss cookie consent if present
    await this.dismissCookieConsent();
    await this.wait(500);

    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page', { timeout: 30000 }),
      this.click(this.linkedInLink)
    ]);
    await newPage.waitForLoadState('domcontentloaded', { timeout: 30000 });
    return newPage;
  }

  /**
   * Check if Twitter/X link is visible
   * @returns Boolean indicating visibility
   */
  async isTwitterLinkVisible(): Promise<boolean> {
    await this.scrollToFooter();
    return await this.isVisible(this.twitterLink);
  }

  /**
   * Get Twitter/X link URL
   * @returns Twitter URL or null
   */
  async getTwitterUrl(): Promise<string | null> {
    await this.scrollToFooter();
    return await this.getAttribute(this.twitterLink, 'href');
  }

  /**
   * Click Twitter/X link (opens in new tab)
   * @returns Promise with new page context
   */
  async clickTwitterLink(): Promise<Page> {
    await this.scrollToFooter();
    await this.dismissCookieConsent();
    await this.wait(500);

    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page', { timeout: 30000 }),
      this.click(this.twitterLink)
    ]);
    await newPage.waitForLoadState('domcontentloaded', { timeout: 30000 });
    return newPage;
  }

  /**
   * Check if YouTube link is visible
   * @returns Boolean indicating visibility
   */
  async isYoutubeLinkVisible(): Promise<boolean> {
    await this.scrollToFooter();
    return await this.isVisible(this.youtubeLink);
  }

  /**
   * Get YouTube link URL
   * @returns YouTube URL or null
   */
  async getYoutubeUrl(): Promise<string | null> {
    await this.scrollToFooter();
    return await this.getAttribute(this.youtubeLink, 'href');
  }

  /**
   * Click YouTube link (opens in new tab)
   * @returns Promise with new page context
   */
  async clickYoutubeLink(): Promise<Page> {
    await this.scrollToFooter();
    await this.dismissCookieConsent();
    await this.wait(500);

    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page', { timeout: 30000 }),
      this.click(this.youtubeLink)
    ]);
    await newPage.waitForLoadState('domcontentloaded', { timeout: 30000 });
    return newPage;
  }

  /**
   * Check if Facebook link is visible
   * @returns Boolean indicating visibility
   */
  async isFacebookLinkVisible(): Promise<boolean> {
    await this.scrollToFooter();
    return await this.isVisible(this.facebookLink);
  }

  /**
   * Get Facebook link URL
   * @returns Facebook URL or null
   */
  async getFacebookUrl(): Promise<string | null> {
    await this.scrollToFooter();
    return await this.getAttribute(this.facebookLink, 'href');
  }

  /**
   * Click Facebook link (opens in new tab)
   * @returns Promise with new page context
   */
  async clickFacebookLink(): Promise<Page> {
    await this.scrollToFooter();
    await this.dismissCookieConsent();
    await this.wait(500);

    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page', { timeout: 30000 }),
      this.click(this.facebookLink)
    ]);
    await newPage.waitForLoadState('domcontentloaded', { timeout: 30000 });
    return newPage;
  }

  /**
   * Check if Instagram link is visible
   * @returns Boolean indicating visibility
   */
  async isInstagramLinkVisible(): Promise<boolean> {
    await this.scrollToFooter();
    return await this.isVisible(this.instagramLink);
  }

  /**
   * Get Instagram link URL
   * @returns Instagram URL or null
   */
  async getInstagramUrl(): Promise<string | null> {
    await this.scrollToFooter();
    return await this.getAttribute(this.instagramLink, 'href');
  }

  /**
   * Click Instagram link (opens in new tab)
   * @returns Promise with new page context
   */
  async clickInstagramLink(): Promise<Page> {
    await this.scrollToFooter();
    await this.dismissCookieConsent();
    await this.wait(500);

    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page', { timeout: 30000 }),
      this.click(this.instagramLink)
    ]);
    await newPage.waitForLoadState('domcontentloaded', { timeout: 30000 });
    return newPage;
  }

  /**
   * Check if GitHub link is visible
   * @returns Boolean indicating visibility
   */
  async isGithubLinkVisible(): Promise<boolean> {
    await this.scrollToFooter();
    return await this.isVisible(this.githubLink);
  }

  /**
   * Get GitHub link URL
   * @returns GitHub URL or null
   */
  async getGithubUrl(): Promise<string | null> {
    await this.scrollToFooter();
    return await this.getAttribute(this.githubLink, 'href');
  }

  /**
   * Click GitHub link (opens in new tab)
   * @returns Promise with new page context
   */
  async clickGithubLink(): Promise<Page> {
    await this.scrollToFooter();
    await this.dismissCookieConsent();
    await this.wait(500);

    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page', { timeout: 30000 }),
      this.click(this.githubLink)
    ]);
    await newPage.waitForLoadState('domcontentloaded', { timeout: 30000 });
    return newPage;
  }

  /**
   * Get count of all footer links
   * @returns Number of links in footer
   */
  async getFooterLinksCount(): Promise<number> {
    await this.scrollToFooter();
    return await this.getElementCount(this.footerLinks);
  }

  /**
   * Get all footer link texts
   * @returns Array of link texts
   */
  async getAllFooterLinkTexts(): Promise<string[]> {
    await this.scrollToFooter();
    const links = await this.footerLinks.all();
    const linkTexts: string[] = [];

    for (const link of links) {
      const text = await this.getText(link);
      if (text) {
        linkTexts.push(text);
      }
    }

    return linkTexts;
  }

  /**
   * Verify all social media links are present
   * @returns Object with boolean values for each platform
   */
  async verifySocialMediaLinks(): Promise<{
    linkedin: boolean;
    twitter: boolean;
    youtube: boolean;
    facebook: boolean;
    instagram: boolean;
    github: boolean;
  }> {
    await this.scrollToFooter();

    return {
      linkedin: await this.isLinkedInLinkVisible(),
      twitter: await this.isTwitterLinkVisible(),
      youtube: await this.isYoutubeLinkVisible(),
      facebook: await this.isFacebookLinkVisible(),
      instagram: await this.isInstagramLinkVisible(),
      github: await this.isGithubLinkVisible()
    };
  }

  /**
   * Check if any social media links are broken (return 404)
   * @returns Array of broken links
   */
  async checkForBrokenLinks(): Promise<string[]> {
    await this.scrollToFooter();
    const links = await this.footerLinks.all();
    const brokenLinks: string[] = [];

    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href && href.startsWith('http')) {
        try {
          const response = await this.page.request.get(href);
          if (response.status() === 404) {
            brokenLinks.push(href);
          }
        } catch (error) {
          // Skip links that cause errors (might be external or blocked)
          console.log(`Could not check link: ${href}`);
        }
      }
    }

    return brokenLinks;
  }

  /**
   * Verify footer appears on current page
   * @returns Boolean indicating if footer is present and visible
   */
  async verifyFooterPresence(): Promise<boolean> {
    try {
      await this.page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      await this.wait(1000);
      return await this.isFooterVisible();
    } catch {
      return false;
    }
  }
}