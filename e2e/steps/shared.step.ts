import { Given, When } from "@cucumber/cucumber";
import MainPage from "../pages/main.page";
import { BrowserContext, Page } from "@playwright/test";
import { bootstrap, Dappwright } from "@tenkeylabs/dappwright";
import dotenv from "dotenv";
dotenv.config();

let context: BrowserContext;
let metamask: Dappwright;
let mainPage: MainPage;
let page: Page;

Given(
  "A user with metamask installed connected to {string} network",
  { timeout: 30000 },
  async (network) => {
    const [Dappwright, pageCreated, browserContext] = await bootstrap(
      "chrome",
      {
        seed: process.env.SEED_PHRASE,
        wallet: "metamask",
        version: "12.8.1",
        headless: false,
      }
    );

    metamask = Dappwright;
    context = browserContext;
    page = context.pages()[0];

    if (!process.env.SEED_PHRASE) {
      throw new Error("SEED_PHRASE is missing in .env file");
    }

    if (network === "sepolia") {
      await metamask.switchNetwork("sepolia");
    }
  }
);

When(/^the user accesses the app page$/, async function () {
  await page.goto("/");
});

When(
  "the user enters the address {string} in the input address field",
  async function (address: string) {
    mainPage = new MainPage(page);
    await mainPage.inputAddressValue.clear();
    await mainPage.inputAddressValue.fill(address);
  }
);

When(/^the user clicks the Submit button$/, async function () {
  mainPage = new MainPage(page);
  await mainPage.buttonSubmit.click();
});

When(/^the user clicks the example token link$/, async function () {
  mainPage = new MainPage(page);
  await mainPage.textExampleToken.click();
});

export { page, metamask, context };
