import { Page, Locator } from "@playwright/test";

export default class BalancePage {
  private page: Page;
  private selectedTokenInfo: Locator;
  private balanceInfo: Locator;
  private depositHistory: Locator;
  private tokenBalance: Locator;
  private depositErrorMessage: Locator;
  private depositButton: Locator;
  private depositAmountField: Locator;
  private mintTokensButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.balanceInfo = this.page.getByTestId("TokenBalance__Div__balanceInfo");
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
}
