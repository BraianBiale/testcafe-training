import registerPage from "./pages/RegisterPage";
import homePage from "./pages/HomePage";

const registerData = require("./data/registerData.json");
const data = require("./data/data.json");

fixture.meta({ fixtureId: "f-0002" })("Register fixture").page(`${data.baseUrl}/register`)

test.meta({ testId: "t-0001" })("when user enters in the signup page given - then should see the different inputs with their styling", async t => {
    await t.expect(registerPage.headerTitle.textContent).eql("Create your account")
        .expect(registerPage.nameInputLabel.textContent).eql("Name")
        .expect(registerPage.usernameInputLabel.textContent).eql("Username")
        .expect(registerPage.emailInputLabel.textContent).eql("Email")
        .expect(registerPage.passwordInputLabel.textContent).eql("Password")
        .expect(registerPage.confirmPasswordInputLabel.textContent).eql("Confirm Password")
})

registerData.users.forEach((data) => {
    test.meta({ testId: "t-0002" })("when user tries to signup given valid user data then should be a successful registration and redirect to home", async t => {
        await registerPage.fillRegisterForm(data.name, data.username, data.email, data.password, data.confirmPassword);
        await registerPage.submitForm()
        await t.expect(homePage.initialTitle.exists).ok()
    })
})

const checkBorderStyles = async (t, element, expectedColor, expectedRadius) => {
    await t.expect(element.getStyleProperty("border-bottom-color")).eql(expectedColor)
    .expect(element.getStyleProperty("border-top-color")).eql(expectedColor)
    .expect(element.getStyleProperty("border-left-color")).eql(expectedColor)
    .expect(element.getStyleProperty("border-right-color")).eql(expectedColor)
    .expect(element.getStyleProperty("border-top-right-radius")).eql(expectedRadius)
    .expect(element.getStyleProperty("border-top-left-radius")).eql(expectedRadius)
    .expect(element.getStyleProperty("border-bottom-right-radius")).eql(expectedRadius)
    .expect(element.getStyleProperty("border-bottom-left-radius")).eql(expectedRadius)
}

test.meta({testId: "t-0003"})("register section has styles according to the design", async t => {
    await t.expect(registerPage.headerTitle.textContent).eql("Create your account")
    .expect(registerPage.registerBtn.getStyleProperty("opacity")).eql("0.5")
    .expect(registerPage.loginBtn.getStyleProperty("color")).eql("rgb(0, 0, 0)")
    .expect(registerPage.loginBtn.getStyleProperty("background-color")).eql("rgb(255, 255, 255)")

    await checkBorderStyles(t, registerPage.nameFieldContainer, "rgb(209, 217, 221)", "8px")
    await checkBorderStyles(t, registerPage.usernameFieldContainer, "rgb(209, 217, 221)", "8px")
    await checkBorderStyles(t, registerPage.emailFieldContainer, "rgb(209, 217, 221)", "8px")
    await checkBorderStyles(t, registerPage.passwordFieldContainer, "rgb(209, 217, 221)", "8px")
    await checkBorderStyles(t, registerPage.confirmPasswordFieldContainer, "rgb(209, 217, 221)", "8px")
})

test.meta({testId: "t-0004"})("register section should show error message if the email is already in use", async t => {
    await t.expect(registerPage.emailFieldErrorLabel.textContent).eql("Email already in use")
    .expect(registerPage.emailFieldErrorLabel.getStyleProperty("color")).eql("rgb(224, 60, 57)")
})





