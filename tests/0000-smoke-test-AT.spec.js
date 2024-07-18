// @ts-nocheck
import * as dotenv from "dotenv"
dotenv.config()
import {test} from "@playwright/test"
import { Navigation } from "../page-objects/Navigation.js"
import { expect } from "@playwright/test"
import { RegisterPage } from "../page-objects/RegisterPage.js";
// @ts-ignore
import { adminDetails, userDetails} from "../data/userDetails.js";
import { CreateProducts } from "../page-objects/CreateProducts.js"
import { productsDetail } from "../data/productsDetail.js"


test.describe.serial('Authoring Tool Smoke Tests', () => {
  let registerPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.visit();
    const username = adminDetails.username;
    const password = adminDetails.password;
    await registerPage.signUpAsNewUser(username, password);
  });

test.skip('1: homepage has title and link to Role page', async ({ page }) => {
  await expect(page).toHaveTitle(/AXA Authoring Tool/);
  const getStarted = page.getByRole('link', { name: 'Insurance models' });
  await expect(getStarted).toHaveAttribute('href', '/t/sandbox/products');
  await getStarted.click();

  await expect(page).toHaveURL(/.*sandbox*/);


});

test.skip('2: Check Search and Tool Bar', async ({ page }) => {
  const getStarted = page.getByRole('link', { name: 'Insurance models' });
  await expect(getStarted).toHaveAttribute('href', '/t/sandbox/products');
  const getToolbar = page.locator('[class="search-input form-control"]')
  console.log (getToolbar.toString());

  expect(await getToolbar.toString()).toMatch(/search/);
  await getToolbar.click();

});

test.skip('3: Choice Tenant', async ({ page }) => {
  const navigation = new Navigation(page)
  await navigation.goToSandox()
  console.log(navigation.goToSandox)

  expect(navigation).toBeTruthy();

});

test('4: Create Product in IM', async ({ page }) => {
  const navigation = new Navigation(page)
  await navigation.goToSandox()
  console.log(navigation.goToSandox)

  const createProducts = new CreateProducts(page)
  await createProducts.accessProduct(page)
          
  const name = productsDetail.product_name
  await createProducts.createButton()
  await createProducts.filloutProductName(name)
  console.log(createProducts)

  const author = productsDetail.product_author
  await createProducts.filloutAuthortName()
  await createProducts.filloutAuthortName(author)

  const insurance = productsDetail.insurance_type
  await createProducts.filloutInsuranceType()

  await createProducts.confirCreation()
  
  const checkprodName = productsDetail.product_name
  await createProducts.checkprodCreation()
  expect(checkprodName).toContain("TEST_AUTOMATION_CREATE_NEW_PRODUCTIM")



  //(expect(navigation).toBeTruthy();

});

});