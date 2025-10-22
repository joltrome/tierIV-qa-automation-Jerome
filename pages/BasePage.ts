import { Page, Locator } from '@playwright/test';

/**
 * BasePage Class
 *
 * This base class provides common functionality for all page objects.
 * It follows the Page Object Model (POM) design pattern and implements
 * reusable methods that can be inherited by specific page classes.
 *
 * Design Patterns:
 * - Template Method Pattern: Common actions defined here
 * - Inheritance: All page objects extend this class
 * - Encapsulation: Browser interaction logic centralized
 */

export class BasePage {
  readonly page: Page;
  readonly baseURL: string;

  constructor(page: Page) {
    this.page = page;
    this.baseURL = 'https://tier4.jp';
  }

  /**
   * Navigate to a specific URL
   * @param path - Relative path to navigate to
   */
  async goto(path: string = ''): Promise<void> {
    const url = path.startsWith('http') ? path : `${this.baseURL}${path}`;
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click on an element with retry logic
   * @param locator - Playwright locator
   */
  async click(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click({ force: true });
  }

  /**
   * Type text into an input field
   * @param locator - Playwright locator
   * @param text - Text to type
   */
  async fill(locator: Locator, text: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(text);
  }

  /**
   * Get text content from an element
   * @param locator - Playwright locator
   * @returns Text content
   */
  async getText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    const text = await locator.textContent();
    return text?.trim() || '';
  }

  /**
   * Check if an element is visible
   * @param locator - Playwright locator
   * @returns Boolean indicating visibility
   */
  async isVisible(locator: Locator): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if an element is enabled
   * @param locator - Playwright locator
   * @returns Boolean indicating if element is enabled
   */
  async isEnabled(locator: Locator): Promise<boolean> {
    return await locator.isEnabled();
  }

  /**
   * Wait for an element to be visible
   * @param locator - Playwright locator
   * @param timeout - Optional timeout in milliseconds
   */
  async waitForElement(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Scroll to an element
   * @param locator - Playwright locator
   */
  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Get current URL
   * @returns Current page URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Get page title
   * @returns Page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Take a screenshot
   * @param name - Screenshot filename
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({
      path: `screenshots/${name}.png`,
      fullPage: true
    });
  }

  /**
   * Wait for a specific duration
   * @param milliseconds - Time to wait in milliseconds
   */
  async wait(milliseconds: number): Promise<void> {
    await this.page.waitForTimeout(milliseconds);
  }

  /**
   * Hover over an element
   * @param locator - Playwright locator
   */
  async hover(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.hover();
  }

  /**
   * Press a keyboard key
   * @param key - Key to press
   */
  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  /**
   * Reload the current page
   */
  async reload(): Promise<void> {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
  }

  /**
   * Go back to previous page
   */
  async goBack(): Promise<void> {
    await this.page.goBack({ waitUntil: 'domcontentloaded' });
  }

  /**
   * Check if URL contains specific text
   * @param text - Text to check in URL
   * @returns Boolean indicating if URL contains text
   */
  urlContains(text: string): boolean {
    return this.getCurrentUrl().includes(text);
  }

  /**
   * Wait for URL to contain specific text
   * @param text - Text to wait for in URL
   * @param timeout - Timeout in milliseconds
   */
  async waitForUrlContains(text: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForURL(url => url.includes(text), { timeout });
  }

  /**
   * Get all console messages (useful for debugging)
   */
  setupConsoleListener(): void {
    this.page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  }

  /**
   * Dismiss cookie consent dialog if present
   */
  async dismissCookieConsent(): Promise<void> {
    try {
      // Look for common cookie consent buttons
      const acceptButton = this.page.locator(
        'button:has-text("Accept"), button:has-text("同意"), #CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll, [id*="cookie"] button:has-text("OK")'
      ).first();

      const isVisible = await acceptButton.isVisible({ timeout: 2000 });
      if (isVisible) {
        await acceptButton.click({ force: true });
        await this.wait(500);
      }
    } catch {
      // No cookie dialog or already dismissed
    }
  }

  /**
   * Get attribute value from an element
   * @param locator - Playwright locator
   * @param attribute - Attribute name
   * @returns Attribute value
   */
  async getAttribute(locator: Locator, attribute: string): Promise<string | null> {
    await locator.waitFor({ state: 'attached' });
    return await locator.getAttribute(attribute);
  }

  /**
   * Count number of elements matching locator
   * @param locator - Playwright locator
   * @returns Number of elements
   */
  async getElementCount(locator: Locator): Promise<number> {
    return await locator.count();
  }
}