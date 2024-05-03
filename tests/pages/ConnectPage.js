import { Selector, t } from "testcafe";
import XPathSelector from "../util/xpath-selector";

class ConnectPage {
  constructor() {
    this.pageTitle = Selector("div > h1");
    this.userAvatarContainer = XPathSelector(
      "//main/div/div[1]/div/div[1]/div/div"
    );
  }
}

export default new ConnectPage();
