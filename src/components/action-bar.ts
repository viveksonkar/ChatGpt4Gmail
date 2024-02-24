import { cmpButton } from "../controls/button";

export const cmpActionBar = (
  primaryText: string, 
  secondaryText: string,
  primaryCb: ($event: any) => void = () => {},
  secondaryCb: ($event: any) => void = () => {}
  ) => {
  const actionWrapperEl = document.createElement('div');
  const actionBar = document.createElement('div');
  actionBar.classList.add('action-bar');
  actionBar.classList.add('dflex');
  actionBar.classList.add('dflex-right');
  actionBar.appendChild(cmpButton(primaryText, 'SECONDARY', undefined, false, primaryCb));
  actionBar.appendChild(cmpButton(secondaryText, 'PRIMARY', undefined, false, secondaryCb));
  actionWrapperEl.appendChild(actionBar);
  return actionWrapperEl;
}