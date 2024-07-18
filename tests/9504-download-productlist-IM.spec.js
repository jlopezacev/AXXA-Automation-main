import * as dotenv from "dotenv"
dotenv.config()
import {test} from "@playwright/test"
import { Navigation } from "../page-objects/Navigation.js"
import { RegisterPage } from "../page-objects/RegisterPage.js";
import { adminDetails, userDetails} from "../data/userDetails.js"

test('9504 - download-productlist-from-Insurance-Model', async ({page}) =>{
    const registerPage = new RegisterPage(page)
    await registerPage.visit();
    const username = adminDetails.username
    const password = adminDetails.password
    await registerPage.signUpAsNewUser(username, password)

    const navigation = new Navigation(page)
    await navigation.gotoDownload()
});