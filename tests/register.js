import registerPage from "./pages/RegisterPage";
import homePage from "./pages/HomePage";

const registerData = require("./data/registerData.json");
const data = require("./data/data.json");

fixture("Register fixture").page(`${data.baseUrl}/register`)

test("when user enters in the signup page given - then should see the different inputs with their styling", async t => {
    await t.expect(registerPage.headerTitle.textContent).eql("Create your account")
        .expect(registerPage.nameInputLabel.textContent).eql("Name")
        .expect(registerPage.usernameInputLabel.textContent).eql("Username")
        .expect(registerPage.emailInputLabel.textContent).eql("Email")
        .expect(registerPage.passwordInputLabel.textContent).eql("Password")
        .expect(registerPage.confirmPasswordInputLabel.textContent).eql("Confirm Password")
})

registerData.users.forEach((data) => {
    test("when user tries to signup given valid user data then should be a successful registration and redirect to home", async t => {
        await registerPage.fillRegisterForm(data.name, data.username, data.email, data.password, data.confirmPassword);
        await registerPage.submitForm()
        await t.expect(homePage.initialTitle.exists).ok()
    })
})

