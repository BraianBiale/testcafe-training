import {Role} from 'testcafe';
import loginPage from "../pages/LoginPage";

const data = require("../data/data.json")

export const userOne = Role(`${data.baseUrl}/login`, async t => {
    await loginPage.fillLoginForm(data.validUsers[0].username, data.validUsers[0].password)
    await t.click(loginPage.loginBtn)
});