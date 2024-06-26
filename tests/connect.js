import connectPage from "./pages/ConnectPage";
import { userOne } from "./roles/roles";
import { checkBorderRadiusStyles } from "./util/style-functions";

const data = require("./data/data.json");

fixture
  .meta({ fixtureId: "f-0004" })("Connect fixture")
  .beforeEach(async (t) => {
    await t.useRole(userOne);
    await t.navigateTo(`${data.baseUrl}/connect`);
  });

test.meta({ testId: "t-0001" })(
  "connect page loads successfully",
  async (t) => {
    await t
      .expect(connectPage.pageTitle.exists)
      .ok()
      .expect(connectPage.pageTitle.textContent)
      .eql("Connect");
  }
);

test.meta({ testId: "t-0002" })(
  "each user recommendation item list should have styles accordingly to the design",
  async (t) => {
    await t
      .expect(connectPage.userAvatarContainer.textContent)
      .eql("LA")

    await checkBorderRadiusStyles(t, connectPage.userAvatarContainer, '50%')
    await t.expect(connectPage.userNameContainer.getStyleProperty("font-weight")).eql("600")
    .expect(connectPage.userUsernameContainer.getStyleProperty("font-weight")).eql("300")
    .expect(connectPage.userFollowBtn.exists).ok()
    .expect(connectPage.userFollowBtn.textContent).eql("Follow")
    .expect(connectPage.userFollowBtn.getStyleProperty("background-color")).eql("rgb(0, 0, 0)")
    .expect(connectPage.userFollowBtn.getStyleProperty("color")).eql("rgb(255, 255, 255)")
  }
);
