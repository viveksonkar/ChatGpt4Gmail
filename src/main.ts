import * as InboxSDK from '@inboxsdk/core';
import composeMenuDD from './menu/compose-menu';
import { ASCII_ART } from './utils/ascii-art';
import { GLOBAL } from './utils/global-data';
import { CONTEXT, sideBar } from './controls/sidebar';
import Menu from './menu/menu';                 
import { licenseHandler } from './components/license-handler';
import { publishSidebarConfig } from './components/publish-sidebar-configs';

class Main {

    constructor() {
      this.init();
    }

    init() {
      console.log(ASCII_ART);
      InboxSDK.load(2, "sdk_ChatGpt4Gmail_580a70a147", {}).then((sdk) => {
        GLOBAL.sdk = sdk;

        // loading license in the last to handle event in the last
        licenseHandler(); // set the isActivated = false

        // the SDK has been loaded, now do something with it!
        GLOBAL.sdk.Compose.registerComposeViewHandler((composeView) => {
          GLOBAL.composeView = composeView;
          GLOBAL.composeView.addButton(composeMenuDD());
        });

        GLOBAL.sdk.Lists.registerThreadRowViewHandler((threadRowView: InboxSDK.ThreadRowView) => {
          GLOBAL.threadRowView = threadRowView;
          publishSidebarConfig(CONTEXT.HOME, Menu.MENU_TYPE.NAVIGATION_MAIN, true);
        });

        GLOBAL.sdk.Conversations.registerThreadViewHandler((threadView) => {
          GLOBAL.threadView = threadView;
        });
        
        GLOBAL.sdk.Conversations.registerMessageViewHandler((messageView) => {
          GLOBAL.messageView = messageView;
          publishSidebarConfig(CONTEXT.THREAD, Menu.MENU_TYPE.NAVIGATION_MAIN, true)
        });

        sideBar();
      });
    }
}

new Main();