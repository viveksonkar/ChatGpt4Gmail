import * as InboxSDK from '@inboxsdk/core';
import composeMenuDD from './components/compose-menu';
import { ASCII_ART } from './utils/ascii-art';

class Main {
    constructor() {
        this.init();
    }

    init() {
      console.log(ASCII_ART);
      InboxSDK.load(2, "sdk_ChatGpt4Gmail_580a70a147", {}).then((sdk) => {
        // the SDK has been loaded, now do something with it!
        sdk.Compose.registerComposeViewHandler((composeView) => {
          composeView.addButton(composeMenuDD(sdk, composeView));
        });
      });
    }
}

new Main();