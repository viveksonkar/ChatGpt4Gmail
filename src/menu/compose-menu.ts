import * as InboxSDK from '@inboxsdk/core';
import Menu from './menu';
import { GLOBAL } from '../utils/global-data';
import { publishNewMenu } from '../components/publish-sidebar-configs';

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
  publishNewMenu(value, true);
}

export default composeMenuDD;
