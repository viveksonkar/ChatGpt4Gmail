export const loader = () => {
  const root = document.createElement('div');
  root.classList.add('cg-loader');
  const loader = document.createElement('img');
  loader.src = "https://chatgpt4sheets.com/cg4sheets-assets/cg4sheets-loader.png";
  loader.classList.add('rotating');
  root.appendChild(loader);
  return root;
}