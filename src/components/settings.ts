export const Settings = (responseCb: (response: string) => void): HTMLDivElement => {
  const el = document.createElement('div');
  el.innerText = 'Settings';
  return el;
}