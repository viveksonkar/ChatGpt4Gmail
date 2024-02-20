import * as InboxSDK from '@inboxsdk/core';
import Menu from '../menu/menu';
import { sideBar } from './sidebar';

export const composeMenuDD = ( sdk: InboxSDK.InboxSDK, composeView: InboxSDK.ComposeView) => ({
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
        <button class="btn" data-value="${option.value}">
          <img src="${option.iconUrl}" alt="${option.name}">${option.name}
        </button>
      </li>
    `).join('');

    menu.dropdown.el.innerHTML = `<ul class="compose-menu">${dropdownContent}</ul>`;

    const buttons = menu.dropdown.el.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('click', (e: any) => {
        const value = e.target.dataset.value;
        handleDropdownOption(sdk, composeView, value);
      });
    });
  }
});

export const handleDropdownOption = (sdk: InboxSDK.InboxSDK, composeView: InboxSDK.ComposeView, value: string) => {
  switch (value) {
    case Menu.MENU_TYPE.REPLY_EMAIL:
      composeView.insertTextIntoBodyAtCursor("Reply for me option selected.");
      sdk.Global.addSidebarContentPanel(sideBar()).then( sideBar => sideBar?.open());
      break;
    case Menu.MENU_TYPE.SUMMARIZE_EMAIL:
      composeView.insertTextIntoBodyAtCursor("Summarize email option selected.");
      break;
    // Add cases for other options as needed
    default:
      break;
  }
}
export default composeMenuDD;
