import { expect } from "@playwright/test"

export class Navigation{
    constructor(page){
        this.page = page
        this.downloadmenu = page.locator('[id="__BVID__50__BV_toggle_"]')
        this.downaloadexcel = page.getByRole('menuitem', { name: ' Download as Excel' })
        this.sandboxLink = page.locator('[id="__BVID__16"]')// tenant for stagging
        this.sortDropdown = page.locator('[class="select-tenant py-0 custom-select"]')
        this.mainPage = page.getByRole('link', { name: 'Shared properties' })
        this.profilemenu = page.getByRole('button', { name: 'juan.lopez.external@axa.com' });
        this.logout = page.getByText('Log out');
        this.selectProduct = page.getByRole('link', { name: 'Innoplus 2021', exact: true })
        this.overviewMenu =  page.getByRole('link', { name: 'Overview' })
        this.ruleMenu = page.getByRole('link', { name: ' Rules' })
        this.ruleSelector = page.getByRole('link', { name: 'BAGGAGE' })
    }

    goToSandox = async () =>{
        await this.mainPage.waitFor()
        console.log(this.mainPage)
        await this.sortDropdown.waitFor()
        await this.sortDropdown.click();
        await this.sandboxLink.waitFor()
        await this.sandboxLink.click()
        console.log(this.sandboxLink)
        await this.page.locator('[id="__BVID__16"]').selectOption('qa-automation'); // tenant_id stagging
    }

    goToR3Tenant = async () =>{
        await this.mainPage.waitFor()
        console.log(this.mainPage)
        await this.sortDropdown.waitFor()
        await this.sortDropdown.click();
        await this.sandboxLink.waitFor()
        await this.sandboxLink.click()
        console.log(this.sandboxLink)
        await this.page.locator('[id="__BVID__19"]').selectOption('partners-travel-r3');
    }

    goToLogout = async () =>{
        await this.page.waitForTimeout(1500);
        await this.profilemenu.waitFor();
        await this.profilemenu.click();
        await this.logout.click();
        console.log('Logout object:', this.logout);

        if (this.logout) {
            const selector = this.logout._selector;
            
            if (selector) {
                console.log('Selector:', selector);
    
                if (selector.includes('Log out')){
                    return true;
                } else {
                    console.error('Text "Log out" not found in selector');
                    return false;
                }

            } else {
                console.error('_selector property is missing');
                return false;
            }
        } else {
            console.error('Logout failed');
            return false;
            }        
        }    
        
    gotoDownload = async () => {
        await this.mainPage.waitFor()
        console.log(this.mainPage)
        await this.sortDropdown.waitFor()
        await this.sortDropdown.click();
        await this.sandboxLink.waitFor()
        await this.sandboxLink.click()
        console.log(this.sandboxLink)
        await this.page.locator('[id="__BVID__19"]').selectOption('qa-automation'); // tenant_id stagging
        await this.downloadmenu.waitFor()
        await this.downloadmenu.click()
        await this.downaloadexcel.waitFor()
        await this.downaloadexcel.click()
        await this.page.waitForTimeout(1500);
        await this.profilemenu.waitFor();
        await this.profilemenu.click();
        await this.logout.click();
    }

    goToRules = async () =>{
        await this.selectProduct.waitFor()
        console.log(this.selectProduct)
        await this.selectProduct.click();
        await this.page.waitForTimeout(1500);
        await this.overviewMenu.waitFor()
        await this.ruleMenu.waitFor()
        await this.ruleMenu.click()
        await this.page.waitForTimeout(1500);
    }

}
