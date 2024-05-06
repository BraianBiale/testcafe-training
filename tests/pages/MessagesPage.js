import { Selector, t } from "testcafe";
import XPathSelector from "../util/xpath-selector";

class MessagesPage {
  constructor() {
    this.searchDirectmessageInputField = Selector("div > input[placeholder='Search Direct Message']");
    this.userMessagesList = XPathSelector("//main/div/div[3]")
  }
}

export default new MessagesPage();
