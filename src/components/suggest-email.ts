import { cmpDivider } from "../controls/divider";
import { heading } from "../controls/heading";
import { cgPrompt } from "../controls/prompt";
import { cgApi } from "../integrations/cg.api";
import { GLOBAL } from "../utils/global-data";
import { htmlFormatting } from "../utils/library-fn";
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

  el.appendChild(heading('Suggest Reply'));
  el.appendChild(cmpDivider("0 0 16px 0"));

  const form = document.createElement('form');
  form.classList.add('animate__animated');
  form.classList.add('animate__fadeIn');
  
  form.appendChild(cgPrompt("Prompt", undefined, 'cg-prompt'));
  form.appendChild(cmpActionBarSingle('Suggest'));
  el.appendChild(form);
  
  const responseEl = document.createElement('div');
  const response = document.createElement('div');
  response.classList.add('response');
  response.classList.add('animate__animated');
  response.classList.add('animate__fadeIn');

  responseEl.appendChild(response);

  const actionBar = cmpActionBar('Main menu', 'Back', sucessHandler, backHandler)
  responseEl.appendChild(actionBar);
  el.appendChild(responseEl);

  form.addEventListener('submit', (ev: SubmitEvent) => {
    ev.preventDefault();
    const formData = new FormData(form);
    const prompt = formData.get('prompt');

    let userMessage = `Suggest me what to reply for the below email `;
    if(prompt) {
      userMessage = userMessage.concat(` and ${prompt}`)
    }

    if(GLOBAL.messageView) {
      userMessage = userMessage.concat(` - ${GLOBAL.messageView.getBodyElement().innerText}`);
    }

    console.log(`[SuggestEmail: payload to cg: ${userMessage}]`);
    
    cgApi(`Generate a reply email`, userMessage).then( apiResponse => {
      form.style.display = 'none';
      responseEl.style.display = 'block';
      response.innerHTML = htmlFormatting(apiResponse);
      GLOBAL.response = apiResponse;
    }).catch( (error) => {
      response.innerHTML = `${JSON.stringify(error)}`;
    });
  });

  setDefaultState();

  return el;
}
