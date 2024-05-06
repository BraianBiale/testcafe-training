import { Selector, t } from "testcafe";
import XPathSelector from "../util/xpath-selector";

class ExplorePage {
  constructor() {
    this.searchInputField = Selector("div > input[placeholder='Search Twitter']");
    this.firstUserDropdownContainer = XPathSelector("//main/div/div/div[2]/div[1]")
  }
}

export default new ExplorePage();
