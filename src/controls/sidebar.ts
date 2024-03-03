import Menu from "../menu/menu";
import { GLOBAL } from "../utils/global-data";
import { debounceTime } from "rxjs";
import { loader } from "../components/loader";
import { renderContent } from "./content-renderer";
import { appInfo } from "../components/app-info";
import { header } from "../components/header";
import { footer } from "../components/footer";

export enum CONTEXT {
  'COMPOSE','THREAD','HOME'
}

export interface SideBarConfig {
  context: CONTEXT;
  menu: string;
  isDefaultOpen: boolean
}

export const defaultSideBarConfigs: SideBarConfig = {
  context: CONTEXT.HOME,
  menu: Menu.MENU_TYPE.NAVIGATION_MAIN,
  isDefaultOpen: false
};

/**
 * `<div class="dflex dflex-column sidebar">
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
        ${ settingIcon().outerHTML}
      </div>
    </div>
    <div class="content dflex-grow-1"></div>
    <div class="loader"></div>
    <div class="footer">Footer</div>
  </div>`
 */
export const sideBar = () => {

  const responseHandler = (response: string) => {
    console.log("Response return is ", response);
  }


  // Create a container element for the sidebar
  var sidebarContainer = document.createElement('div');
  sidebarContainer.style.width = '100%'; // Adjust width as needed
  sidebarContainer.style.backgroundColor = '#f3f3f3'; // Customize background color
  sidebarContainer.style.height = '100vh';

  const loading = document.createElement('div');
  loading.classList.add('loader');
  loading.appendChild(loader());

  const content = document.createElement('div');
  content.classList.add('dflex-grow-1');
  content.classList.add('content');

  var sidebarContent1 = document.createElement('div');
  ["dflex","dflex-column","sidebar"].forEach( className => 
      sidebarContent1.classList.add(className));

  sidebarContent1.appendChild(appInfo());
  sidebarContent1.appendChild(header());
  sidebarContent1.appendChild(content);
  sidebarContent1.appendChild(loading);
  sidebarContent1.appendChild(footer());
  
  sidebarContainer.appendChild(sidebarContent1);

  GLOBAL.sideBarConfigs$.pipe(debounceTime(500)).subscribe( configs => {

    console.log("Sidebar opened with configs: ", configs);

    // to remove all child
    if(content) {
      while(content.firstChild) {
        content.removeChild(
          content.firstChild
        )
      }
    }

    content.appendChild(renderContent(configs, responseHandler));

    if(!GLOBAL.contentPanelRef) {
      GLOBAL.sdk?.Global.addSidebarContentPanel({
        title: 'ChatGpt4Gmail',
        appName: 'ChatGpt4Gmail',
        hideTitleBar: false,
        primaryColor: 'black',
        iconUrl: "https://lh5.googleusercontent.com/itq66nh65lfCick8cJ-OPuqZ8OUDTIxjCc25dkc4WUT1JG8XG3z6-eboCu63_uDXSqMnLRdlvQ=s128-h128-e365",
        el: sidebarContainer
      }).then( contentPanel => {
        GLOBAL.contentPanelRef = contentPanel; // adding new panel
      });
    }

    if(configs.isDefaultOpen && GLOBAL.contentPanelRef) {
      GLOBAL.contentPanelRef.open();
    }
  });

  GLOBAL.loader$.subscribe( isLoading => {
    console.log("LOADING ==>> ", isLoading)
    if(sidebarContainer.querySelector('.loader')) {
      (sidebarContainer.querySelector('.loader') as HTMLDivElement)
        .style.display = isLoading ? 'block' : 'none';
    }
  });
}
