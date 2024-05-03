import registerPage from "./pages/RegisterPage";
import homePage from "./pages/HomePage";
import { checkBorderRadiusStyles } from "./util/style-functions";

const registerData = require("./data/registerData.json");
const data = require("./data/data.json");

fixture
  .meta({ fixtureId: "f-0002" })("Register fixture")
  .page(`${data.baseUrl}/register`);

test.meta({ testId: "t-0001" })(
  "when user enters in the signup page given - then should see the different inputs with their styling",
  async (t) => {
    await t
      .expect(registerPage.headerTitle.textContent)
      .eql("Create your account")
      .expect(registerPage.nameInputLabel.textContent)
      .eql("Name")
      .expect(registerPage.usernameInputLabel.textContent)
      .eql("Username")
      .expect(registerPage.emailInputLabel.textContent)
      .eql("Email")
      .expect(registerPage.passwordInputLabel.textContent)
      .eql("Password")
      .expect(registerPage.confirmPasswordInputLabel.textContent)
      .eql("Confirm Password");
  }
);

registerData.users.forEach((data) => {
  test.meta({ testId: "t-0002" })(
    "when user tries to signup given valid user data then should be a successful registration and redirect to home",
    async (t) => {
      await registerPage.fillRegisterForm(
        data.name,
        data.username,
        data.email,
        data.password,
        data.confirmPassword
      );
      await registerPage.submitForm();
      await t.expect(homePage.initialTitle.exists).ok();
    }
  );
});

const checkBorderStyles = async (t, element, expectedColor) => {
  await t
    .expect(element.getStyleProperty("border-bottom-color"))
    .eql(expectedColor)
    .expect(element.getStyleProperty("border-top-color"))
    .eql(expectedColor)
    .expect(element.getStyleProperty("border-left-color"))
    .eql(expectedColor)
    .expect(element.getStyleProperty("border-right-color"))
    .eql(expectedColor);
};

test.meta({ testId: "t-0003" })(
  "register section has styles according to the design",
  async (t) => {
    await t
      .expect(registerPage.headerTitle.textContent)
      .eql("Create your account")
      .expect(registerPage.registerBtn.getStyleProperty("opacity"))
      .eql("0.5")
      .expect(registerPage.loginBtn.getStyleProperty("color"))
      .eql("rgb(0, 0, 0)")
      .expect(registerPage.loginBtn.getStyleProperty("background-color"))
      .eql("rgb(255, 255, 255)")

      [
        (registerPage.nameFieldContaine,
        registerPage.usernameFieldContainer,
        registerPage.emailFieldContainer,
        registerPage.passwordFieldContainer,
        registerPage.confirmPasswordFieldContainer)
      ].forEach(async (element) => {
        await checkBorderStyles(t, element, "rgb(209, 217, 221)");
        await checkBorderRadiusStyles(t, element, "8px");
      });
  }
);

test.meta({ testId: "t-0004" })(
  "register section should show error message if the email is already in use",
  async (t) => {
    const data = registerData.users[0];
    await registerPage.fillRegisterForm(
      data.name,
      data.username,
      "testuser@gmail.com",
      data.password,
      data.confirmPassword
    );
    await t
      .typeText(registerPage.emailFieldErrorLabel, "testuser@gmail.com")
      .click(registerPage.passwordFieldContainer)
      .expect(registerPage.emailFieldErrorLabel.textContent)
      .eql("Email already in use")
      .expect(registerPage.emailFieldErrorLabel.getStyleProperty("color"))
      .eql("rgb(224, 60, 57)");
  }
);
