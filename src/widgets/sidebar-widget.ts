import { CONTEXT, SideBarConfig, sideBar } from "../controls/sidebar";
import Menu from "../menu/menu";
import { GLOBAL } from '../utils/global-data';

export const SideBarWidget = (context: CONTEXT,
  menu: string,
  isDefaultOpen: boolean = false,
  onClose: () => void = () => {} ) => {

    GLOBAL.activeMenu = menu;
    GLOBAL.context = context;

    const onCloseHandler = () => {
      GLOBAL.contentPanelRef?.close();
      onClose();
    };

    const onSubmitHandler = (context: CONTEXT) => {
      console.log("This is working SUBMIT HANDLER ")
    };

    const onSettingHandler = (isOpen: boolean) => {
      GLOBAL.sideBarConfigs$.next({
        ...sidebarConfig, 
        menu: isOpen ? Menu.MENU_TYPE.SETTINGS : Menu.MENU_TYPE.NAVIGATION_MAIN,
        isDefaultOpen: true
      })
    }

    const onBackHandler = () => {
      GLOBAL.sideBarConfigs$.next({
        ...sidebarConfig, 
        menu: Menu.MENU_TYPE.NAVIGATION_MAIN,
        isDefaultOpen: true
      })
    }

    const addSidebarContentPanel = () => {
      GLOBAL.sdk?.Global.addSidebarContentPanel(sideBar()).then( contentPanel => {
        GLOBAL.contentPanelRef = contentPanel; // adding new panel
        if(sidebarConfig.isDefaultOpen && GLOBAL.contentPanelRef) {
          GLOBAL.contentPanelRef.open();
        }
      });
    }

    let sidebarConfig: SideBarConfig = {
      context: context,
      menu: menu,
      isDefaultOpen: isDefaultOpen,
      onClose: onCloseHandler,
      onSubmit: onSubmitHandler,
      onSetting: onSettingHandler,
      onBack: onBackHandler
    }

    GLOBAL.sideBarConfigs$.next(sidebarConfig);

    // ensuring that only once it is added.
    if(!GLOBAL.contentPanelRef) {
      addSidebarContentPanel();
    }
}