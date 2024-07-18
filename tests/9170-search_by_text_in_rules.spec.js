import * as dotenv from "dotenv"
dotenv.config()
import {test} from "@playwright/test"
import { v4 as uuidv4 } from "uuid";
import { Navigation } from "../page-objects/Navigation.js"
import { RegisterPage } from "../page-objects/RegisterPage.js";
import { adminDetails, userDetails} from "../data/userDetails.js"
import { questionariesDetail } from "../data/questionairesDetails.js"
import { CreateQuestionaries } from "../page-objects/CreateQuestionaries.js";
import { SearchText } from "../page-objects/SearchText.js";

//test.describe.configure({ mode: 'serial' });

test('9170 - Search by Text in Rules node: Search Countries', async ({page}) =>{
    const registerPage = new RegisterPage(page)
    await registerPage.visit();
    const username = adminDetails.username
    const password = adminDetails.password
    const useruatInput = adminDetails.username
    const passwordInputuat = adminDetails.password
    await registerPage.signUpAsNewUser(username, password, useruatInput, passwordInputuat)

    const navigation = new Navigation(page)
    await navigation.goToR3Tenant()
    await navigation.goToRules()
    console.log(navigation)

    const searchText = new SearchText (page)
    await searchText.accesstoNode()

    await navigation.goToLogout()

});