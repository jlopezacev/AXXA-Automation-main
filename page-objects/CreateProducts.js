import { expect } from "@playwright/test"
import { productsDetail} from "../data/productsDetail.js"

export class CreateProducts{
    constructor(page) {
        this.page = page
        this.productstab = page.locator('[data-cy="products-tab"]')
        this.dimensionButton = page.getByRole('tab', { name: 'Dimensions' })
        this.createProductButton = page.getByRole('button', { name: 'Create new product ' })
        this.productName = page.locator('[data-cy="product_name"]')
        this.selectAuthor =  page.locator('[data-cy="product_author"]')
        //this.selecTeamAtr = page.locator('[id="__BVID__925"]').selectOption('Qa-Automation')
        this.insuranceType =  page.locator('[id="__BVID__762"]').selectOption('policy');
        this.confirmCreate =  page.locator('[data-cy="blank-product"]')
        this.textContent= page.locator('.center-table')
        this.checkprodName = page.getByRole('link', { name: 'TEST_AUTOMATION_CREATE_NEW_PRODUCTIM' })
        this.backhome = page.getByRole('banner').getByRole('link')
    
    }
     accessProduct = async (page) => {
        await this.page.waitForTimeout(2000)
        console.log("IM link found and clickable");  
        await this.productstab.click()
        console.log("Clicked on Product");
     }

    createButton = async (page) => {
        await this.page.waitForTimeout(3000)
        await this.createProductButton.waitFor()
        console.log("Button displayed")
        await this.createProductButton.waitFor()
        await this.createProductButton.click()
        console.log("Create button clicked")
        
    }
    filloutProductName = async (name)  =>{    
        await this.productName.waitFor()
        await this.productName.click()
        await this.productName.fill(name)
    }

    filloutAuthortName = async ()  =>{    
        await this.selectAuthor.waitFor()
        await this.selectAuthor.click()
        //await this.selectAuthor.fill(name)
    }

    filloutInsuranceType = async ()  =>{    
        console.log(this.insuranceType)
    }

    confirCreation = async ()  =>{    
        console.log(this.confirmCreate)
        await this.confirmCreate.waitFor()
        await this.confirmCreate.click()
    }

    checkprodCreation = async ()  =>{   
        await this.page.pause() 
        await this.backhome.waitFor()
        await this.backhome.click()
        await this.checkprodName.waitFor()
        console.log(this.checkprodName)
    }


    selecTeamAtrib = async ()  =>{    
        //await this.selecTeamAtr.waitFor()
        //await this.selecTeamAtr.click()
       //await page.getByRole('dialog').getByText('Diagnostic Tree').click();
        await this.diagnostictr.waitFor()
        await this.diagnostictr.click()
    }
        
    // await page.getByRole('banner').getByRole('link').click();
    // await page.getByRole('link', { name: 'TEST_AUTOMATION_CREATE_NEW_PRODUCTIM' }).click();
  

    filloutDifList = async (page)  =>{    
        await this.selecDifList.waitFor()
        await this.selecDifList.click()
        //const optionToSelect = await this.page.locator('text=BENEFITS').nth(1); //staging
        const optionToSelect = await this.page.locator('text=BENEFITS');//uat
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
    }
}