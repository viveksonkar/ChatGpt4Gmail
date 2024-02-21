import * as InboxSDK from '@inboxsdk/core';

export class GlobalData {
  contentPanelRef: InboxSDK.ContentPanelView | null = null;
  sdk: InboxSDK.InboxSDK | null = null;
  composeView: InboxSDK.ComposeView | null = null;
}

export const GLOBAL = new GlobalData();