import * as InboxSDK from '@inboxsdk/core';
import composeMenuDD from './menu/compose-menu';
import { ASCII_ART } from './utils/ascii-art';
import { GLOBAL } from './utils/global-data';
import { composeThreadView } from './controls/threadView';
import { SideBarWidget } from './widgets/sidebar-widget';
import { CONTEXT } from './controls/sidebar';
import Menu from './menu/menu';

class Main {

    constructor() {
      this.init();
    }

    init() {
      console.log(ASCII_ART);
      InboxSDK.load(2, "sdk_ChatGpt4Gmail_580a70a147", {}).then((sdk) => {
        GLOBAL.sdk = sdk;
        // the SDK has been loaded, now do something with it!
        GLOBAL.sdk.Compose.registerComposeViewHandler((composeView) => {
          console.log("registerComposeViewHandler")
          GLOBAL.composeView = composeView;
          GLOBAL.composeView.addButton(composeMenuDD());
          GLOBAL.threadRowCounter = 0;
        });

        GLOBAL.sdk.Lists.registerThreadRowViewHandler((threadRowView: InboxSDK.ThreadRowView) => {
          GLOBAL.threadRowView = threadRowView;
          console.log("registerThreadRowViewHandler: ", GLOBAL.threadRowCounter)
          if(GLOBAL.threadRowCounter === 0) {
            SideBarWidget(CONTEXT.HOME, Menu.MENU_TYPE.NAVIGATION_MAIN, true);
          }
          GLOBAL.threadRowCounter = GLOBAL.threadRowCounter + 1;
        });

        GLOBAL.sdk.Conversations.registerThreadViewHandler((threadView) => {
          console.log("registerThreadViewHandler")
          GLOBAL.threadView = threadView;
          composeThreadView(threadView); 
          GLOBAL.threadRowCounter = 0;

        });
        
        GLOBAL.sdk.Conversations.registerMessageViewHandler((messageView) => {
          console.log("registerMessageViewHandler")
          GLOBAL.messageView = messageView;
          SideBarWidget(CONTEXT.THREAD, Menu.MENU_TYPE.NAVIGATION_MAIN, true);
          GLOBAL.threadRowCounter = 0;
        })
      });
    }
}

new Main();