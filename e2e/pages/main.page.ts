import { type Page, type Locator, expect } from "@playwright/test";

export default class MainPage {
  readonly page: Page;
  readonly connectedAddress: Locator;
  readonly alertConnectorError: Locator;
  readonly buttonConnect: Locator;
  readonly inputAddress: Locator;
  readonly inputFormAddress: Locator;
  readonly inputAddressValue: Locator;
  readonly buttonSubmit: Locator;
  readonly textExampleToken: Locator;
  readonly textEnterAddress: Locator;

  constructor(page: Page) {
    this.page = page;
    this.alertConnectorError = this.page.getByTestId(
      "MetaMaskConnector__Div__error"
    );
    this.buttonConnect = this.page.getByTestId(
      "MetaMaskConnector__Button__connect"
    );
    this.buttonSubmit = this.page.getByTestId(
      "inputAddressValue__Button__submit"
    );
    this.connectedAddress = this.page.getByTestId(
      "MetaMaskConnector__Div__connect"
    );
    this.inputAddress = this.page.getByTestId(
      "InputAddress__Input__addressValue"
    );
    this.inputAddressValue = this.page.getByTestId(
      "inputAddressValue__Input__addressValue"
    );
    this.inputFormAddress = this.page.getByTestId(
      "inputAddressValue__Form__address"
    );
    this.textEnterAddress = this.page.getByText(
      "Enter the address of the ERC20 token"
    );
    this.textExampleToken = this.page.getByTestId(
      "inputAddressValue__Span__exampleTokenLink"
    );
  }

  async clickOnSwitchNetwork() {
    await this.buttonConnect.click();
  }

  async extractWalletAddress() {
    const addressText = await this.connectedAddress.textContent();

    if (!addressText) {
      throw new Error("Connected wallet address is not available.");
    }

    const addressPattern = /0x[a-fA-F0-9]{40}/;
    const extractedAddress = addressText.match(addressPattern)?.[0] || "";

    if (!extractedAddress) {
      console.warn("No valid Ethereum address found in the provided text.");
    }

    return extractedAddress;
  }

  async getConnectedAddress() {
    const displayedAddress = (await this.connectedAddress.innerText())
      .replace("Connected as: ", "")
      .trim();
    return displayedAddress as string;
  }

  async getWalletAddress() {
    const expectedWalletAddress = await this.page.evaluate(async () => {
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts[0];
    });
    return expectedWalletAddress as string;
  }

  async fetchConnectButtonLabel() {
    const buttonLabel = await this.buttonConnect.textContent();
    return buttonLabel;
  }

  async reloadPage() {
    await this.page.reload();
  }

  async validateAlertIsVisible() {
    await this.alertConnectorError.waitFor({ state: "visible" });
  }

  async validateFormIsLoaded() {
    const elementsToCheck = [
      this.inputFormAddress,
      this.inputAddressValue,
      this.buttonSubmit,
      this.textEnterAddress,
      this.textExampleToken,
    ];

    for (const element of elementsToCheck) {
      await expect.soft(element).toBeVisible();
    }

    await expect.soft(this.buttonSubmit).toBeDisabled();
  }

  async validateInputAddressFieldIsNotShown() {
    await expect(this.inputAddressValue).not.toBeVisible();
  }

  async validateInputAddressIsVisible() {
    await this.inputAddress.waitFor({ state: "visible" });
  }

  async validateNetworkErrorIsNotShown() {
    await expect(this.alertConnectorError).not.toBeVisible();
  }

  async validateNetworkErrorIsShown() {
    await expect(this.alertConnectorError).toBeVisible();
  }

  async validateSwitchNetworkIsVisible() {
    await expect(this.buttonConnect).toBeVisible();
    await expect(this.buttonConnect).toHaveText("Connect Metamask to Sepolia");
  }

  async validateWalletIsConnected({
    metamaskAddress,
    appAddress,
  }: {
    metamaskAddress: string;
    appAddress: string;
  }) {
    expect
      .soft(appAddress.toLowerCase())
      .toEqual(metamaskAddress.toLowerCase());
  }

  async visitPage() {
    await this.page.goto("/");
  }
}
