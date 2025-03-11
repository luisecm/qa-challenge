import { type Page, type Locator, expect } from "@playwright/test";

export default class MetamaskPage {
  readonly page: Page;
  readonly buttonConfirm: Locator;
  readonly buttonConfirmSwitch: Locator;
  readonly buttonDismiss: Locator;
  readonly buttonGoBack: Locator;
  readonly buttonMenu: Locator;
  readonly permissionsMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buttonConfirm = this.page.locator("[data-testid='confirm-btn']");
    this.buttonConfirmSwitch = this.page.locator("button:has-text('Confirm')");
    this.buttonDismiss = this.page.locator(
      ".multichain-product-tour-menu__button"
    );
    this.buttonGoBack = this.page.locator("[aria-label='Back']");
    this.buttonMenu = this.page.getByTestId("account-options-menu-button");
    this.permissionsMenu = this.page.getByTestId("global-menu-connected-sites");
  }

  async clickOnBackButton() {
    await this.buttonGoBack.waitFor({ state: "visible" });
    await this.buttonGoBack.click();
  }

  async clickOnConfirmButton() {
    await this.buttonConfirm.waitFor({ state: "visible" });
    await this.buttonConfirm.click();
  }

  async clickOnGotItButton() {
    if (await this.buttonDismiss.isVisible()) {
      await this.buttonDismiss.click();
    }
  }

  async clickOnMenuButton() {
    await this.buttonMenu.waitFor({ state: "visible" });
    await this.buttonMenu.click();
  }

  async clickOnPermissionsMenu() {
    await this.permissionsMenu.waitFor({ state: "visible" });
    await this.permissionsMenu.click();
  }

  async confirmSwitchNetwork() {
    await this.buttonConfirmSwitch.waitFor({ state: "visible" });
    await this.buttonConfirmSwitch.click();
  }
}
