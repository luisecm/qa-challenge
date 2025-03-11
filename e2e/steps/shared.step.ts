import { Given, When } from "@cucumber/cucumber";
import MainPage from "../pages/main.page";
import { BrowserContext, Page, test as baseTest } from "@playwright/test";
import { launch, MetaMaskWallet } from "@tenkeylabs/dappwright";
import dotenv from "dotenv";
dotenv.config();

let context: BrowserContext;
let metamask: MetaMaskWallet;
let page: Page;
let mainPage: MainPage;

Given(
  /^A user with metamask installed connected to (sepolia|Mainnet) network$/,
  async function (network) {
    const allowedNetworks = ["sepolia", "Mainnet"];
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
    const { wallet, browserContext } = await launch("chromium", {
      wallet: "metamask",
      version: "12.8.1",
      headless: false,
    });

    metamask = wallet as MetaMaskWallet;
    context = browserContext;
    page = context.pages()[0];

    await metamask.setup({
      seed: process.env.SEED_PHRASE,
    });

    // By default Ethereum Mainnet is selected
    if (network === "sepolia") {
      await metamask.switchNetwork("sepolia");
    }
  }
);

When(/^the user accesses the app page$/, async function () {
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
