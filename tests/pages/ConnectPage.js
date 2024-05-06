import { Selector, t } from "testcafe";
import XPathSelector from "../util/xpath-selector";

class ConnectPage {
  constructor() {
    this.pageTitle = Selector("div > h1");
    this.userAvatarContainer = XPathSelector(
      "//main/div/div[1]/div/div[1]/div/div"
    );
    this.userNameContainer = XPathSelector(
      "//main/div/div/div[1]/div/div[2]/div[1]"
    );
    this.userUsernameContainer = XPathSelector(
      "//main/div/div/div[1]/div/div[2]/div[2]"
    );
    this.userFollowBtn = Selector("div:nth-of-type(1) > button[mode='follow']")
  }
}

export default new ConnectPage();
