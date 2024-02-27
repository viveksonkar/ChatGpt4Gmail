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

export enum CONTEXT {
  'COMPOSE','THREAD'
}

export interface SideBarConfig {
  context: CONTEXT;
  menu: string;
  isDefaultOpen: boolean;
  onClose: () => void;
  onSubmit: (context: CONTEXT) => void;
  onSetting: (isOpen: boolean) => void;
  onBack: () => void;
}

export const sideBar = (configs: SideBarConfig) => {

  const responseHandler = (response: string) => {
    console.log("Response return is ", response);
  }

  const renderContent = (menu: string): HTMLDivElement => {
    let el = document.createElement('div');
    switch (menu) {
      case Menu.MENU_TYPE.NAVIGATION_MAIN:
        el = NavigationMain(responseHandler);
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

  var sideBarContent = `<div class="dflex dflex-column sidebar">
    <div class="app-info dflex dflex-between">
      <div class="app-info-title">${GLOBAL.appName} ${GLOBAL.version}</div>
      <div class="app-info-close">X</div>
    </div>
    <div class="header dflex dflex-between dflex-vcenter">
      <div class="dflex header-toggle">
        <div class="header-back">&larr;</div>
        <div class="header-logo">ChatGpt4Gmail</div>
      </div>
      <div class="header-setting">
        ${ configs.menu !== Menu.MENU_TYPE.SETTINGS ? 
          '<img src="https://chatgpt4sheets.com/cg4sheets-assets/cg4-sheets-setting-open.svg">' 
          : '<img src="https://chatgpt4sheets.com/cg4sheets-assets/cg4sheets-setting.svg">'
        }
      </div>
    </div>
    <div class="dflex-grow-1 content"></div>
    <div class="footer">Footer</div>
  </div>`

  // Create a container element for the sidebar
  var sidebarContainer = document.createElement('div');
  sidebarContainer.style.width = '100%'; // Adjust width as needed
  sidebarContainer.style.backgroundColor = '#f3f3f3'; // Customize background color
  sidebarContainer.style.height = '100vh';
  sidebarContainer.innerHTML = sideBarContent;

  // Attaching events
  sidebarContainer.querySelector('.app-info-close')
    ?.addEventListener('click', (e: any) => configs.onClose());

  sidebarContainer.querySelector('.content')
    ?.appendChild(renderContent(configs.menu));

  sidebarContainer.querySelector('.header-setting')
    ?.addEventListener('click', (e: any) => configs.onSetting(configs.menu !== Menu.MENU_TYPE.SETTINGS));

  sidebarContainer.querySelector('.header-back')
    ?.addEventListener('click', (e: any) => configs.onBack());

  return {
    title: 'ChatGpt4Gmail',
    appName: 'ChatGpt4Gmail',
    hideTitleBar: false,
    primaryColor: 'black',
    iconUrl: "https://lh5.googleusercontent.com/itq66nh65lfCick8cJ-OPuqZ8OUDTIxjCc25dkc4WUT1JG8XG3z6-eboCu63_uDXSqMnLRdlvQ=s128-h128-e365",
    el: sidebarContainer
  };
}
