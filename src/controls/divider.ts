export const cmpDivider = (margin: string) => {
  const el = document.createElement('div');
  el.classList.add('divider');
  el.style.margin = margin;
  return el;
}