import { When, Then } from "@cucumber/cucumber";
import BalancePage from "../pages/balance.page";
import { page, metamask, context } from "./shared.step";
import { Page } from "@playwright/test";

let balancePage: BalancePage;

When(/^the user clicks the Get more tokens link$/, async function () {
  balancePage = new BalancePage(page);
  await balancePage.clickOnMintTokens();
});

When(/^the user accepts the transaction$/, async function () {
  await metamask.confirmTransaction();
});

When(
  /^the user enter the max amount of tokens in the amount field$/,
  async function () {
    balancePage = new BalancePage(page);
    await balancePage.enterMaxAmoutnOfTokens();
  }
);

When(/^the user clicks the deposit button$/, async function () {
  balancePage = new BalancePage(page);
  await balancePage.clickOnDepositButton();
});

When(/^the user approve the deposit$/, async function () {
  const metamaskPage = context
    .pages()
    .find((p) => p.url().includes("chrome-extension"));

  if (!metamaskPage) {
    throw new Error("MetaMask tab not found.");
  }

  await metamaskPage.bringToFront();

  await metamaskPage.click("[data-testid='account-overview__activity-tab']");

  const transactionRow = metamaskPage.locator(
    "[class='mm-box transaction-list__transactions'] > div:first-child"
  );
  await transactionRow.waitFor({ state: "visible", timeout: 20000 });

  const depositTransaction = metamaskPage
    .locator("[data-testid='activity-list-item-action']")
    .filter({ hasText: "Deposit" });

  const statusLabel = metamaskPage
    .locator(".transaction-status-label--unapproved")
    .nth(0);

  let retries = 0;
  const maxRetries = 15;
  let depositFound = false;

  while (retries < maxRetries) {
    const isDepositVisible = await depositTransaction.isVisible();
    const isStatusUnapproved = await statusLabel.isVisible();

    if (isDepositVisible && isStatusUnapproved) {
      depositFound = true;
      break;
    }

    retries++;
    await metamaskPage.waitForTimeout(2000);
  }

  if (!depositFound) {
    throw new Error(
      "Timed out waiting for 'Deposit - Unapproved' transaction."
    );
  }

  await transactionRow.click();

  await metamaskPage.waitForSelector(
    '[data-testid="confirm-footer-button"]',
    {}
  );
  await metamaskPage.click('[data-testid="confirm-footer-button"]');
});

When(/^the user cancels the deposit$/, async function () {
  await metamask.reject();
});

When(/^the user accept sending cap request$/, async () => {
  await metamask.confirmTransaction();
});

When(/^the user switches back to the dApp page$/, async function () {
  const application: Page | undefined = context
    .pages()
    .find((p) => p.url().includes("localhost"));

  await application?.bringToFront();
});

Then(
  "the page shows the token balance {string}",
  async function (expectedBalance: string) {
    balancePage = new BalancePage(page);
    await balancePage.validateTokenBalance(expectedBalance);
  }
);

Then("the deposit input shows an error {string}", async function (error) {
  balancePage = new BalancePage(page);
  await balancePage.validateDepositErrorIsShown(error);
});

Then("the deposit button is {string}", async function (visibility) {
  balancePage = new BalancePage(page);
  if (visibility === "visible") {
    await balancePage.validateDepositButtonIsVisible();
  } else if (visibility === "not visible") {
    await balancePage.validateDepositButtonIsNotVisible();
  }
});
