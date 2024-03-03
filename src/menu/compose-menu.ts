import * as InboxSDK from '@inboxsdk/core';
import Menu from './menu';
import { CONTEXT } from '../controls/sidebar';
import { SideBarWidget } from '../widgets/sidebar-widget';
import { GLOBAL } from '../utils/global-data';

export const composeMenuDD = () => ({
  title: "Gworks",
  tooltip: 'Gworks',
  iconUrl: "https://lh5.googleusercontent.com/itq66nh65lfCick8cJ-OPuqZ8OUDTIxjCc25dkc4WUT1JG8XG3z6-eboCu63_uDXSqMnLRdlvQ=s128-h128-e365",
  iconClass: "gworks-compose-menu",
  //type: 'MODIFIER',
  hasDropdown: true,
  onClick(menu: InboxSDK.ComposeViewButtonOnClickEvent) {
    var isGlobal = false;
    const dropdownContent = Menu.getMenu(isGlobal).map(option => `
      <li>
        <button class="cgbtn" data-value="${option.value}">
          <img src="${option.iconUrl}" alt="${option.name}">${option.name}
        </button>
      </li>
    `).join('');

    menu.dropdown.el.innerHTML = `<ul class="compose-menu">${dropdownContent}</ul>`;

    const buttons = menu.dropdown.el.querySelectorAll('.cgbtn');
    buttons.forEach(button => {
      button.addEventListener('click', (e: any) => {
        const value = e.target.dataset.value;
        handleDropdownOption(value);
      });
    });
  }
});

export const handleDropdownOption = (value: string) => {
  /* switch (value) {
    case Menu.MENU_TYPE.NAVIGATION_MAIN:
      SideBarWidget(GLOBAL.context, Menu.MENU_TYPE.NAVIGATION_MAIN, true, addThreadSidebar);
      break;
    case Menu.MENU_TYPE.WRITE_EMAIL:
      SideBarWidget(GLOBAL.context, Menu.MENU_TYPE.WRITE_EMAIL, true, addThreadSidebar);
      break;
    case Menu.MENU_TYPE.REPLY_EMAIL:
      SideBarWidget(GLOBAL.context, Menu.MENU_TYPE.REPLY_EMAIL, true, addThreadSidebar);
      break;
    case Menu.MENU_TYPE.SUMMARIZE_EMAIL:
      SideBarWidget(GLOBAL.context, Menu.MENU_TYPE.SUMMARIZE_EMAIL, true, addThreadSidebar);
      break;
    case Menu.MENU_TYPE.REWRITE_EMAIL:
      SideBarWidget(GLOBAL.context, Menu.MENU_TYPE.REWRITE_EMAIL, true, addThreadSidebar);
      break;
    case Menu.MENU_TYPE.SUGGEST_REPLY:
      SideBarWidget(GLOBAL.context, Menu.MENU_TYPE.SUGGEST_REPLY, true, addThreadSidebar);
      break;
    case Menu.MENU_TYPE.TRANSLATE_TO:
      SideBarWidget(GLOBAL.context, Menu.MENU_TYPE.TRANSLATE_TO, true, addThreadSidebar);
      break;
    default:
      break;
  } */
  GLOBAL.sideBarConfigs$.next({
    ...GLOBAL.sideBarConfigs$.value,
    menu: value
  })
}

export const addThreadSidebar = () => SideBarWidget(GLOBAL.context, Menu.MENU_TYPE.NAVIGATION_MAIN);
export default composeMenuDD;
