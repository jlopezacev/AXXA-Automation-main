import { expect } from "@playwright/test"

export class SearchText{
    constructor(page) {
        this.page = page
        this.urlinitial = 'https://modelling-staging.axa-rev-preprod-mpl-int.merlot.eu-central-1.aws.openpaas.axa-cloud.com/t/partners-travel-r3/products/194334/releases?version=initial';
        this.urlrule ='https://modelling-staging.axa-rev-preprod-mpl-int.merlot.eu-central-1.aws.openpaas.axa-cloud.com/t/partners-travel-r3/products/194334/rules/489728?version=initial';
        this.nodepage = page.locator('div').filter({ hasText: /^BAGGAGE$/ }).nth(1)
        this.nodecover = page.getByRole('link', { name: 'Cover' })
        this.nodeselection = page.getByRole('link', { name: 'BAGGAGE', })
        this.nodeclick = page.getByText('Delay', { exact: true });
        this.cleantext = page.locator('textarea');    
        this.listtext = page.getByRole('option', { name: 'Faulty Item' }).first()
        this.initialversion =  page.getByRole
    }
     accesstoNode = async (page) => {
        await this.page.goto(this.urlinitial)
        await this.page.goto(this.urlrule)
        await this.nodeselection.waitFor()
        await this.nodeselection.click()
        console.log(this.nodepage)
        await this.nodeclick.waitFor()
        await this.nodeclick.click()
        await this.cleantext.fill('Fau')
        await this.listtext.click('Fau=Faulty Item')
        const faultyItemElement = await this.page.locator('div.textField.readOnly.matched:has-text("Faulty Item")');
        console.log("faultyItemElement:", faultyItemElement);
        const faultyItemText = await faultyItemElement.innerText();
        console.log("faultyItemText:", faultyItemText);
        expect(faultyItemText).toBe('Faulty Item');
        
     }

}