import { cmpButton } from "../controls/button";

export const cmpActionBarSingle = (
  primaryText: string, 
  primaryCb: ($event: any) => void = () => {},
  ) => {
  const actionWrapperEl = document.createElement('div');
  const actionBar = document.createElement('div');
  actionBar.classList.add('action-bar');
  actionBar.classList.add('dflex');
  actionBar.classList.add('dflex-right');
  actionBar.appendChild(cmpButton(primaryText, 'PRIMARY', undefined, false, primaryCb));
  actionWrapperEl.appendChild(actionBar);
  return actionWrapperEl;
}