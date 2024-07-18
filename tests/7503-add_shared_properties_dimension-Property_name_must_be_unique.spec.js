import * as dotenv from "dotenv"
dotenv.config()
import {test} from "@playwright/test"
import { Navigation } from "../page-objects/Navigation.js"
import { RegisterPage } from "../page-objects/RegisterPage.js";
import { adminDetails, userDetails} from "../data/userDetails.js"
import { CreateSharedDimension } from "../page-objects/CreateSharedDimension.js";
import { dimensionDetail } from "../data/sharedDimension.js";

test('7503 - Add Shared Property Dimension: 2 Property name must be unique', async ({page}) =>{
    const registerPage = new RegisterPage(page)
    await registerPage.visit();
    const username = adminDetails.username
    const password = adminDetails.password
    await registerPage.signUpAsNewUser(username, password)

    const navigation = new Navigation(page)
    await navigation.goToSandox()

    const createSharedDimension = new CreateSharedDimension(page)
    await createSharedDimension.accessShrd(page)
    const name = dimensionDetail.name
    await createSharedDimension.createDim()
    await createSharedDimension.propertyNameExist(name)
});

