import * as InboxSDK from '@inboxsdk/core';
import { CONTEXT, SideBarConfig, defaultSideBarConfigs } from '../controls/sidebar';
import { BehaviorSubject } from 'rxjs';
import { ApiResponse } from '../integrations/models/cg4gmail.model';
import { CG_API_KEY, LICENSE_KEY, SELECTED_CG_MODEL } from './storage-constants';

export interface Setting {
  [CG_API_KEY]: string | null;
  [LICENSE_KEY]: string | null;
  [SELECTED_CG_MODEL]: string | null;
}

export class GlobalData {
  contentPanelRef: InboxSDK.ContentPanelView | null = null;
  sdk: InboxSDK.InboxSDK | null = null;
  composeView: InboxSDK.ComposeView | null = null;
  threadView: InboxSDK.ThreadView | null = null;
  threadRowView: InboxSDK.ThreadRowView | null = null;
  messageView: InboxSDK.MessageView | null = null;
  appName: string = "ChatGpt4Gmail";
  version = "v0.1";
  cgApiKey: string = "";
  response: string = "";
  context: CONTEXT = 2;
  sideBarConfigs$ = new BehaviorSubject<SideBarConfig>(defaultSideBarConfigs);
  loader$ = new BehaviorSubject<boolean>(false);
  btnLoader$ = new BehaviorSubject<boolean>(false);
  isMock = false;
  isApiMock = true;
  error: string | null = null;
  rootUrl: string = "https://gworks.ai/wp-json/chatgpt-server";
  licence$ = new BehaviorSubject<ApiResponse | null>(null);
  isActivated: boolean = false;
  threadViewCounter: number = 0;
  threadViewDebounder$ = new BehaviorSubject<number>(0);
  settingData$ = new BehaviorSubject<Setting>({
    [CG_API_KEY]: null,
    [LICENSE_KEY]: null,
    [SELECTED_CG_MODEL]: null})
}

export const GLOBAL = new GlobalData();