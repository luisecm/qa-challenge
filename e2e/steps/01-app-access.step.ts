import { When, Then } from "@cucumber/cucumber";
import MainPage from "../pages/main.page";
import { context, page, metamask } from "./shared.step";
import MetamaskPage from "../pages/metamask.page";

let metamaskPage: MetamaskPage;
let mainPage: MainPage;

When(/^the user accepts notifications$/, async function ({}) {
  // Find the MetaMask popup window
  const metamaskContext = this.context
    .pages()
    .find(() => page.url().includes("chrome-extension://"));

  if (!metamaskContext) {
    throw new Error("MetaMask extension window was not detected.");
  }
  await metamaskContext.bringToFront();
  metamaskPage = new MetamaskPage(metamaskContext);

  // Open MetaMask account options menu
  await metamaskPage.clickOnMenuButton();

  // Navigate to the permissions page
  await metamaskPage.clickOnPermissionsMenu();

  // Close any "Got it" modal if displayed
  await metamaskPage.clickOnGotItButton();

  // Return to the previous menu
  await metamaskPage.clickOnBackButton();

  // Confirm the connection
  await metamaskPage.clickOnConfirmButton();

  // Restore focus to the dApp
  const dAppTab = this.context
    .pages()
    .find(() => page.url().includes("localhost"));

  if (!dAppTab) {
    throw new Error("Failed to locate the dApp tab.");
  }

  await dAppTab.bringToFront();
});

When(/^the user clicks the switch network button$/, async function () {
  mainPage = new MainPage(page);
  await mainPage.clickOnSwitchNetwork();
});

When(/^the user confirms the switch network$/, async function () {
  mainPage = new MainPage(page);
  metamaskPage = new MetamaskPage(page);
  await metamaskPage.confirmSwitchNetwork();
  await mainPage.validateAlertIsVisible();
});

Then(/^the page shows the account address$/, async function () {});

Then(/^the page shows the input address field$/, async function () {});

Then(/^the page doesn't show a network error message$/, async function () {});

Then(/^the page shows a network error message$/, async function () {});

Then(/^the page shows the switch network button$/, async function () {
  mainPage = new MainPage(page);
  await mainPage.validateSwitchNetworkIsVisible();
});

Then(/^the page doesn't show the input address field$/, async function () {});
