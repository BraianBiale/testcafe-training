import {Selector, t} from "testcafe"
import XPathSelector from '../util/xpath-selector';

class HomePage {
    constructor() {
        this.initialTitle = Selector("div > h1").withText("Home")
        this.createTweetBtn = Selector("div > button").withText("Tweet")
        this.newTweetModalTextArea = Selector("div > textarea").withAttribute("placeholder", "What's happening?")
        this.submitNewTweetModalBtn = Selector('#root button').withText('Tweet').nth(1)
        this.newTweetModalCharsErrorLabel = Selector('#root label').withText('Post should be between 1 and 240 characters')
        // is this selector ok? is too specific
        this.tweetWith241CharsContainer = Selector('main div').withText('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu1')
        this.uploadImageInput = Selector('#file-input')
        this.newTweetModalImagesUploadedErrorLabel = Selector('#root label').withText("Post should have 4 or fewer images")
        this.userAvatarContainer = Selector('main div').withText('BR').nth(5) // need to update this every time the user disappears from the feed?
        this.postRetweetIconBtn = Selector('div > div:nth-child(2) > div:nth-child(3) > button:nth-child(3)')
        this.postRetweetIconImage = Selector('div > div:nth-child(2) > div:nth-child(3) > button:nth-child(3) > img')
        this.postRetweetCounterLabel = Selector('div > div:nth-child(2) > div:nth-child(3) > label:nth-child(4)')
        this.moreOptionsIcon = Selector('div > div> div> div> div:nth-of-type(2) > div > div > div:nth-of-type(2)')
        this.logoutContainer = Selector('div > div > div:nth-child(3) > div:nth-child(1)')
        this.logoutBtnModal = Selector('div > div:nth-of-type(3) > div > div > div > button:nth-of-type(1)')
        this.removeFirstImageBtn = Selector('div:nth-of-type(2) > div > div > div > div > div > div:nth-child(2) > div:nth-child(1) > button')
        this.uploadImagesContainer = Selector('div:nth-of-type(2) > div > div > div > div > div > div:nth-child(2)')
        this.feedContainer = Selector('div > main > div:nth-child(2)')
        this.infiniteLoadSpinner = Selector('main > div:nth-of-type(2) > div > :only-child')
        this.infiniteLoadFirstNewPost = Selector('main > div:nth-child(2) > div:nth-child(22)')
        this.showMoreRecommendedUserLink = XPathSelector("//div[2]/div/div[2]/a")
    }

    async getTweetContainerByTextInside(text){
        return Selector('main div').withText(text)
    }

    async clickMoreOptions() {
        await t.click(this.moreOptionsIcon)
    }

    async logoutMoreOptionsClick() {
        await t.click(this.logoutContainer)
    }

    async logoutModalClick() {
        await t.click(this.logoutBtnModal)
    }
}

export default new HomePage();