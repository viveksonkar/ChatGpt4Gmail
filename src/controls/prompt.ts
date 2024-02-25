import { cmpDivider } from "./divider";

export const cgPrompt = (
    title: string = 'For', 
    text: string = 'Enter the details for the email to generate',
    id: string = 'cg-prompt',
    onChange: ($event: any) => void = () => {}
  ): HTMLDivElement => {
  
    const root = document.createElement('div');
    const prompt = `
      <div class="cmpPrompt">
        <label>${title}</label>
        ${cmpDivider("0 0 8px 0").outerHTML}
        <textarea id="${id}" name="prompt" class="cgPrompt-input"></textarea>
      </div>
    `;
    root.innerHTML = prompt;
    const textArea = root.querySelector('.cgPrompt');
    textArea?.addEventListener('keyup', onChange)
  return root;
}