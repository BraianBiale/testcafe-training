import {Selector, t} from "testcafe"

class ConnectPage {
    constructor() {
        this.pageTitle = Selector("div > h1")
    }
}

export default new ConnectPage();