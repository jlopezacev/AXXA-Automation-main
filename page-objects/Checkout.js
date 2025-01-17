import { expect } from "@playwright/test"

export class Checkout{
    constructor(page){
    this.page = page

    this.basketCards = page.locator('[data-qa="basket-card"]')
    this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
    this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]')
    this.continueToCheckoutButton = page.locator("[data-qa='continue-to-checkout']")
}

    removeCheapestProduct = async () =>{
        await this.basketCards.first().waitFor()
        const itemBeforeRemoval = await this.basketCards.count()
        await this.basketItemPrice.first().waitFor()
        const allPriceTexts = await this.basketItemPrice.allInnerTexts()
        //[ '499$', '599$', '320$' ]
        const justNumbers = allPriceTexts.map((element) => {
            const withoutDollarSign = element.replace("$", "")
            return parseInt(withoutDollarSign, 10)
            console.warn({element})
        })
        console.warn({allPriceTexts})
        console.warn({...justNumbers})
        //**SPREAD VALUES****/
        // const listone =[61,62]
        // const listtwo =[63,64]
        // [...listone, ...listwo]
        // [61,62,63,54]
        const smallestPrice= Math.min(...justNumbers)
        const smallestPriceIdx = justNumbers.indexOf(smallestPrice)
        const specificRemoveButton = this.basketItemRemoveButton.nth(smallestPriceIdx)
        await specificRemoveButton.waitFor()
        await specificRemoveButton.click()
        await expect(this.basketCards).toHaveCount(itemBeforeRemoval -1)
        //await this.basketItemRemove.nth(smallestPriceIdx).waitFor()
        //await this.basketItemRemove.nth(smallestPriceIdx).click()
        //await this.page.pause()
    }
    continueToCheckout = async () =>{
        await this.continueToCheckoutButton.waitFor()
        await this.continueToCheckoutButton.click()
        await this.page.waitForURL(/\/login/, {timeout: 3000}) //regular expresion for url
        //await this.page.pause()
    }
}