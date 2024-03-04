import * as InboxSDK from '@inboxsdk/core';
import { CONTEXT, SideBarConfig, defaultSideBarConfigs } from '../controls/sidebar';
import { BehaviorSubject } from 'rxjs';
import { ApiResponse } from '../integrations/models/cg4gmail.model';

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
  isMock = false;
  isApiMock = true;
  error: string | null = null;
  rootUrl: string = "https://gworks.ai/wp-json/chatgpt-server";
  licence$ = new BehaviorSubject<ApiResponse | null>(null);
  isActivated: boolean = false;
}

export const GLOBAL = new GlobalData();