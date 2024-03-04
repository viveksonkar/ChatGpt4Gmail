import Menu, { MenuItem } from "./menu";
import { handleDropdownOption } from "./compose-menu";
import { CONTEXT } from "../controls/sidebar";

export const NavigationMain = (context: CONTEXT, responseCb: (response: string) => void): HTMLDivElement => {
  const menuMap: Record<CONTEXT, Array<MenuItem>> = {
    [CONTEXT.COMPOSE]: Menu.getComposeMenu(),
    [CONTEXT.HOME]: Menu.getGlobalMenu(),
    [CONTEXT.THREAD]: Menu.getAllMenu()
  }
  const menuHtml = menuMap[context].map(option => `
    <li>
      <button class="main-nav-item animate__animated animate__bounceInUp animate__faster" data-value="${option.value}">
        <img src="${option.iconUrl}" alt="${option.name}">${option.name}
      </button>
    </li>
  `).join('');
  const rootEl = document.createElement('div');
  const menuList = document.createElement('ul');
  menuList.classList.add('main-nav')
  menuList.innerHTML = menuHtml;
  rootEl.appendChild(menuList);

  const buttons = rootEl.querySelectorAll('.main-nav-item');
    buttons.forEach(button => {
      button.addEventListener('click', (e: any) => {
        const value = e.target.dataset.value;
        handleDropdownOption(value);
      });
    });

  return rootEl;
}