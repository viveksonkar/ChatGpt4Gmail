import * as InboxSDK from '@inboxsdk/core';
import { CONTEXT, SideBarConfig, defaultSideBarConfigs } from '../controls/sidebar';
import { BehaviorSubject } from 'rxjs';

export class GlobalData {
  contentPanelRef: InboxSDK.ContentPanelView | null = null;
  sdk: InboxSDK.InboxSDK | null = null;
  composeView: InboxSDK.ComposeView | null = null;
  threadView: InboxSDK.ThreadView | null = null;
  threadRowView: InboxSDK.ThreadRowView | null = null;
  messageView: InboxSDK.MessageView | null = null;
  appName: string = "ChatGpt4Gmail";
  version = "v0.1";
  cgApiKey: string = "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";
  response: string = "";
  context: CONTEXT = 2;
  sideBarConfigs$ = new BehaviorSubject<SideBarConfig>(defaultSideBarConfigs);
  loader$ = new BehaviorSubject<boolean>(false);
  isMock = true;
  error: string | null = null;
}

export const GLOBAL = new GlobalData();