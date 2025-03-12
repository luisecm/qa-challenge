import { Then } from "@cucumber/cucumber";
import BalancePage from "../pages/balance.page";
import { page } from "./shared.step";

let balancePage: BalancePage;

Then(
  /^the page shows the address balance for the selected token$/,
  async function () {
    balancePage = new BalancePage(page);
    await balancePage.validateAddressBalanceIsShown();
  }
);

Then(
  /^the page shows the table of the deposit history for the selected token$/,
  async function () {
    balancePage = new BalancePage(page);
    await balancePage.validateTableDepositHistory();
  }
);

Then(/^the submit button is disabled$/, async function () {
  balancePage = new BalancePage(page);
  await balancePage.validateSubmitButtonIsDisabled();
});
