import * as dotenv from "dotenv"
import { expect } from "@playwright/test"
dotenv.config()
import {test} from "@playwright/test"
import { Navigation } from "../page-objects/Navigation.js"
import { RegisterPage } from "../page-objects/RegisterPage.js";
import { adminDetails, userDetails} from "../data/userDetails.js"

test('0001 - login-select-tenant-logout', async ({page}) =>{
    const registerPage = new RegisterPage(page)
    await registerPage.visit();
    const username = adminDetails.username
    const password = adminDetails.password
    await registerPage.signUpAsNewUser(username, password)

    const navigation = new Navigation(page)
    await navigation.goToSandox()

    const logoutSuccessful = await navigation.goToLogout();
    expect(logoutSuccessful).toBeTruthy();
});