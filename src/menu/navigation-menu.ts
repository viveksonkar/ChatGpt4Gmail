import Menu from "./menu";
import { handleDropdownOption } from "./compose-menu";

export const NavigationMain = (responseCb: (response: string) => void): HTMLDivElement => {
  const menuHtml = Menu.getAllMenu().map(option => `
    <li>
      <button class="main-nav-item" data-value="${option.value}">
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