import * as InboxSDK from '@inboxsdk/core';

export class GlobalData {
  contentPanelRef: InboxSDK.ContentPanelView | null = null;
  sdk: InboxSDK.InboxSDK | null = null;
  composeView: InboxSDK.ComposeView | null = null;
  appName: string = "ChatGpt4Gmail";
  version = "v0.1";
  cgApiKey: string = "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";
  response: string = "";
  activeMenu: string | null = null;
  isMock = true;
  error: string | null = null;
}

export const GLOBAL = new GlobalData();