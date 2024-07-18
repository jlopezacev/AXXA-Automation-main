import * as dotenv from "dotenv"
dotenv.config()
import {test} from "@playwright/test"
import { v4 as uuidv4 } from "uuid";
import { Navigation } from "../page-objects/Navigation.js"
import { RegisterPage } from "../page-objects/RegisterPage.js";
import { adminDetails, userDetails} from "../data/userDetails.js"
import { questionariesDetail } from "../data/questionairesDetails.js"
import { CreateQuestionaries } from "../page-objects/CreateQuestionaries.js";

//test.describe.configure({ mode: 'serial' });

test('7540 - Create new dimmension: Create in Questionarie', async ({page}) =>{
    const registerPage = new RegisterPage(page)
    await registerPage.visit();
    const username = adminDetails.username
    const password = adminDetails.password
    const useruatInput = adminDetails.username
    const passwordInputuat = adminDetails.password
    await registerPage.signUpAsNewUser(username, password, useruatInput, passwordInputuat)

    const navigation = new Navigation(page)
    await navigation.goToSandox()
    console.log(navigation)

    const createQuestionaries = new CreateQuestionaries(page)
    await createQuestionaries.accessQuestion(page)
    
    const name = questionariesDetail.product_name
    await createQuestionaries.createQuestion()
    await createQuestionaries.filloutQuestName(name)
    console.log(createQuestionaries)

    const author = questionariesDetail.product_author
    await createQuestionaries.filloutAuthortName()
    await createQuestionaries.filloutAuthortName(author)

    const teamatrib = questionariesDetail.custom_select
    await createQuestionaries.filloutAuthortName()
    await createQuestionaries.selecTeamAtrib(teamatrib)

    // await createSharedDimension.filloutDifList()
});