import * as InboxSDK from '@inboxsdk/core';

export class GlobalData {
  contentPanelRef: InboxSDK.ContentPanelView | null = null;
  sdk: InboxSDK.InboxSDK | null = null;
  composeView: InboxSDK.ComposeView | null = null;
  appName = "ChatGpt4Gmail";
  version = "v0.1";
  cgApiKey = "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";
  response = "";
}

export const GLOBAL = new GlobalData();