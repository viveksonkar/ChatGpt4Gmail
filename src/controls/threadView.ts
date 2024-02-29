import * as InboxSDK from '@inboxsdk/core';
import Menu from '../menu/menu';
import { SideBarWidget } from '../widgets/sidebar-widget';
import { CONTEXT } from './sidebar';

export const composeThreadView  = (threadView: InboxSDK.ThreadView) =>{
    SideBarWidget(CONTEXT.THREAD, Menu.MENU_TYPE.NAVIGATION_MAIN, true);
}



