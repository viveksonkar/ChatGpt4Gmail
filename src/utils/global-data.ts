import * as InboxSDK from '@inboxsdk/core';

export class GlobalData {
  contentPanelRef: InboxSDK.ContentPanelView | null = null;
  sdk: InboxSDK.InboxSDK | null = null;
  composeView: InboxSDK.ComposeView | null = null;
  appName = "ChatGpt4Gmail"
  version = "v0.1"
}

export const GLOBAL = new GlobalData();