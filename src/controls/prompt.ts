export const cgPrompt = (title: string = 'For', 
  text: string = 'Enter the details for the email to generate', 
  onChange: ($event: any) => void = () => {}): HTMLDivElement => {
  const wrapper = document.createElement('div');
  wrapper.id = 'cg-prompt-wrapper';
  const label = document.createElement('label');
  label.textContent = title;
  label.id = "label-cgPrompt";
  label.textContent = text;
  const textArea = document.createElement('textarea');
  textArea.id = 'cgPrompt';
  textArea.addEventListener('keyup', onChange)
  wrapper.appendChild(label);
  wrapper.appendChild(textArea);
  return wrapper;
}