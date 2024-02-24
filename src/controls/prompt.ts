import { cmpDivider } from "./divider";

export const cgPrompt = (
    title: string = 'For', 
    text: string = 'Enter the details for the email to generate', 
    onChange: ($event: any) => void = () => {}
  ): HTMLDivElement => {
  
    const root = document.createElement('div');
    const prompt = `
      <div class="">
        <label>${title}</label>
        ${cmpDivider("0 0 8px 0").outerHTML}
        <textarea id="cgPrompt" class="cgPrompt"></textarea>
      </div>
    `;
    root.innerHTML = prompt;
    const textArea = root.querySelector('.cgPrompt');
    textArea?.addEventListener('keyup', onChange)
  return root;
}