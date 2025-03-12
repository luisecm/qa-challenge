import { When, Then } from "@cucumber/cucumber";
import BalancePage from "../pages/balance.page";
import { page, metamask, context } from "./shared.step";

let balancePage: BalancePage;

When(/^the user clicks the Get more tokens link$/, async function () {
  balancePage = new BalancePage(page);
  await balancePage.clickOnMintTokens();
});

When(/^the user accepts the transaction$/, async function () {
  await metamask.confirmTransaction();
});

When(/^the deposit button is visible$/, async function () {
  balancePage = new BalancePage(page);
  await balancePage.validateDepositButtonIsVisible();
});

When(
  /^the user enters the max amount of tokens in the amount field$/,
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

Then(
  /^the page shows the token balance {number}$/,
  async function (expectedBalance: Number) {
    balancePage = new BalancePage(page);
    await balancePage.validateTokenBalance(expectedBalance.toString());
  }
);

Then(/^the deposit input shows an error$/, async function () {
  balancePage = new BalancePage(page);
  await balancePage.validateDepositErrorIsShown();
});

Then(/^the deposit button is not visible$/, async function () {
  balancePage = new BalancePage(page);
  await balancePage.validateDepositButtonIsNotVisible();
});
