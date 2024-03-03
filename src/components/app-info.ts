import { GLOBAL } from "../utils/global-data";

export const appInfo = () => {
  const appInfo = document.createElement('div');
  appInfo.classList.add('app-info');
  appInfo.classList.add('dflex');
  appInfo.classList.add('dflex-between');

  const appInfoTitle = document.createElement('div');
  appInfoTitle.classList.add('app-info-title');
  appInfoTitle.innerHTML = `${GLOBAL.appName} ${GLOBAL.version}`;

  const appInfoClose = document.createElement('div');
  appInfoClose.classList.add('app-info-close');
  appInfoClose.innerHTML = `X`;

  appInfo.appendChild(appInfoTitle);
  appInfo.appendChild(appInfoClose);

  appInfoClose.addEventListener('click', (ev: MouseEvent) => {
    GLOBAL.contentPanelRef?.close();
    console.log("[ CG4GMAIL app closed from app infor bar]");
  })

  return appInfo;
}

    