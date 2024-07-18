import { expect } from "@playwright/test"
import { sharedDimension, dimensionDetail } from "../data/sharedDimension.js"

export class CreateSharedDimension{
    constructor(page) {
        this.page = page
        this.sharedproprtab = page.locator('[data-cy="csp-tab"]')
        this.dimensionButton = page.getByRole('tab', { name: 'Dimensions' })
        this.createDimenButton = page.getByRole('button', { name: ' Create new Dimension' })
        this.techNameDim = page.locator('[data-test="property-technical-name"]')
        this.selecDifList2 = page.locator('row', { name: '  Select   ' })
        this.selecDifList = page.getByPlaceholder('Select', { exact: true }).nth(0)
        this.textContent= page.locator('.center-table')
        this.messageName = page.getByText('Property name must be unique.')
    
    }
     accessShrd = async (page) => {
        await this.page.waitForTimeout(3000)
        console.log("Shared Properties link found and clickable");  
        await this.sharedproprtab.click()
        console.log("Clicked on Shared Properties");
     }

    createDim = async (page) => {
        await this.page.waitForTimeout(3000)
        await this.dimensionButton.waitFor()
        console.log("Dimension button displayed")
        await this.createDimenButton.waitFor()
        await this.createDimenButton.click()
        console.log("Dimension button clicked")
        
    }
    filloutDimName = async (name)  =>{    
        await this.techNameDim.waitFor()
        await this.techNameDim.click()
        await this.techNameDim.fill(name)
    
    }
    removeNonVisibleCharacters(str) {
        return str.replace(/\s+/g, ' ').trim();
    }

    filloutDifList = async (page)  =>{    
        await this.selecDifList.waitFor()
        await this.selecDifList.click()
        const optionToSelect = await this.page.locator('text=BENEFITS').nth(1); //staging
        //const optionToSelect = await this.page.locator('text=BENEFITS');//uat
        await optionToSelect.click();
        const clickgreentick = await this.page.getByRole('button', { name: '' })
        await clickgreentick.click()
        await this.textContent.waitFor('.UiStickyNotification');
        const notificationTextContent = await this.page.locator('.UiStickyNotification').textContent();
        const cleanedReceivedString = this.removeNonVisibleCharacters(notificationTextContent);
        console.log("Expected substring:", "Successfully added item! Show in table");
        console.log("Received string:", notificationTextContent.trim());
        expect(cleanedReceivedString).toContain("Successfully added item! Show in table");
    }
    propertyNameExist = async (page)  =>{    
        await this.selecDifList.waitFor()
        await this.selecDifList.click()
        const optionToSelect = await this.page.locator('text=BENEFITS').nth(1);
        await optionToSelect.click();
        const clickgreentick = await this.page.getByRole('button', { name: '' })
        await clickgreentick.click()
        await this.messageName.waitFor('message');
        expect(this.messageName).toHaveText("Property name must be unique.");
        console.log("Property name must be unique.")
        //await this.page.pause()
    }
}