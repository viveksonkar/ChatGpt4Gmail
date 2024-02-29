import * as InboxSDK from '@inboxsdk/core';
import Menu from '../menu/menu';
import { CONTEXT } from '../controls/sidebar';

export class GlobalData {
  contentPanelRef: InboxSDK.ContentPanelView | null = null;
  sdk: InboxSDK.InboxSDK | null = null;
  composeView: InboxSDK.ComposeView | null = null;
  threadView: InboxSDK.ThreadView | null = null;
  threadRowView: InboxSDK.ThreadRowView | null = null;
  threadRowCounter: number =  0;
  messageView: InboxSDK.MessageView | null = null;
  appName: string = "ChatGpt4Gmail";
  version = "v0.1";
  cgApiKey: string = "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";
  response: string = "";
  activeMenu: string = Menu.MENU_TYPE.NAVIGATION_MAIN;
  context: CONTEXT = 2;
  isMock = true;
  error: string | null = null;
}

export const GLOBAL = new GlobalData();