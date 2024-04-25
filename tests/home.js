import {userOne} from "./roles/roles"
import homePage from "./pages/HomePage";
import profilePage from "./pages/ProfilePage";
import loginPage from "./pages/LoginPage";
import connectPage from "./pages/ConnectPage";

const data = require("./data/data.json")

fixture.meta({fixtureId: "f-0001"})("Home fixture").beforeEach(async t => {
    await t.useRole(userOne)
    await t.navigateTo(`${data.baseUrl}/`);
});

test("maximun characters on tweet creation should show an error", async t => {
    await t.click(homePage.createTweetBtn)
        .typeText(homePage.newTweetModalTextArea, "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu1")
        .click(homePage.submitNewTweetModalBtn)
        .expect(homePage.newTweetModalCharsErrorLabel.textContent).eql("Post should be between 1 and 240 characters")
        .expect(homePage.newTweetModalCharsErrorLabel.getStyleProperty("color")).eql("rgb(224, 60, 57)")
        .expect(homePage.tweetWith241CharsContainer.exists).notOk()
})

test("minimun characters on tweet creation should disable tweet btn", async t => {
    await t.click(homePage.createTweetBtn)
        .typeText(homePage.newTweetModalTextArea, "a")
        .selectText(homePage.newTweetModalTextArea)
        .pressKey("delete")
        .expect(homePage.submitNewTweetModalBtn.hasAttribute("disabled")).ok()
})

test("maximun uploaded images on tweet creation should show an error", async t => {
    const tweetText = "dd610813-351a-4964-a162-a59b2ca1ea69"
    await t.click(homePage.createTweetBtn)
        .typeText(homePage.newTweetModalTextArea, tweetText)
        .setFilesToUpload(homePage.uploadImageInput, ['../uploads/imgs/image-1.png', '../uploads/imgs/image-2.png', '../uploads/imgs/image-3.png', '../uploads/imgs/image-4.png', '../uploads/imgs/image-5.png'])
        .click(homePage.submitNewTweetModalBtn)
        .expect(homePage.newTweetModalImagesUploadedErrorLabel.textContent).eql("Post should have 4 or fewer images")
        .expect(homePage.newTweetModalImagesUploadedErrorLabel.getStyleProperty("color")).eql("rgb(224, 60, 57)")
        .expect(homePage.getTweetContainerByTextInside(tweetText).exists).notOk()
})

test("on delete image uploaded icon click should remove the upload images from the selected images and preview", async t => {
    await t.click(homePage.createTweetBtn)
        .setFilesToUpload(homePage.uploadImageInput, ['../uploads/imgs/image-1.png', '../uploads/imgs/image-2.png'])
        .click(homePage.removeFirstImageBtn)
        .expect(homePage.uploadImagesContainer.find("div > img").count).eql(1)
})

test("on avatar click redirect to profile of user", async t => {
    await t.click(homePage.userAvatarContainer)
        .expect(profilePage.profileTitle.textContent).eql("braian")
        .expect(profilePage.profileTitle.getStyleProperty("text-transform")).eql("capitalize")
        .expect(profilePage.profileName.textContent).eql("Braian")
        .expect(profilePage.profileUsername.textContent).eql("@braianb")
        .expect(profilePage.profileDescription.textContent).eql("Description...")
})

test("if enter on unfollowed user profile should see the follow button", async t => {
    await t.click(homePage.userAvatarContainer)
        .expect(profilePage.followBtn.exists).ok()
        .expect(profilePage.followBtn.textContent).eql("Follow")
        .expect(profilePage.followBtn.getStyleProperty("color")).eql("rgb(255, 255, 255)")
        .expect(profilePage.followBtn.getStyleProperty("background-color")).eql("rgb(0, 0, 0)")
})

test("if user click follow user in the user's profile should see the following button", async t => {
    await t.click(homePage.userAvatarContainer)
        .click(profilePage.followBtn)
        .expect(profilePage.followBtn.textContent).eql("Following")
        .expect(profilePage.followBtn.getStyleProperty("background-color")).eql("rgb(255, 255, 255)")
        .expect(profilePage.followBtn.getStyleProperty("color")).eql("rgb(0, 0, 0)")
}).after(async t => {
    await t.click(profilePage.followBtn)
})

test("if user retweet a post should see retweet icon selected and increased the number of retweets", async t => {
    await t.click(homePage.postRetweetIconBtn)
        .expect(homePage.postRetweetIconImage.getAttribute("src")).eql("/static/media/retweet-icon-toggled.7353f9e0e1181b7a60dbc9bc2a935814.svg")

    const textContent = await homePage.postRetweetCounterLabel.textContent;
    const intValue = parseInt(textContent);
    await t.expect(intValue).eql(1);
})

test("if user retweet an already retweeted post should see retweet icon grey and decreased the number of retweets", async t => {
    await t.click(homePage.postRetweetIconBtn)
        .click(homePage.postRetweetIconBtn)
        .takeElementScreenshot(homePage.postRetweetIconBtn)
        .takeScreenshot()
        .expect(homePage.postRetweetIconImage.getAttribute("src")).eql("/static/media/retweet-icon.f7273f0d85063773ad8ecb2cb99a95ff.svg")

    const textContent = await homePage.postRetweetCounterLabel.textContent;
    const intValue = parseInt(textContent);
    await t.expect(intValue).eql(0);
})

test("if user click logout option then should be redirect to login page and not be authenticated", async t => {
    await homePage.clickMoreOptions()
    await homePage.logoutMoreOptionsClick()
    await homePage.logoutModalClick()
    await t.expect(loginPage.loginTitleContainer.exists).ok()
})

// can't get the loader element
test("if user scroll to bottom of feed should see a loader and more posts should load", async t => {
    await t.scroll(homePage.feedContainer, 'bottom')
        .expect(homePage.infiniteLoadSpinner.getStyleProperty("animation")).eql("1.5s linear 0s infinite normal none running spinner;")
        .expect(homePage.infiniteLoadFirstNewPost.exists).ok()
})

test.meta({testId: "t-0012"})("if user click 'Show More' option should redirect to connect screen with recommended users", async t => {
    await t.click(homePage.showMoreRecommendedUserLink)
        .expect(connectPage.pageTitle.textContent).eql("Connect")
})







