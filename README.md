# Tier IV QA Automation Project

## Project Overview

This repository contains an automated test suite for the Tier IV website (https://tier4.jp), created as part of the Tier IV recruitment assessment.

**Target Website:** https://tier4.jp

**Testing Framework:** Playwright + TypeScript

**CI/CD Platform:** GitHub Actions

**Design Pattern:** Page Object Model (POM)

**Total Test Cases:** 58 test cases × 3 browsers = **174 automated tests**

---

## Manual Test Cases

### Test Case 1: Header Navigation Verification
**Test ID:** TC001

**Priority:** High

**Objective:** Verify that the header navigation menu is functional and all key header elements are accessible.

**Preconditions:**
- Browser is open
- Internet connection is available

**Test Steps:**
1. Navigate to https://tier4.jp
2. Wait for page to fully load
3. Verify page title contains "Tier IV"
4. Locate main navigation menu in header
5. Verify the following navigation links are visible and clickable:
    - **ABOUT US** (Opens in same tab, preserves language)
    - **OPEN SOURCE** (Opens in same tab, preserves language)
    - **OUR PRODUCTS** (Opens in same tab, preserves language)
    - **SERVICES** (Opens in new tab → services.tier4.jp)
    - **ALLIANCE** (Opens in same tab, preserves language)
    - **OUR TEAM** (Opens in same tab, preserves language)
    - **CAREERS** (Opens in new tab → careers.tier4.jp)
    - **MEDIA** (Opens in same tab, preserves language)
6. Click each link and verify correct page navigation
7. Click logo and verify return to homepage
8. Verify hamburger menu (for language switching) is visible and functional

**Expected Results:**
- Homepage loads within 5 seconds
- Page title is correct
- All navigation links are visible
- Navigation links are clickable
- Each link navigates to correct page
- Language context is properly preserved
- No console errors appear

**Automated Test Cases:**
- TC001-01 ~ TC001-03: Basic tests (homepage load, navigation visibility)
- TC001-04 ~ TC001-09: Same-tab navigation tests (About Us, Open Source, Products, Alliance, Team, Media)
- TC001-10 ~ TC001-11: New-tab navigation tests (Services, Careers)
- TC001-12 ~ TC001-14: UI elements tests (Logo, hamburger menu, heading)
- TC001-15 ~ TC001-18: Edge cases (Responsive, back navigation, console errors, clickability)

---

### Test Case 2: Language Switcher Functionality
**Test ID:** TC002

**Priority:** High

**Objective:** Verify that the language switcher toggles between English, Japanese, and Chinese correctly.

**Preconditions:**
- Browser is open
- User is on Tier IV homepage

**Test Steps:**
1. Navigate to https://tier4.jp
2. Open hamburger menu
3. Locate language switcher (EN/JP/CN options)
4. Note current language (default is usually Japanese)
5. Click on "EN" (English) option
6. Verify page content changes to English
7. Verify URL updates (may include /en/ path)
8. Click on "JP" (Japanese) option
9. Verify page content changes back to Japanese
10. Click on "CN" (Chinese) option
11. Test all language transition combinations (EN→JP, JP→CN, CN→EN, etc.)
12. Verify language preference persists across navigation

**Expected Results:**
- Language switcher is visible and accessible
- Clicking EN changes content to English
- Clicking JP changes content to Japanese
- Clicking CN changes content to Chinese
- URL reflects language change
- Language selection persists during session
- No layout breaks occur during language switch
- Browser back button handles language state correctly
- Language selection maintained after page reload

**Automated Test Cases:**
- TC002-01: Hamburger menu and language switcher visibility
- TC002-02 ~ TC002-04: Basic language switching (JP, CN, EN↔JP)
- TC002-05 ~ TC002-06: Language persistence and URL updates
- TC002-07: Page content verification in all three languages (JP, EN, CN)
- TC002-08 ~ TC002-09: Layout stability and multiple switches
- TC002-10 ~ TC002-14: Edge cases (Browser back, page reload, complete 3×3 transition matrix: JP↔CN, CN↔JP, CN↔EN)

---

### Test Case 3: Footer Links Validation
**Test ID:** TC003

**Priority:** Medium

**Objective:** Verify that footer contains all required links and they are functional.

**Preconditions:**
- Browser is open
- User is on Tier IV homepage

**Test Steps:**
1. Navigate to https://tier4.jp
2. Scroll to bottom of page to footer section
3. Verify footer is visible
4. Verify the following footer sections exist:
    - **Legal Links:**
        - CONTACT (Same tab)
        - PRIVACY POLICY (Same tab)
        - COOKIE POLICY (Same tab)
        - CODE OF CONDUCT (Same tab)
        - HUMAN RIGHTS POLICY (Same tab)
        - MEDIA KIT (New tab, always English)
    - **Social Media Links:**
        - LinkedIn (New tab)
        - Twitter/X (New tab)
        - YouTube (New tab)
        - Facebook (New tab)
        - Instagram (New tab)
        - GitHub (New tab → autowarefoundation/autoware)
5. Click each legal link and verify correct page navigation
6. Click each social media icon and verify it opens in new tab
7. Verify social media links direct to official Tier IV profiles
8. Change language and verify footer structure is maintained

**Expected Results:**
- Footer is visible on all pages
- All footer links are present
- Footer links are clickable
- Legal links load correct pages
- Social media links open in new tabs
- Social media links direct to correct profiles
- No broken links (404 errors)
- Footer maintains structure across languages
- Footer is accessible via keyboard navigation

**Automated Test Cases:**
- TC003-01 ~ TC003-04: Basic tests (Footer visibility, link count, link texts, social media presence)
- TC003-05 ~ TC003-09: Same-tab legal links (Contact, Privacy, Cookie Policy, Code of Conduct, Human Rights)
- TC003-10 ~ TC003-16: New-tab links (Media Kit, LinkedIn, Twitter/X, YouTube, Facebook, Instagram, GitHub)
- TC003-17 ~ TC003-26: Edge cases (Keyboard navigation, page reload, responsive design, cross-language consistency, URL verification)

---

## Project Architecture

### Design Patterns Used

#### 1. **Page Object Model (POM)**
Separates test logic from page-specific code, improving maintainability and reusability. Each page has its own class with methods and locators.

```typescript
// Example: HomePage.ts
export class HomePage extends BasePage {
  private readonly careersLink: Locator;

  async clickCareersLink(): Promise<void> {
    await this.click(this.careersLink);
  }
}
```

#### 2. **Base Page Pattern**
Common functionality inherited by all page objects. Reduces code duplication and centralizes common actions.

```typescript
// Example: BasePage.ts
export class BasePage {
  async click(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click({ force: true });
  }
}
```

#### 3. **Component Object Pattern**
Represents reusable components (footer, header, etc.) as separate objects.

```typescript
// Example: FooterComponent.ts
export class FooterComponent extends BasePage {
  async clickContactLink(): Promise<void> {
    await this.scrollToFooter();
    await this.dismissCookieConsent();
    await this.clickAndNavigateWithRetry(this.contactLink, 3);
  }
}
```

#### 4. **Retry Pattern with Exponential Backoff**
Automatic retry logic to handle flaky tests in CI environments. Especially effective for WebKit browser new tab operations and navigation failures.

```typescript
// Example: Retry logic in FooterComponent.ts
private async clickLinkWithRetry(locator: Locator, maxAttempts: number = 3): Promise<Page> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const [newPage] = await Promise.all([
        this.page.context().waitForEvent('page', { timeout: 30000 }),
        this.click(locator)
      ]);
      await newPage.waitForLoadState('domcontentloaded', { timeout: 30000 });
      return newPage;
    } catch (error) {
      if (attempt < maxAttempts) {
        await this.wait(1000 * attempt); // Exponential backoff
        await this.scrollToFooter();
        await this.dismissCookieConsent();
        await this.wait(500);
      }
    }
  }
  throw lastError || new Error('Failed to open new tab after retries');
}
```

### Project Structure

```
tierIV-qa-automation-Jerome/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD configuration
├── tests/
│   ├── header.spec.ts              # TC001: Header navigation tests (18 tests)
│   ├── language-switcher.spec.ts   # TC002: Language switching tests (14 tests)
│   └── footer.spec.ts              # TC003: Footer validation tests (26 tests)
├── pages/
│   ├── BasePage.ts                 # Base class with common functionality
│   ├── HomePage.ts                 # Homepage page object
│   └── FooterComponent.ts          # Footer component object with retry logic
├── playwright.config.ts            # Playwright configuration
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── auth.json                       # Authentication state storage
├── .gitignore                      # Git ignore rules
└── README.md                       # This file
```

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/tierIV-qa-automation-Jerome.git
   cd tierIV-qa-automation-Jerome
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

### Running Tests

**Run all tests**
```bash
npm test
```

**Run tests on specific browser**
```bash
npm test -- --project=chromium
npm test -- --project=firefox
npm test -- --project=webkit
```

**Run specific test file**
```bash
npx playwright test tests/header.spec.ts
npx playwright test tests/language-switcher.spec.ts
npx playwright test tests/footer.spec.ts
```

**Run tests in headed mode**
```bash
npx playwright test --headed
```

**Run tests in debug mode**
```bash
npx playwright test --debug
```

**Generate and open HTML report**
```bash
npx playwright show-report
```

---

## CI/CD Pipeline

### GitHub Actions Workflow

The project uses GitHub Actions for continuous integration.

#### Triggers:
- Push to `main` branch
- Pull requests to `main` branch
- Manual workflow dispatch

#### Execution Steps:
1. Checks out code
2. Sets up Node.js environment
3. Installs dependencies
4. Installs Playwright browsers
5. Runs all tests in parallel
6. Uploads test reports as artifacts

#### View Results:
1. Go to "Actions" tab in GitHub repository
2. Click on latest workflow run
3. Download "playwright-report" artifact to view detailed results

### CI Configuration Highlights

- **Parallel execution:** Tests run concurrently for faster feedback
- **Multiple browsers:** Tests run on Chromium, Firefox, and WebKit
- **Automatic retries:** Retries failed tests up to 2 times
- **Artifact retention:** Test reports stored for 30 days
- **Always runs:** Report generation happens even if tests fail

---

## Test Reports

### HTML Report

After running tests, an HTML report is generated with:
- Test execution summary
- Screenshots on failure
- Video recordings (if enabled)
- Detailed step-by-step logs
- Performance metrics

**View report locally:**
```bash
npx playwright show-report
```

### CI Report

In GitHub Actions:
1. Navigate to Actions tab
2. Click on workflow run
3. Scroll to "Artifacts" section
4. Download "playwright-report.zip"
5. Extract and open "index.html"

---

## Code Standards

### Best Practices Implemented

#### 1. **Type Safety**
- Full TypeScript implementation
- No `any` types
- Proper interfaces and types

```typescript
// Example: Type-safe page object
export class HomePage extends BasePage {
  private readonly careersLink: Locator;

  async clickCareersLink(): Promise<void> { }
  async isHomePageLoaded(): Promise<boolean> { }
}
```

#### 2. **Error Handling**
- Graceful handling of timeouts
- Clear error messages
- Proper assertions
- Retry mechanisms for flaky operations

```typescript
// Example: Error handling with retry
try {
  const [newPage] = await Promise.all([
    this.page.context().waitForEvent('page', { timeout: 30000 }),
    this.click(locator)
  ]);
  return newPage;
} catch (error) {
  if (attempt < maxAttempts) {
    console.log(`Retry attempt ${attempt}/${maxAttempts - 1}`);
    await this.wait(1000 * attempt); // Exponential backoff
  }
}
```

#### 3. **Code Organization**
- Single Responsibility Principle
- DRY (Don't Repeat Yourself)
- Clear naming conventions
- Separation of logic and data

#### 4. **Test Independence**
- Each test can run independently
- No test depends on another
- Proper setup and teardown
- State isolation

#### 5. **Maintainability**
- Page Object Model for easy updates
- Centralized locators
- Reusable utility functions
- Clear documentation

---

## Test Coverage

### Test Suite Summary

| Test Suite | Test Cases | Tests per Browser | Total Tests | Status |
|------------|-----------|-------------------|-------------|---------|
| TC001: Header Navigation | 18 | 18 × 3 = 54 | 54 |  |
| TC002: Language Switcher | 14 | 14 × 3 = 42 | 42 |  |
| TC003: Footer Validation | 26 | 26 × 3 = 78 | 78 |  |
| **Total** | **58** | **58 × 3** | **174** | **** |

### Browser Coverage

| Browser | Tests | Pass Rate | Notes |
|---------|-------|-----------|-------|
| Chromium | 58 | ~100% | Fastest execution (~9 min in CI) |
| Firefox | 58 | ~100% | Stable execution (~8 min in CI) |
| WebKit | 58 | ~95-100% | Slower execution (~15-20 min in CI), retry logic implemented |


## Troubleshooting

### Common Issues

**Issue: Tests failing with timeout**
- Solution: Increase timeout in `playwright.config.ts` or use `test.slow()`

**Issue: Browser not launching**
- Solution: Run `npx playwright install --with-deps`

**Issue: Tests pass locally but fail in CI**
- Solution: Check for timing issues, use proper waits instead of hard sleeps
- Retry logic has been implemented to handle CI flakiness

**Issue: Element not found**
- Solution: Verify locators are correct, check if page structure changed

**Issue: WebKit not opening new tabs**
- Solution: Retry logic implemented with 3 attempts and exponential backoff

---

## Technical Highlights

### Advanced Features Implemented

1. **Automatic Retry Mechanism**
    - Addresses WebKit flakiness in CI
    - Exponential backoff strategy (1s, 2s, 3s)
    - Supports both new tab and navigation operations

2. **Automatic Cookie Consent Handling**
    - Prevents test interruptions
    - Automatically dismisses before each operation

3. **Language Context Preservation**
    - Tracks language state across navigation
    - Validates language-specific behaviors

4. **Full Type Safety**
    - TypeScript types for all methods and properties
    - Compile-time error detection

5. **Comprehensive Error Logging**
    - Detailed error messages
    - Debug support with screenshots and videos

---

## Author

**Jerome Nicholaz**
Tier IV, Inc. Recruitment Assessment Submission

---

## Submission Information

**Project Completion Date:** October 25, 2025
**Repository Tag:** DONE
**Status:** Complete - All tests have passed in CI

---

## Acknowledgments

Thank you to Tier IV for the opportunity to work on this assessment. Special thanks to the Playwright documentation and TypeScript team & community for their excellent resources and support.
