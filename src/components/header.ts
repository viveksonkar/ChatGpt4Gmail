import { settingIcon } from "../controls/setting-icon";
import Menu from "../menu/menu";
import { GLOBAL } from "../utils/global-data";

/** 
 <div class="header dflex dflex-between dflex-vcenter">
    <div class="dflex header-toggle">
      <div class="header-back">&larr;</div>
      <div class="header-logo">ChatGpt4Gmail</div>
    </div>
    <div class="header-setting">
      ${ settingIcon().outerHTML}
    </div>
  </div> 
*/
export const header = () => {

  const header = document.createElement('div');
  header.classList.add('header');
  header.classList.add('dflex');
  header.classList.add('dflex-between');
  header.classList.add('dflex-vcenter');

  const headerToggle = document.createElement('div');
  headerToggle.classList.add('dflex');
  headerToggle.classList.add('header-toggle');

  const headerBack = document.createElement('div');
  headerBack.classList.add('header-back');
  headerBack.innerHTML = `&larr;`;

  const headerLogo = document.createElement('div');
  headerLogo.innerHTML = `ChatGpt4Gmail`;

  headerToggle.appendChild(headerBack);
  headerToggle.appendChild(headerLogo);

  header.appendChild(headerToggle);

  const headerSetting = document.createElement('div');
  headerSetting.classList.add('header-setting');
  headerSetting.appendChild(settingIcon());

  header.appendChild(headerSetting);

  headerSetting.addEventListener('click', (ev: MouseEvent) => {
    if(Menu.MENU_TYPE.SETTINGS !== GLOBAL.sideBarConfigs$.value.menu){
      GLOBAL.sideBarConfigs$.next({
        ...GLOBAL.sideBarConfigs$.value,
        menu: Menu.MENU_TYPE.SETTINGS
      })
    } else {
      GLOBAL.sideBarConfigs$.next({
        ...GLOBAL.sideBarConfigs$.value,
        menu: Menu.MENU_TYPE.NAVIGATION_MAIN
      })
    }
    console.log(`[ CG4Gmail setting icon clicked: ${GLOBAL.sideBarConfigs$.value.menu} ]`);
  });

  headerBack.addEventListener('click', (ev: MouseEvent) => {
    GLOBAL.sideBarConfigs$.next({
      ...GLOBAL.sideBarConfigs$.value,
      menu: Menu.MENU_TYPE.NAVIGATION_MAIN
    })
  });

  GLOBAL.sideBarConfigs$.subscribe( configs => {
    headerBack.style.display = configs.menu === Menu.MENU_TYPE.NAVIGATION_MAIN ? 'none' : 'block';
  });

  return header;
}