import { Given, When } from "@cucumber/cucumber";
import MainPage from "../pages/main.page";
import {
  BrowserContext,
  Page,
  test as baseTest,
  expect,
} from "@playwright/test";
import { bootstrap, MetaMaskWallet } from "@tenkeylabs/dappwright";
import dotenv from "dotenv";
dotenv.config();

let context: BrowserContext;
let metamask: MetaMaskWallet;
let mainPage: MainPage;
let page: Page;

Given(
  /^A user with metamask installed connected to (sepolia|mainnet) network$/,
  { timeout: 5000 * 3 },
  async function (network) {
    const allowedNetworks = ["sepolia", "mainnet"];
    if (!allowedNetworks.includes(network)) {
      throw new Error(
        `Invalid network: ${network}. Allowed networks: ${allowedNetworks.join(
          ", "
        )}`
      );
    }
    if (!process.env.SEED_PHRASE) {
      throw new Error("SEED_PHRASE is missing in .env.local");
    }

    // Start MetaMask and Launch Browser
    const [wallet, _, context] = await bootstrap("", {
      wallet: "metamask",
      version: MetaMaskWallet.recommendedVersion,
      seed: process.env.SEED_PHRASE,
      headless: false,
      showTestNets: true,
    });

    page = context.pages()[0];

    // By default Ethereum Mainnet is selected
    if (network === "sepolia") {
      await wallet.switchNetwork("Sepolia");
      const selectedNetwork = wallet.page
        .getByTestId("network-display")
        .getByText("Sepolia");
      expect(selectedNetwork).toBeVisible();
    }
  }
);

When(/^the user accesses the app page$/, async function (page: Page) {
  await page.goto("/");
});

When(
  /^the user enters the address {string} in the input address field$/,
  async function (page: Page, address: string) {
    mainPage = new MainPage(page);
    await mainPage.inputAddressValue.clear();
    await mainPage.inputAddressValue.fill(address);
  }
);

When(/^the user clicks the Submit button$/, async function (page: Page) {
  mainPage = new MainPage(page);
  await mainPage.buttonSubmit.click();
});

When(/^the user clicks the example token link$/, async function (page: Page) {
  mainPage = new MainPage(page);
  await mainPage.textExampleToken.click();
});

export { page, metamask, context };
