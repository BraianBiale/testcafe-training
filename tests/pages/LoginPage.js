import {Selector, t} from "testcafe"

class LoginPage {
    constructor() {
        this.usernameInput = Selector("form > div > input").withAttribute("aria-label", "Username")
        this.passwordInput = Selector("form > div > input").withAttribute("aria-label", "Password")
        this.loginBtn = Selector("form > button").withText("Login")
        this.loginTitleContainer = Selector("div > h1").withText("Enter your email or @username")
    }

    async fillLoginForm(username, password) {
        await t.typeText(this.usernameInput, username)
            .typeText(this.passwordInput, password)
    }
}

export default new LoginPage();