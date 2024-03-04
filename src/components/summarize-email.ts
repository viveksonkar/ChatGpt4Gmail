import { cmpDivider } from "../controls/divider";
import { heading } from "../controls/heading";
import { cgPrompt } from "../controls/prompt";
import { cgApi } from "../integrations/cg.api";
import { GLOBAL } from "../utils/global-data";
import { htmlFormatting } from "../utils/library-fn";
import { cmpActionBarSingle } from "./action-bar-single";

export const SummarizeEmail = (responseCb: (response: string) => void): HTMLDivElement => {
 
  const setDefaultState = () => {
    form.style.display = 'block';
    responseEl.style.display = 'none';
  }

  const sucessHandler = (btnEv: MouseEvent) => {
    responseCb(GLOBAL.response);
  }

  const backHandler = (btnEv: MouseEvent) => {
    setDefaultState();
  }
 
  const el = document.createElement('div');
  el.appendChild(heading('Summarize Email'));
  el.appendChild(cmpDivider("0 0 16px 0"));

  const form = document.createElement('form');
  form.appendChild(cgPrompt("Prompt", undefined, 'cg-prompt'));
  form.appendChild(cmpActionBarSingle('Generate'));
  el.appendChild(form);
  
  const responseEl = document.createElement('div');
  const response = document.createElement('div');
  responseEl.appendChild(response);
  const actionBar = cmpActionBarSingle('Back', backHandler)
  responseEl.appendChild(actionBar);
  el.appendChild(responseEl);

  form.addEventListener('submit', (ev: SubmitEvent) => {
    ev.preventDefault();
    GLOBAL.loader$.next(true);
    const formData = new FormData(form);
    const prompt = formData.get('prompt');

    let userMessage = `Summarize the email below `;
    if(prompt) {
      userMessage = userMessage.concat(` and ${prompt}`)
    }

    if(GLOBAL.messageView) {
      userMessage = userMessage.concat(` - ${GLOBAL.messageView.getBodyElement().innerText}`);
    }

    console.log(`[SummarizeEmail: payload to cg: ${userMessage}]`);

    cgApi(`This email from gmail`, userMessage).then( apiResponse => {
      form.style.display = 'none';
      responseEl.style.display = 'block';
      response.innerHTML = htmlFormatting(apiResponse);;
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