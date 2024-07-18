export class RegisterPage{
    constructor(page){
        this.page = page
        this.usernameInput = page.locator('[data-cy="login-username-textfield"]')
        this.passwordInput = page.locator('[data-cy="login-password-textfield"]')
        this.loginButton = page.locator('[data-cy="login-button"]')
        this.useruatInput = page.getByLabel('Your email')
        this.loginButtonuat =  page.getByRole('button', { name: 'LOG IN' })
        //this.passwordInputuat = page.locator('[div class="ping-input-container password-container"]')
        this.passwordScreenuat = page.getByText('Current Password')
        this.passwordInputuat = page.getByLabel('Password')

        //this.mainMenu = page.getByRole('link', { name:'Shared properties' })

    }

    visit = async() =>{
        await this.page.goto("/")
    }

    signUpAsNewUser = async (username, password, ) => {
        await this.useruatInput.waitFor()
        await this.useruatInput.fill(useruatInput)
        await this.loginButtonuat.waitFor()
        await this.loginButtonuat.click()
        await this.passwordScreenuat.waitFor()
        await this.passwordInputuat.waitFor()
        await this.passwordInputuat.fill(passwordInputuat)
        await this.loginButtonuat.waitFor()
        await this.loginButtonuat.click()
          //*staging logging*//
        //await this.usernameInput.waitFor()
        //await this.usernameInput.fill(username)
        //await this.passwordInput.waitFor()
        //await this.passwordInput.fill(password)
        //await this.loginButton.waitFor()
        //await this.loginButton.click()
    }
}
