import Menu from "../menu/menu";
import { GLOBAL } from "../utils/global-data"

export const settingIcon = () => {
  const settingImg = document.createElement('img');
  GLOBAL.sideBarConfigs$.pipe().subscribe( configs => {
    settingImg.src = configs.menu === Menu.MENU_TYPE.SETTINGS ?
    "https://chatgpt4sheets.com/cg4sheets-assets/cg4sheets-setting.svg" :
    "https://chatgpt4sheets.com/cg4sheets-assets/cg4-sheets-setting-open.svg"
  });
  return settingImg;
}