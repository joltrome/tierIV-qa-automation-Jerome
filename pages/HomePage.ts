import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * HomePage Class
 *
 * Page Object for Tier IV homepage (https://tier4.jp)
 * Contains all locators and methods specific to the homepage
 *
 * Follows Page Object Model (POM) design pattern:
 * - Encapsulates page elements as properties
 * - Provides methods for page interactions
 * - Inherits common functionality from BasePage
 */

export class HomePage extends BasePage {
  // Header Navigation Locators
  private readonly logo: Locator;
  private readonly navigationMenu: Locator;
  private readonly aboutUsLink: Locator;
  private readonly openSourceLink: Locator;
  private readonly productsLink: Locator;
  private readonly servicesLink: Locator;
  private readonly allianceLink: Locator;
  private readonly teamLink: Locator;
  private readonly careersLink: Locator;
  private readonly mediaLink: Locator;

  // Language Switcher Locators (Hamburger Menu)
  private readonly hamburgerMenu: Locator;
  private readonly languageDropdown: Locator;
  private readonly japaneseOption: Locator;
  private readonly englishOption: Locator;
  private readonly chineseOption: Locator;

  // Main Content Locators
  private readonly mainHeading: Locator;
  private readonly heroSection: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize Header Navigation Locators
    this.logo = page.locator('a[href="/"]').first();
    this.navigationMenu = page.locator('nav, header nav, [role="navigation"]').first();

    // Navigation links - actual Tier IV menu structure
    this.aboutUsLink = page.locator('a:has-text("ABOUT US"), a:has-text("About Us")').first();
    this.openSourceLink = page.locator('a:has-text("OPEN SOURCE"), a:has-text("Open Source")').first();
    this.productsLink = page.locator('a:has-text("OUR PRODUCTS"), a:has-text("Our Products")').first();
    this.servicesLink = page.locator('a:has-text("SERVICES"), a:has-text("Services")').first();
    this.allianceLink = page.locator('a:has-text("ALLIANCE"), a:has-text("Alliance")').first();
    this.teamLink = page.locator('a:has-text("OUR TEAM"), a:has-text("Our Team")').first();
    this.careersLink = page.locator('a:has-text("CAREERS"), a:has-text("Careers")').first();
    this.mediaLink = page.locator('a:has-text("MEDIA"), a:has-text("Media")').first();

    // Hamburger Menu & Language Switcher (top-right corner)
    this.hamburgerMenu = page.locator('button[aria-label*="menu"], .hamburger, button:has(svg):has-text("")').first();
    this.languageDropdown = page.locator('[class*="language"], [class*="lang"]').first();
    this.japaneseOption = page.locator('a:has-text("JP"), button:has-text("JP"), a:has-text("JA")').first();
    this.englishOption = page.locator('a:has-text("EN"), button:has-text("EN")').first();
    this.chineseOption = page.locator('a:has-text("CN"), button:has-text("CN"), a:has-text("ZH")').first();

    // Main Content
    this.mainHeading = page.locator('h1, [role="heading"][aria-level="1"], main h2').first();
    this.heroSection = page.locator('[class*="hero"], [class*="banner"], main section').first();
  }

  /**
   * Navigate to homepage
   */
  async navigateToHomepage(): Promise<void> {
    await this.goto('/');
    await this.waitForPageLoad();
  }

  /**
   * Verify homepage is loaded correctly
   * @returns Boolean indicating if homepage loaded successfully
   */
  async isHomePageLoaded(): Promise<boolean> {
    try {
      await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 });
      const title = await this.getTitle();
      return title.toLowerCase().includes('tier') || title.includes('ティア');
    } catch {
      return false;
    }
  }

  /**
   * Get page title
   * @returns Page title text
   */
  async getPageTitle(): Promise<string> {
    return await this.getTitle();
  }

  /**
   * Check if navigation menu is visible
   * @returns Boolean indicating visibility
   */
  async isNavigationMenuVisible(): Promise<boolean> {
    return await this.isVisible(this.navigationMenu);
  }

  /**
   * Check if About Us link is visible
   * @returns Boolean indicating visibility
   */
  async isAboutUsLinkVisible(): Promise<boolean> {
    return await this.isVisible(this.aboutUsLink);
  }

  /**
   * Check if Open Source link is visible
   * @returns Boolean indicating visibility
   */
  async isOpenSourceLinkVisible(): Promise<boolean> {
    return await this.isVisible(this.openSourceLink);
  }

  /**
   * Check if Our Products link is visible
   * @returns Boolean indicating visibility
   */
  async isProductsLinkVisible(): Promise<boolean> {
    return await this.isVisible(this.productsLink);
  }

  /**
   * Check if Services link is visible
   * @returns Boolean indicating visibility
   */
  async isServicesLinkVisible(): Promise<boolean> {
    return await this.isVisible(this.servicesLink);
  }

  /**
   * Check if Alliance link is visible
   * @returns Boolean indicating visibility
   */
  async isAllianceLinkVisible(): Promise<boolean> {
    return await this.isVisible(this.allianceLink);
  }

  /**
   * Check if Our Team link is visible
   * @returns Boolean indicating visibility
   */
  async isTeamLinkVisible(): Promise<boolean> {
    return await this.isVisible(this.teamLink);
  }

  /**
   * Check if Careers link is visible
   * @returns Boolean indicating visibility
   */
  async isCareersLinkVisible(): Promise<boolean> {
    return await this.isVisible(this.careersLink);
  }

  /**
   * Check if Media link is visible
   * @returns Boolean indicating visibility
   */
  async isMediaLinkVisible(): Promise<boolean> {
    return await this.isVisible(this.mediaLink);
  }

  /**
   * Click on Careers/Recruitment link
   */
  async clickCareersLink(): Promise<void> {
    await this.click(this.careersLink);
    await this.waitForPageLoad();
  }

  /**
   * Click on Products link
   */
  async clickProductsLink(): Promise<void> {
    await this.click(this.productsLink);
    await this.waitForPageLoad();
  }

  /**
   * Click on About Us link
   */
  async clickAboutUsLink(): Promise<void> {
    await this.click(this.aboutUsLink);
    await this.waitForPageLoad();
  }

  /**
   * Click on About Us link (serves as "Company" page)
   */
  async clickCompanyLink(): Promise<void> {
    await this.click(this.aboutUsLink);
    await this.waitForPageLoad();
  }

  /**
   * Click on Media link (serves as "News" page)
   */
  async clickNewsLink(): Promise<void> {
    await this.click(this.mediaLink);
    await this.waitForPageLoad();
  }

  /**
   * Click on Media link
   */
  async clickMediaLink(): Promise<void> {
    await this.click(this.mediaLink);
    await this.waitForPageLoad();
  }

  /**
   * Open hamburger menu
   */
  async openHamburgerMenu(): Promise<void> {
    const isVisible = await this.isVisible(this.hamburgerMenu);
    if (isVisible) {
      await this.click(this.hamburgerMenu);
      await this.wait(500); // Wait for menu animation
    }
  }

  /**
   * Check if hamburger menu is visible
   * @returns Boolean indicating visibility
   */
  async isHamburgerMenuVisible(): Promise<boolean> {
    return await this.isVisible(this.hamburgerMenu);
  }

  /**
   * Switch to English language
   */
  async switchToEnglish(): Promise<void> {
    await this.openHamburgerMenu();
    const isVisible = await this.isVisible(this.englishOption);
    if (isVisible) {
      await this.click(this.englishOption);
      await this.wait(1000); // Wait for language switch
      await this.waitForPageLoad();
    }
  }

  /**
   * Switch to Japanese language
   */
  async switchToJapanese(): Promise<void> {
    await this.openHamburgerMenu();
    const isVisible = await this.isVisible(this.japaneseOption);
    if (isVisible) {
      await this.click(this.japaneseOption);
      await this.wait(1000); // Wait for language switch
      await this.waitForPageLoad();
    }
  }

  /**
   * Switch to Chinese language
   */
  async switchToChinese(): Promise<void> {
    await this.openHamburgerMenu();
    const isVisible = await this.isVisible(this.chineseOption);
    if (isVisible) {
      await this.click(this.chineseOption);
      await this.wait(1000); // Wait for language switch
      await this.waitForPageLoad();
    }
  }

  /**
   * Check if language switcher is visible
   * @returns Boolean indicating visibility
   */
  async isLanguageSwitcherVisible(): Promise<boolean> {
    return await this.isHamburgerMenuVisible();
  }

  /**
   * Detect current language based on URL or content
   * @returns 'en', 'ja', or 'cn'
   */
  getCurrentLanguage(): string {
    const url = this.getCurrentUrl();
    if (url.includes('/en')) {
      return 'en';
    } else if (url.includes('/cn') || url.includes('/zh')) {
      return 'cn';
    } else if (url.includes('/ja')) {
      return 'ja';
    }
    // Default is Japanese for tier4.jp
    return 'ja';
  }

  /**
   * Verify URL contains careers/recruitment path
   * @returns Boolean indicating if on careers page
   */
  isOnCareersPage(): boolean {
    const url = this.getCurrentUrl().toLowerCase();
    return url.includes('career') || url.includes('recruit') || url.includes('採用');
  }

  /**
   * Get all navigation links
   * @returns Array of navigation link texts
   */
  async getAllNavigationLinks(): Promise<string[]> {
    const links = await this.page.locator('nav a, header nav a').all();
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
   * Check if main heading is visible
   * @returns Boolean indicating visibility
   */
  async isMainHeadingVisible(): Promise<boolean> {
    return await this.isVisible(this.mainHeading);
  }

  /**
   * Get main heading text
   * @returns Main heading text content
   */
  async getMainHeadingText(): Promise<string> {
    return await this.getText(this.mainHeading);
  }

  /**
   * Verify logo is clickable and returns to homepage
   */
  async clickLogoAndVerifyHomepage(): Promise<boolean> {
    await this.click(this.logo);
    await this.waitForPageLoad();
    return this.getCurrentUrl().endsWith('/') || this.getCurrentUrl().endsWith('/en') || this.getCurrentUrl().endsWith('/ja');
  }
}