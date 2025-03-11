# QA Automation Framework for dApp Testing

## 📌 Overview

This repository contains an automated test suite for a decentralized application from Libre Capital QA Challenge using **Dappwright**, **Playwright**, and **Cucumber.js**. The tests cover wallet connections, ERC20 token interactions, and deposits on the Sepolia testnet.

## 🚀 Features

- **Cucumber BDD Tests** – Step definitions using Gherkin syntax
- **Dappwright Integration** – Automated MetaMask interactions
- **Playwright for Browser Automation**
- **GitHub Actions CI/CD Pipeline** – Automated test execution
- **dApp Interaction** – ERC20 token search, deposits, and wallet management

## 📂 Project Structure

```
root/
  ├── .github/            # Github Workflows
  │   ├── workflows
  │       ├── playwright.yml
  │
  ├── features/            # Cucumber feature files
  │   ├── 01-app-access.feature
  │   ├── 02-search-erc20-token.feature
  │   ├── 03-deposit-erc20-token.feature
  │
  ├── pages/               # Page object model (POM)
  │   ├── balance.page.ts
  │   ├── main.page.ts
  │   ├── metamask.page.ts
  │
  ├── steps/               # Step definitions for features
  │   ├── 01-app-access.step.ts
  │   ├── 02-search-erc20-token.step.ts
  │   ├── 03-deposit-erc20-token.feature
  │   ├── shared.step.ts
  │
  ├── .env.example         # Environment variables
  ├── cucumber.json        # Cucumber configuration
  ├── LESSONS.md           # Lessons learned and possible improvements of QA Challenge
  ├── package.json         # Dependencies
  ├── playwright.config.ts # Playwright configuration
  ├── README.md            # Instruction on how to run tests
```

## 🔧 Installation & Setup

### 1️⃣ Install Dependencies

```sh
npm install
```

### 2️⃣ Set Up Environment Variables

Create a `.env` file in the root directory and add:

```sh
SEED_PHRASE="your 12-word seed phrase here"
```

in /e2e folder you can find one example

### 3️⃣ Install Playwright Browsers

```sh
npx playwright install --with-deps
```

## 🏃 Running Tests

### Run All Tests

```sh
npx cucumber-js
```

### Run a Specific Feature File

```sh
npm run test
```

## 🔄 CI/CD Integration

### GitHub Actions Workflow

This project includes a **GitHub Actions workflow** to run tests automatically.

#### **📁 `.github/workflows/playwright.yml`**
