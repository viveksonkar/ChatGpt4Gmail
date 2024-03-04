import { Activation } from "../components/activation";
import { ReplyEmail } from "../components/reply-email";
import { RewriteEmail } from "../components/rewrite-email";
import { Settings } from "../components/settings";
import { SuggestEmail } from "../components/suggest-email";
import { SummarizeEmail } from "../components/summarize-email";
import { TranslateEmail } from "../components/translate-email";
import { WriteEmail } from "../components/write-email";
import Menu from "../menu/menu";
import { NavigationMain } from "../menu/navigation-menu";
import { GLOBAL } from "../utils/global-data";
import { SideBarConfig } from "./sidebar";

export const renderContent = (configs: SideBarConfig, responseHandler: (response: string) => void): HTMLDivElement => {
  let el = document.createElement('div');
  if(!GLOBAL.isActivated) {
    el = Activation(responseHandler);
    return el;
  }
  switch (configs.menu) {
    case Menu.MENU_TYPE.NAVIGATION_MAIN:
      el = NavigationMain(configs.context, responseHandler);
      break;
    case Menu.MENU_TYPE.WRITE_EMAIL:
      el = WriteEmail(responseHandler);
      break;
    case Menu.MENU_TYPE.REPLY_EMAIL:
      el = ReplyEmail(responseHandler);
      break;
    case Menu.MENU_TYPE.SUMMARIZE_EMAIL:
      el = SummarizeEmail(responseHandler);
      break;
    case Menu.MENU_TYPE.SUGGEST_REPLY:
      el = SuggestEmail(responseHandler);
      break;
    case Menu.MENU_TYPE.REWRITE_EMAIL:
      el = RewriteEmail(responseHandler);
      break;
    case Menu.MENU_TYPE.TRANSLATE_TO:
      el = TranslateEmail(responseHandler);
      break;
    case Menu.MENU_TYPE.SETTINGS:
      el = Settings(responseHandler);
      break;
    case Menu.MENU_TYPE.ACTIVATION:
      el = Activation(responseHandler);
      break;
    default:
      el.innerHTML = "menu handler not found";
      break;
  }
  return el;
}