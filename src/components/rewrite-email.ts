import { cmpDivider } from "../controls/divider";
import { heading } from "../controls/heading";
import { cgPrompt } from "../controls/prompt";
import { cmpRadio } from "../controls/radio";
import { cgApi } from "../integrations/cg.api";
import { GLOBAL } from "../utils/global-data";
import { cmpActionBar } from "./action-bar";
import { cmpActionBarSingle } from "./action-bar-single";

export const reWriteEmailOptions = [
  { label: 'Rephrase', content: 'REPHRASE', value:'rephrase' },
  { label: 'Spellcheck', content: 'SPELLCHECK', value: 'spellcheck' },
]

export const RewriteEmail = (responseCb: (response: string) => void): HTMLDivElement => {
  
  const successHandler = (btnEv: MouseEvent) => {
    responseCb(GLOBAL.response);
    if(GLOBAL.composeView) {
      GLOBAL.composeView.setBodyHTML(GLOBAL.response);
    }
  }

  const backHandler = (btnEv: MouseEvent) => {
    setDefaultState();
  }

  const setDefaultState = () => {
    form.style.display = 'block';
    responseEl.style.display = 'none';
  }
  
  const el = document.createElement('div');
  let radioOptions = reWriteEmailOptions.map(
    ({label, content,value}) => ({label, content, value})
  )

  el.appendChild(heading('Re-Write Email'));
  el.appendChild(cmpDivider("0 0 16px 0"));

  const form = document.createElement("form");
  form.appendChild(cmpRadio(radioOptions, 'rephrase', 'rewrite'));
  form.appendChild(cgPrompt("Prompt", undefined, 'cg-prompt'));
  form.appendChild(cmpActionBarSingle('Rewrite'));

  el.appendChild(form);

  const responseEl = document.createElement('div');
  const response = document.createElement('div');
  responseEl.appendChild(response);
  const actionBar = cmpActionBar('Rewrite', 'Back', successHandler, backHandler)
  responseEl.appendChild(actionBar);
  el.appendChild(responseEl);

  form.addEventListener('submit', (ev: SubmitEvent) => {
    ev.preventDefault();
    form.style.display = 'none';
    GLOBAL.loader$.next(true);

    const formData = new FormData(form); //this will return values from form for element using name attribute
    const rewriteOption = formData.get('rewrite');
    const prompt = formData.get('prompt');

    let userMessage = `${rewriteOption}`;
    if(prompt) {
      userMessage = userMessage.concat(` and ${prompt}`)
    }
    if(GLOBAL.messageView) {
      userMessage = userMessage.concat(` - ${GLOBAL.messageView.getBodyElement()}`)
    }

    cgApi(``, userMessage).then( apiResponse => {
      responseEl.style.display = 'block';
      response.innerHTML = apiResponse;
      GLOBAL.response = apiResponse;
    }).catch( (error) => {
      response.innerHTML = `${JSON.stringify(error)}`;
    }).finally(() => {
      GLOBAL.loader$.next(false);
    });
  });

  setDefaultState();

  return el;
}