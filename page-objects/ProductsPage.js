import { expect } from "@playwright/test"
import { Navigation } from "./Navigation.js"
import { isDesktopViewport } from "../utils/isDesktopViewPorts.js"

export class ProductsPage{
    constructor(page){
        this.page = page
        this.userInput = page.locator('[data-cy="login-username-label"]')
        this.passwordInput = page.locator('[data-cy="login-password-label"]')
        this.loginButton = page.locator('[data-cy="login-button"]')
    }

    visit = async() =>{
        await this.page.goto("/")
    }

    addProductToBasket = async (index) => {
        //data-qa="product-button"
        //const addButtons = this.page.locator('[data-qa="product-button"]')
        const specificAddButton = this.addButtons.nth(index)
        await specificAddButton.waitFor()
        await expect(this.addButtons.nth(index)).toHaveText("Add to Basket")
        const navigation = new Navigation(this.page);
        //only in desktop port
        let basketCountBeforeAdding = 0
        if (isDesktopViewport(this.page)){
            basketCountBeforeAdding = await navigation.getBasketCount()

        }
        
        await specificAddButton.click()
        await expect(specificAddButton).toHaveText("Remove from Basket")
        //only in desktop port
        if (isDesktopViewport(this.page)){
            const basketCountAfterAdding = await navigation.getBasketCount()
        expect (basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
        }
    }

    movetoLogin = async () => {
        await this.userInput.waitFor()
        await this.userInput.fill(username)
        
        expect (productTittleAfterSorting).not.toEqual(productTittleBeforeSorting)
        // get order of products
        //expect that the list are different
        //await this.page.pause()

    }

}