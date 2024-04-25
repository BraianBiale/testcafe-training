import {Selector} from "testcafe"

class ProfilePage {
    constructor() {
        this.profileTitle = Selector("main > div > div:first-child > div")
        this.profileName = Selector("div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)")
        this.profileUsername = Selector("div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2)")
        this.profileDescription = Selector("div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2)")
        this.followBtn = Selector("main button").withAttribute("mode", "follow")
    }
}

export default new ProfilePage();