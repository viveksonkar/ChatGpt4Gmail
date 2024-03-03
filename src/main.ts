import * as InboxSDK from '@inboxsdk/core';
import composeMenuDD from './menu/compose-menu';
import { ASCII_ART } from './utils/ascii-art';
import { GLOBAL } from './utils/global-data';
import { composeThreadView } from './controls/threadView';
import { CONTEXT, sideBar } from './controls/sidebar';
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
          GLOBAL.composeView = composeView;
          GLOBAL.composeView.addButton(composeMenuDD());
          /* GLOBAL.sideBarConfigs$.next({
            ...GLOBAL.sideBarConfigs$.value,
            context: CONTEXT.COMPOSE,
            isDefaultOpen: true
          }); */
        });

        GLOBAL.sdk.Lists.registerThreadRowViewHandler((threadRowView: InboxSDK.ThreadRowView) => {
          GLOBAL.threadRowView = threadRowView;
          GLOBAL.sideBarConfigs$.next({
            ...GLOBAL.sideBarConfigs$.value,
            context: CONTEXT.HOME,
            menu: Menu.MENU_TYPE.NAVIGATION_MAIN,
            isDefaultOpen: true
          });
        });

        GLOBAL.sdk.Conversations.registerThreadViewHandler((threadView) => {
          GLOBAL.threadView = threadView;
          composeThreadView(threadView); 
        });
        
        GLOBAL.sdk.Conversations.registerMessageViewHandler((messageView) => {
          GLOBAL.messageView = messageView;
          GLOBAL.sideBarConfigs$.next({
            ...GLOBAL.sideBarConfigs$.value,
            context: CONTEXT.THREAD,
            menu: Menu.MENU_TYPE.NAVIGATION_MAIN,
            isDefaultOpen: true
          });
        });

        sideBar();
      });
    }
}

new Main();