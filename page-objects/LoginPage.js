export class LoginPage{
    constructor(page){
        this.page = page
        this.emailInputLocator = '[placeholder="email"]'; 
        this.passwordInputLocator = '[placeholder="password"]';
        this.loginButtonLocator = '[data-cy="login-button"]';
    }

    visit = async() =>{
        await this.page.goto("/")
    }

        //this.moveToSignupButton = page.locator("[data-qa='go-to-signup-button']")
    //     this.loginButton = page.locator('[data-cy="login-button"]')
    // }
    loginUser = async (email, password) => {
        const emailInput = await this.page.$(this.emailInputLocator);
        await emailInput.waitFor();
        await emailInput.fill(email);

        const passwordInput = await this.page.$(this.passwordInputLocator);
        await passwordInput.waitFor();
        await passwordInput.fill(password);

        const loginButton = await this.page.$(this.loginButtonLocator);
        await loginButton.waitFor();
        await loginButton.click();

        await this.page.waitForNavigation(); //
    
    //await this.page.pause()
    }
}