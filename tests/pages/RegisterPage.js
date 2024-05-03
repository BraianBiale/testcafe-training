import {Selector, t} from "testcafe"

class RegisterPage {
    constructor() {
        this.headerTitle = Selector("div > div > h1")
        this.nameFieldContainer = Selector("div > form > div:nth-of-type(1)")
        this.nameInput = Selector("form > div > input").withAttribute("aria-label", "Name")
        this.usernameFieldContainer = Selector("div > form > div:nth-of-type(2)")
        this.usernameInput = Selector("form > div > input").withAttribute("aria-label", "Username")
        this.emailFieldContainer = Selector("div > form > div:nth-of-type(3)")
        this.emailFieldErrorLabel = Selector("div > form > div:nth-of-type(3) > label:nth-of-type(3)")
        this.emailInput = Selector("form > div > input").withAttribute("aria-label", "Email")
        this.passwordFieldContainer = Selector("div > form > div:nth-of-type(4)")
        this.passwordInput = Selector("form > div > input").withAttribute("aria-label", "Password")
        this.confirmPasswordFieldContainer = Selector("div > form > div:nth-of-type(5)")
        this.confirmPasswordInput = Selector("form > div > input").withAttribute("aria-label", "Confirm Password")
        this.nameInputLabel = Selector("form > div:nth-of-type(1) > label:nth-of-type(1)")
        this.usernameInputLabel = Selector("form > div:nth-of-type(2) > label:nth-of-type(1)")
        this.emailInputLabel = Selector("form > div:nth-of-type(3) > label:nth-of-type(1)")
        this.passwordInputLabel = Selector("form > div:nth-of-type(4) > label:nth-of-type(1)")
        this.confirmPasswordInputLabel = Selector("form > div:nth-of-type(5) > label:nth-of-type(1)")
        this.registerBtn = Selector("form > button").withText("Register")
        this.loginBtn = Selector("button[mode='outlined']").withText("Login")
    }

    async fillRegisterForm(name, username, email, password, confirmPassword) {
        const date = new Date().getTime()
        await t.typeText(this.nameInput, name)
            .typeText(this.usernameInput, username + date)
            .typeText(this.emailInput, date + email)
            .typeText(this.passwordInput, password)
            .typeText(this.confirmPasswordInput, confirmPassword)
    }

    async submitForm() {
        await t.click(this.registerBtn)
    }
}

export default new RegisterPage();