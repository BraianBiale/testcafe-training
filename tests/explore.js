import explorePage from "./pages/ExplorePage";
import { userOne } from "./roles/roles";
import { ClientFunction } from "testcafe";

const getPageUrl = ClientFunction(() => window.location.href);

const data = require("./data/data.json");

fixture
  .meta({ fixtureId: "f-0005" })("Explore fixture")
  .beforeEach(async (t) => {
    await t.useRole(userOne);
    await t.navigateTo(`${data.baseUrl}/explore`);
  });

test.meta({ testId: "t-0001" })(
  "explore page loads successfully",
  async (t) => {
    await t.expect(getPageUrl()).contains("/explore");
  }
);

test.meta({ testId: "t-0002" })(
  "after clicking on a user from the dropdown should redirect to the profile of that specific user",
  async (t) => {
    await t
      .click(explorePage.searchInputField)
      .expect(explorePage.firstUserDropdownContainer.exists)
      .ok()
      .click(explorePage.firstUserDropdownContainer)
      .expect(getPageUrl())
      .contains("/profile?user=");
  }
);
