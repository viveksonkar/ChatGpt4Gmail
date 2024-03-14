export const footer = (plan: string = 'Free') => {
  const footerEl = document.createElement('div');
  footerEl.classList.add('footer');
  footerEl.classList.add('dflex');
  footerEl.classList.add('dflex-between');
  footerEl.innerHTML = `
    <div><span>Plan: <span>${plan}</div>
    <div class="dflex">
      <a href="https://gworks.ai/support/" target="_blank">Support</a>
      <div class="ml-8">|</div>
      <a href="https://gworks.ai/support/" target="_blank" class="ml-8">Contact</a>
    </div>
  `;
  return footerEl;
}