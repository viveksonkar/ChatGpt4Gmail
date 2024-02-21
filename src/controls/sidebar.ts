import { RewriteEmail } from "../components/rewrite-email";
import { SuggestEmail } from "../components/suggest-email";
import { SummarizeEmail } from "../components/summarize-email";
import { TranslateEmail } from "../components/translate-email";
import { WriteEmail } from "../components/write-email";
import Menu from "../menu/menu";

export enum CONTEXT {
  'COMPOSE','THREAD'
}

export interface SideBarConfig {
  context: CONTEXT;
  menu: string;
  onClose: () => void;
  onSubmit: (context: CONTEXT) => void;
}

export const sideBar = (configs: SideBarConfig) => {

  const responseHandler = (response: string) => console.log("Response return is ", response);

  const renderContent = (menu: string): HTMLDivElement => {
    console.log("RenderContent called");
    let el = document.createElement('div');
    switch (menu) {
      case Menu.MENU_TYPE.WRITE_EMAIL:
        el = WriteEmail(responseHandler);
        break;
      case Menu.MENU_TYPE.REPLY_EMAIL:
        el = RewriteEmail(responseHandler);
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
      default:
        el.innerHTML = "menu handler not found";
        break;
    }
    return el;
  }

  var sideBarContent = `<div class="dflex dflex-column sidebar">
    <div class="header">
      <div class="dflex dflex-between">
        <div class="name">ChatGpt4Gmail</div>
        <div class="close">X</div>
      </div>
    </div>
    <div class="dflex-grow-1 content">${configs.context}</div>
    <div class="footer">Footer</div>
  </div>`

  // Create a container element for the sidebar
  var sidebarContainer = document.createElement('div');
  sidebarContainer.style.width = '100%'; // Adjust width as needed
  sidebarContainer.style.backgroundColor = '#f3f3f3'; // Customize background color
  sidebarContainer.style.height = '100vh';
  sidebarContainer.innerHTML = sideBarContent;

  // Attaching events
  sidebarContainer.querySelector('.close')
    ?.addEventListener('click', (e: any) => configs.onClose());

  sidebarContainer.querySelector('.content')
    ?.appendChild(renderContent(configs.menu));

  return {
    title: 'ChatGpt4Gmail',
    appName: 'ChatGpt4Gmail',
    hideTitleBar: false,
    primaryColor: 'black',
    iconUrl: "https://lh5.googleusercontent.com/itq66nh65lfCick8cJ-OPuqZ8OUDTIxjCc25dkc4WUT1JG8XG3z6-eboCu63_uDXSqMnLRdlvQ=s128-h128-e365",
    el: sidebarContainer
  };
}
