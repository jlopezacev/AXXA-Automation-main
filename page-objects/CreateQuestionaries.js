import { expect } from "@playwright/test"
import { questionaries } from "../data/questionairesDetails.js"

export class CreateQuestionaries{
    constructor(page) {
        this.page = page
        this.questionariestab = page.locator('[data-cy="questionnaires-tab"]')
        this.dimensionButton = page.getByRole('tab', { name: 'Dimensions' })
        this.createQuestionButton = page.getByRole('button', { name: 'Create new questionnaire ' })
        this.techNameQuest = page.locator('[data-cy="product_name"]')
        this.selectAuthor =  page.locator('[data-cy="product_author"]')
        //this.selecTeamAtr = page.locator('[id="__BVID__925"]').selectOption('Qa-Automation')
        this.diagnostictr =  page.getByRole('dialog').getByText('Diagnostic Tree');
        this.textContent= page.locator('.center-table')
        this.messageName = page.getByText('Property name must be unique.')
    
    }
     accessQuestion = async (page) => {
        await this.page.waitForTimeout(2000)
        console.log("Questionaries link found and clickable");  
        await this.questionariestab.click()
        console.log("Clicked on Questionaries");
     }

    createQuestion = async (page) => {
        await this.page.waitForTimeout(3000)
        await this.createQuestionButton.waitFor()
        console.log("Question button displayed")
        await this.createQuestionButton.waitFor()
        await this.createQuestionButton.click()
        console.log("Question button clicked")
        
    }
    filloutQuestName = async (name)  =>{    
        await this.techNameQuest.waitFor()
        await this.techNameQuest.click()
        await this.techNameQuest.fill(name)
    }

    filloutAuthortName = async ()  =>{    
        await this.selectAuthor.waitFor()
        await this.selectAuthor.click()
        //await this.selectAuthor.fill(name)
    }

    selecTeamAtrib = async ()  =>{    
        //await this.selecTeamAtr.waitFor()
        await this.page.pause()
        //await this.selecTeamAtr.click()
       //await page.getByRole('dialog').getByText('Diagnostic Tree').click();
        await this.diagnostictr.waitFor()
        await this.diagnostictr.click()
    }
        


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
        await this.page.pause()
    }
}