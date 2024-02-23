export const Activation = (responseCb: (response: string) => void): HTMLDivElement => {
  const el = document.createElement('div');
  el.innerText = 'Activation';
  return el;
}