import { cgPrompt } from "../controls/prompt";

export const ReplyEmail = (responseCb: (response: string) => void): HTMLDivElement => {
  const el = document.createElement('div');
  el.innerText = 'ReplyEmail';
  el.appendChild(cgPrompt())
  return el;
}