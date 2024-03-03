import { cmpDivider } from "../controls/divider";
import { heading } from "../controls/heading";
import { cgPrompt } from "../controls/prompt";
import { cgApi } from "../integrations/cg.api";
import { GLOBAL } from "../utils/global-data";
import { cmpActionBar } from "./action-bar";
import { cmpActionBarSingle } from "./action-bar-single";

export const SuggestEmail = (responseCb: (response: string) => void): HTMLDivElement => {
  
  const sucessHandler = (btnEv: MouseEvent) => {
    responseCb(GLOBAL.response);
  }

  const backHandler = (btnEv: MouseEvent) => {
    setDefaultState();
  }

  const setDefaultState = () => {
    form.style.display = 'block';
    responseEl.style.display = 'none';
  }

  const el = document.createElement('div');

  el.appendChild(heading('Suggest Email'));
  el.appendChild(cmpDivider("0 0 16px 0"));

  const form = document.createElement('form');
  form.appendChild(cgPrompt("Prompt", undefined, 'cg-prompt'));
  form.appendChild(cmpActionBarSingle('Suggest'));
  el.appendChild(form);
  
  const responseEl = document.createElement('div');
  const response = document.createElement('div');
  responseEl.appendChild(response);

  const actionBar = cmpActionBar('Main menu', 'Back', sucessHandler, backHandler)
  responseEl.appendChild(actionBar);

  form.addEventListener('submit', (ev: SubmitEvent) => {
    ev.preventDefault();
    GLOBAL.loader$.next(true);
    const formData = new FormData(form);
    const prompt = formData.get('prompt');

    let userMessage = `Suggest me what to reply for the below email `;
    if(prompt) {
      userMessage = userMessage.concat(` and ${prompt}`)
    }

    if(GLOBAL.messageView) {
      userMessage = userMessage.concat(` - ${GLOBAL.messageView.getBodyElement()}`);
    }

    cgApi(`Generate a reply email`, userMessage).then( apiResponse => {
      form.style.display = 'none';
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
