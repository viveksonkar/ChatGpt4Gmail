import * as InboxSDK from '@inboxsdk/core';
import composeMenuDD from './menu/compose-menu';
import { ASCII_ART } from './utils/ascii-art';
import { SideBarWidget } from './widgets/sidebar-widget';
import { GLOBAL } from './utils/global-data';
import { CONTEXT } from './controls/sidebar';
import Menu from './menu/menu';
import { composeThreadView } from './controls/threadView';
/* import { composeThreadView } from './controls/threadView'; */


class Main {
    constructor() {
      this.init();
    }

    init() {
      console.log(ASCII_ART);
      InboxSDK.load(2, "sdk_ChatGpt4Gmail_580 a70a147", {}).then((sdk) => {
        GLOBAL.sdk = sdk;
        // the SDK has been loaded, now do something with it!
        GLOBAL.sdk.Compose.registerComposeViewHandler((composeView) => {
          GLOBAL.composeView = composeView;
          GLOBAL.composeView.addButton(composeMenuDD());
        });
        GLOBAL.sdk.Conversations.registerThreadViewHandler((threadView) => {
          composeThreadView(threadView);
          
        })
        // TO add global sidebar
        //SideBarWidget(CONTEXT.THREAD, Menu.MENU_TYPE.NAVIGATION_MAIN);
      });
    }
}

new Main();