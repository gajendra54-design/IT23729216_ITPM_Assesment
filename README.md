# IT23729216_ITPM_Assesment
# SwiftTranslator Test Automation Suite

This project contains automated tests for the SwiftTranslator Singlish to Sinhala conversion system using Playwright.

## Project Overview

This test suite validates the functionality of the SwiftTranslator web application by testing:
- 24 positive functional scenarios
- 10 negative functional scenarios  
- 1 UI-related test scenario

## Prerequisites

Before running the tests, ensure you have the following installed:
- Node.js (version 16 or higher)
- npm (comes with Node.js)

## Installation

### Step 1: Clone or Download the Repository

If you have the project as a zip file, extract it. If it's a Git repository:

```bash
git clone <repository-url>
cd <project-directory>
```

### Step 2: Install Dependencies

Run the following command in the project root directory:

```bash
npm install
```

### Step 3: Install Playwright Browsers

After installing dependencies, install the required browsers:

```bash
npx playwright install chromium
```

## Project Structure

```
.
├── swift-translator-tests.spec.js    # Main test file
├── playwright.config.js              # Playwright configuration
├── package.json                      # Project dependencies
└── README.md                         # This file
```

## Running the Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Headed Mode (visible browser)

```bash
npm run test:headed
```

### Run Tests with UI Mode (interactive)

```bash
npm run test:ui
```

### Run Tests in Debug Mode

```bash
npm run test:debug
```

### View Test Report

After running tests, view the HTML report:

```bash
npm run report
```

## Test Coverage

### Positive Functional Tests (24 scenarios)

The test suite covers:
- **Sentence Structures**: Simple, compound, and complex sentences
- **Question Forms**: Various interrogative patterns
- **Command Forms**: Direct and polite imperatives
- **Tense Variations**: Past, present, and future tenses
- **Negations**: Different negative sentence forms
- **Greetings & Responses**: Common conversational patterns
- **Mixed Language**: English terms embedded in Singlish
- **Punctuation**: Special characters and formatting
- **Numbers & Currency**: Numerical formats and currency

### Negative Functional Tests (10 scenarios)

Tests for robustness including:
- Missing spaces between words
- Multiple consecutive spaces
- Line breaks in input
- Informal slang expressions
- Mixed language with formatting errors
- Abbreviations and technical terms
- Typographical errors

### UI Test (1 scenario)

- Real-time output update validation
- Tests that translation appears dynamically as user types

## Test Data Structure

Each test case includes:
- **Test Case ID**: Unique identifier (e.g., Pos_Fun_001)
- **Name**: Descriptive test name
- **Input**: Singlish text to translate
- **Expected Output**: Expected Sinhala translation
- **Category**: Test category (e.g., Daily language usage)
- **Grammar**: Grammar focus (e.g., Simple sentence)
- **Length**: Input length type (S/M/L)

## Configuration

Test timeouts and settings can be modified in `playwright.config.js`:
- Default timeout: 60 seconds
- Expect timeout: 10 seconds
- Retries: 0 (can be increased for flaky tests)
- Workers: 1 (sequential execution)

## Troubleshooting

### Tests Failing

1. **Network Issues**: Ensure stable internet connection
2. **Site Changes**: Website structure may have changed - verify selectors
3. **Timeout Errors**: Increase timeout values in config or test files

### Installation Issues

1. **Node.js Version**: Ensure you're using Node.js 16+
   ```bash
   node --version
   ```

2. **Clear Cache**: If having npm issues
   ```bash
   npm cache clean --force
   npm install
   ```

### Browser Issues

If Playwright browsers aren't working:
```bash
npx playwright install --force chromium
```

## Test Results

Test results are saved in the `test-results/` directory:
- HTML report: `test-results/html-report/`
- JSON results: `test-results/test-results.json`
- Screenshots/Videos: `test-results/artifacts/`

## Notes

- Tests run sequentially (workers: 1) to avoid conflicts
- Each test waits 2 seconds between executions for stability
- Screenshots and videos are captured only on failure
- All tests use the same base URL configured in `playwright.config.js`

## License

This project is for educational purposes as part of IT3040 - ITPM assignment.

## Author

BSc (Hons) in Information Technology - Year 3 Student
