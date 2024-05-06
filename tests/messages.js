import messagesPage from "./pages/MessagesPage";
import { userOne } from "./roles/roles";
import { ClientFunction } from "testcafe";

const getPageUrl = ClientFunction(() => window.location.href);

const data = require("./data/data.json");

fixture
  .meta({ fixtureId: "f-0006" })("Messages fixture")
  .beforeEach(async (t) => {
    await t.useRole(userOne);
    await t.navigateTo(`${data.baseUrl}/message`);
  });

test.meta({ testId: "t-0001" })(
  "message page loads successfully",
  async (t) => {
    await t.expect(getPageUrl()).contains("/message");
  }
);

test.meta({ testId: "t-0002" })(
  "if search box is empty should show entire user list messages",
  async (t) => {
    await t
      .click(messagesPage.searchDirectmessageInputField)
      .expect(messagesPage.userMessagesList.child().filter(":not(:empty)").count).eql(2)
  }
);

test.meta({ testId: "t-0003" })(
  "if user write in the search box should filter user list accordingly to the text written",
  async (t) => {
    await t
      .typeText(messagesPage.searchDirectmessageInputField, "Fede")
      .expect(messagesPage.userMessagesList.child().filter(":not(:empty)").count).eql(1)
  }
);
