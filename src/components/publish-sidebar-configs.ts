import { CONTEXT } from "../controls/sidebar";
import Menu from "../menu/menu";
import { GLOBAL } from "../utils/global-data";

export const publishSidebarConfig = (context: CONTEXT, menu: string, isDefaultOpen: boolean = false) => {
  GLOBAL.sideBarConfigs$.next({
    ...GLOBAL.sideBarConfigs$.value,
    context,
    menu: GLOBAL.isActivated ? menu : Menu.MENU_TYPE.ACTIVATION, // Do not show anything else if plugin is not activated
    isDefaultOpen
  });
}

export const publishNewMenu = (menu: string) => {
  GLOBAL.sideBarConfigs$.next({
    ...GLOBAL.sideBarConfigs$.value,
    menu: GLOBAL.isActivated ? menu : Menu.MENU_TYPE.ACTIVATION, // Do not show anything else if plugin is not activated
  });
}