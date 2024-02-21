import * as InboxSDK from '@inboxsdk/core';
import composeMenuDD from './menu/compose-menu';
import { ASCII_ART } from './utils/ascii-art';
import { SideBarWidget } from './widgets/sidebar-widget';
import { GLOBAL } from './utils/global-data';
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
          GLOBAL.composeView = composeView;
          GLOBAL.composeView.addButton(composeMenuDD());
        });

        // TO add global sidebar
        SideBarWidget(CONTEXT.THREAD, Menu.MENU_TYPE.WRITE_EMAIL);
      });
    }
}

new Main();