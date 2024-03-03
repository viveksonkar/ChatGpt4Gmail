export const footer = () => {
  /* <div class="footer">Footer</div> */
  const footerEl = document.createElement('div');
  footerEl.classList.add('footer');
  footerEl.innerHTML = `footer`;
  return footerEl;
}