import { expect } from "@playwright/test"
export class PaymentPage{
    constructor(page) {
        this.page = page
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]')
                                .locator('[data-qa="discount-code"]')
        this.discountInput = page.getByPlaceholder('Discount code')
        this.activateDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.totalValue =  page.locator('[data-qa="total-value"]')
        this.discountedValue =  page.locator('[data-qa="total-with-discount-value"]')
        this.discountedActiveMessage =  page.locator('[data-qa="discount-active-message"]')
        this.creditCardOwnerInput = page.locator('[data-qa="credit-card-owner"]')  
        this.creditCardNumberInput = page.locator('[data-qa="credit-card-number"]')
        this.creditCardValidInput = page.locator('[data-qa="valid-until"]')
        this.creditCardCvcInput = page.locator('[data-qa="credit-card-cvc"]')
        this.payButton = page.locator ('[data-qa="pay-button"]')
    }

    activateDiscount = async () => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        await this.discountInput.waitFor()
        //Option 1 for laggy inputs using .fill() with await expect
        await this.discountInput.fill(code)
        await expect(this.discountInput).toHaveValue(code)
        

        /*option 2 for laggy inputs: slow typing
        await this.discountInput.focus()
        await this.page.keyboard.type (code, {delay: 1000})//tipea un digito por segundo
        expect(await this.discountInput.inputValue()).toBe(code)
        await this.page.pause()*/

        expect(await this.discountedValue.isVisible()).toBe(false)
        expect(await this.discountedActiveMessage.isVisible()).toBe(false)

        await this.activateDiscountButton.waitFor()
        await this.activateDiscountButton.click()
        //check discount active message
        await this.discountedActiveMessage.waitFor()
        // check discounted price total
        await this.discountedValue.waitFor()
       

        //convert to stringnumber, deleting$
        const discountValueText = await this.discountedValue.innerText()
        const discountedValueOnlyStringNumber = discountValueText.replace("$", "")
        const discountedValueNumber = parseInt(discountedValueOnlyStringNumber, 10)
        
        //convert to stringnumber, deleting $
        await this.totalValue.waitFor()
        const totalValueText = await this.totalValue.innerText()
        const totalValueOnlyStringNumber = totalValueText.replace("$", "")
        const totalValueNumber = parseInt(totalValueOnlyStringNumber, 10)
         //check that the discounted price total is smaller than normal
        expect(discountedValueNumber).toBeLessThan(totalValueNumber)
    }

    fillPaymentsDetails = async (paymentDetails) => {
        await this.creditCardOwnerInput.waitFor()
        await this.creditCardOwnerInput.fill(paymentDetails.owner)
        await this.creditCardNumberInput.waitFor()
        await this.creditCardNumberInput.fill(paymentDetails.number)
        await this.creditCardValidInput.waitFor()
        await this.creditCardValidInput.fill(paymentDetails.validUntil)
        await this.creditCardCvcInput.waitFor()
        await this.creditCardCvcInput.fill(paymentDetails.cvc)
    }

    completePayment = async () =>{
        await this.payButton.waitFor()
        await this.payButton.click()
        await this.page.waitForURL(/\/thank-you/, {timeout: 3000} )
        await this.page.pause()
    }
}