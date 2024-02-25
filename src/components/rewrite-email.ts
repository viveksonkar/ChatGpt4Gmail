import { cmpButton } from "../controls/button";
import { cgPrompt } from "../controls/prompt";
import { cmpRadio } from "../controls/radio";
import { GLOBAL } from "../utils/global-data";
import { loader } from "./loader";

export const reWriteEmailOptions = [
  { label: 'Rephrase', content: 'REPHRASE', value:'rephrase' },
  { label: 'Spellcheck', content: 'SPELLCHECK', value: 'spellcheck' },
]

export const RewriteEmail = (responseCb: (response: string) => void): HTMLDivElement => {
  
  const sucessHandler = (btnEv: MouseEvent) => {
    responseCb(GLOBAL.response);
  }

  const backHandler = (btnEv: MouseEvent) => {
    setDefaultState();
  }

  const setDefaultState = () => {
    form.style.display = 'block';
    loadingEl.style.display = 'none';
    responseEl.style.display = 'none';
  }
  
  const el = document.createElement('div');
  let radioOptions = reWriteEmailOptions.map(
    ({label, content,value}) => ({label, content, value})
  )

  const heading = document.createElement("h3");
  heading.classList.add('heading-title')
  heading.innerText = 'Re-Write Email';
  el.appendChild(heading);

  const form = document.createElement("form");
  form.appendChild(cmpRadio(radioOptions, 'rephrase', 'cg-email-type'));
  form.appendChild(cgPrompt("Prompt", undefined, 'cg-prompt'));
  const singleBtnFooter = document.createElement('div');
  singleBtnFooter.classList.add('dflex');
  singleBtnFooter.classList.add('dflex-right');
  singleBtnFooter.appendChild(cmpButton('Rewrite', 'PRIMARY', undefined, true));
  form.appendChild(singleBtnFooter);

  el.appendChild(form);

  const loadingEl = loader();
  el.appendChild(loadingEl);

  const responseEl = document.createElement('div');

  return el;
}