import { CONTEXT, SideBarConfig, sideBar } from "../controls/sidebar";
import { GLOBAL } from '../utils/global-data';

export const SideBarWidget = (context: CONTEXT,
  menu: string,
  isDefaultOpen: boolean = false,
  onClose: () => void = () => {} ) => {

  const onCloseHandler = () => {
    GLOBAL.contentPanelRef?.close();
    onClose();
  };
  const onSubmitHandler = (context: CONTEXT) => {
    console.log("This is working SUBMIT HANDLER ")
  };

  let sidebarConfig: SideBarConfig = {
    context: context,
    menu: menu,
    onClose: onCloseHandler,
    onSubmit: onSubmitHandler
  }

  GLOBAL.sdk?.Global.addSidebarContentPanel(sideBar(sidebarConfig)).then( contentPanel => {
    if(GLOBAL.contentPanelRef) {
      GLOBAL.contentPanelRef.close(); //closing previous panel
    }
    GLOBAL.contentPanelRef = contentPanel; // adding new panel
    if(isDefaultOpen && GLOBAL.contentPanelRef) {
      GLOBAL.contentPanelRef.open();
    }
  });
}