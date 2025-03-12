import { Page, Locator, expect } from "@playwright/test";

export default class BalancePage {
  private page: Page;
  private balanceInfo: Locator;
  private buttonInputAddressSubmit: Locator;
  private depositAmountField: Locator;
  private depositButton: Locator;
  private depositErrorMessage: Locator;
  private depositHistory: Locator;
  private selectedTokenInfo: Locator;
  private tokenBalance: Locator;

  private mintTokensButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.balanceInfo = this.page.getByTestId("TokenBalance__Div__balanceInfo");
    this.buttonInputAddressSubmit = this.page.getByTestId(
      "InputAddress__Button__submit"
    );
    this.depositAmountField = this.page.getByTestId(
      "DepositToken__Input__depositAmount"
    );
    this.depositButton = this.page.getByTestId("DepositToken__Button__deposit");
    this.depositErrorMessage = this.page.getByTestId(
      "DepositToken__Div__error"
    );
    this.depositHistory = this.page.getByTestId(
      "DepositHistory__Table__history"
    );
    this.mintTokensButton = this.page.getByTestId(
      "TokenBalance__Div__getMoreExampleTokensAction"
    );
    this.selectedTokenInfo = this.page.getByText("Selected token: ");
    this.tokenBalance = this.page.getByTestId(
      "TokenBalance__Div__balanceAmount"
    );
  }

  async clickOnDepositButton() {
    await this.depositButton.click();
  }

  async clickOnMintTokens() {
    await this.mintTokensButton.click();
  }

  async enterMaxAmoutnOfTokens() {
    await this.tokenBalance.waitFor({ state: "visible" });
    const balance = await this.tokenBalance.innerText();
    await this.depositAmountField.waitFor({ state: "visible" });
    await this.depositAmountField.fill(balance);
  }

  async fetchSelectedTokenAddress() {
    const tokenText = await this.selectedTokenInfo.textContent();

    if (!tokenText) {
      throw new Error("Selected token information is missing.");
    }

    const ethereumAddressPattern = /0x[a-fA-F0-9]{40}/;
    const extractedAddress =
      tokenText.match(ethereumAddressPattern)?.[0] || null;

    return extractedAddress ?? "";
  }

  async fetchTokenBalance() {
    const balanceText = await this.tokenBalance.textContent();

    if (!balanceText) {
      throw new Error("Token balance information is unavailable.");
    }

    return Number(balanceText);
  }

  async performTokenDeposit(amount: number) {
    if (amount <= 0) {
      throw new Error("Invalid deposit amount. Must be greater than zero.");
    }

    await this.depositAmountField.fill(amount.toString());
    await this.depositButton.click();
  }

  async requestTokenMinting() {
    await this.mintTokensButton.click();
  }

  async validateAddressBalanceIsShown() {
    await expect(this.balanceInfo).toBeVisible();
  }

  async validateDepositButtonIsNotVisible() {
    await expect(this.depositButton).not.toBeVisible();
  }

  async validateDepositButtonIsVisible() {
    await expect(this.depositButton).toBeVisible();
  }

  async validateDepositErrorIsShown() {
    await expect(this.depositErrorMessage).toBeVisible();
  }

  async validateSubmitButtonIsDisabled() {
    await expect(this.buttonInputAddressSubmit).toBeDisabled();
  }

  async validateTableDepositHistory() {
    // Ensure the table is visible before proceeding
    await this.depositHistory.waitFor({
      state: "visible",
    });

    // Count the number of rows in the table
    const totalRows = await this.depositHistory.locator("tr").count();

    // Verify that at least one entry exists in the table
    expect(totalRows).toBeGreaterThan(0);
  }

  async validateTokenBalance(expectedBalance: string) {
    await expect(this.tokenBalance).toBeVisible();

    let actualBalance = await this.tokenBalance.textContent();
    expect(actualBalance?.trim()).toEqual(expectedBalance);
  }
}
