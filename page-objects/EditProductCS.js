import { expect } from "@playwright/test"
import { sharedDimension, dimensionDetail } from "../data/sharedDimension.js"

export class EditProductFromSharedDimension{
    constructor(page) {
        this.page = page
        this.SelectProductFromCs = page.getByText('TEST_AUTOMATION_CREATE_NEW_DIMENSION1')
        this.EditProductFromCs = page.getByRole('button', { name: '' }).first()
        this.textContent= page.locator('.center-table')        
    }

    removeNonVisibleCharacters(str) {
        return str.replace(/\s+/g, ' ').trim();
    }

    selectproductcs = async (page) => {
        await this.SelectProductFromCs.waitFor()
        await this.SelectProductFromCs.click()
        console.log("Clicked on the product");
        await this.EditProductFromCs.waitFor()
        await this.EditProductFromCs.click()
        await page.locator('[data-test="property-technical-name"]').click();
        await page.locator('[data-test="property-technical-name"]').press('ArrowRight');
        await page.locator('[data-test="property-technical-name"]').fill('newnamedimension_3');
        await page.getByRole('button', { name: '' }).click();
        const notificationTextContent = await this.page.locator('.UiStickyNotification').textContent();
        const cleanedReceivedString = this.removeNonVisibleCharacters(notificationTextContent);
        console.log("Expected substring:", "Successfully updated");
        console.log("Received string:", notificationTextContent.trim());
        expect(cleanedReceivedString).toContain("Successfully updated NEWNAMEDIMENSION_3 Show in table");

     }
}