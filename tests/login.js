import loginPage from "./pages/LoginPage";
import homePage from "./pages/HomePage";

const data = require("./data/data.json")

fixture.meta({fixtureId:"f-0001"})("Login fixture").page(`${data.baseUrl}/login`)

data.validUsers.forEach((item) => {
    test.meta({ testId: "t-0001" })("successful login", async t => {
        await loginPage.fillLoginForm(item.username, item.password)
        await t.click(loginPage.loginBtn)
            .expect(homePage.initialTitle.exists).ok()
    })
})

test.meta({testId:"t-0002"}).page(`${data.baseUrl}/explore`)("redirect to login if user is not authenticated", async t => {
    await t.expect(loginPage.loginTitleContainer.exists).ok('', {timeout: 10000})
})


