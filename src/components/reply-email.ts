import { cmpDivider } from "../controls/divider";
import { heading } from "../controls/heading";
import { cgPrompt } from "../controls/prompt";
import { cmpTone } from "../controls/tone";
import { cgApi } from "../integrations/cg.api";
import { GLOBAL } from "../utils/global-data";
import { cmpActionBar } from "./action-bar";
import { cmpActionBarSingle } from "./action-bar-single";

export const ReplyEmail = (responseCb: (response: string) => void): HTMLDivElement => {
  
  const successHandler = (btnEv: MouseEvent) => {
    console.log("Reply Email sucess handler called");
    GLOBAL.composeView?.setBodyText(GLOBAL.response);
    responseCb(GLOBAL.response);
  }

  const backHandler = (btnEv: MouseEvent) => {
    setDefaultState();
  }
 
  const replyEmailForm = getReplyEmailForm();
    
  const setDefaultState = () => {
    replyEmailForm.style.display = 'block';
    responseEl.style.display = 'none';
  }

  const el = document.createElement('div');

  el.appendChild(heading('Reply Email'))
  el.appendChild(cmpDivider("0 0 16px 0"));
  el.appendChild(replyEmailForm);

  const responseEl = document.createElement('div');
  const response = document.createElement('div');
  response.classList.add('response');
  responseEl.appendChild(response);
  const actionBar = cmpActionBar('Create Draft', 'Back', successHandler, backHandler)
  responseEl.appendChild(actionBar);

  el.appendChild(responseEl);

  replyEmailForm.addEventListener('submit', (ev: SubmitEvent) => {
    ev.preventDefault();
    GLOBAL.loader$.next(true);
    const formData = new FormData(replyEmailForm);
    const prompt = formData.get('prompt');
    const tone = formData.get('tone');

    let userMessage = `Write a reply email `;
    if(tone) {
      userMessage = userMessage.concat(`that is ${tone}`);
    }
    if(prompt) {
      userMessage = userMessage.concat(` and ${prompt}`)
    }

    cgApi(`Generate a reply email`, userMessage).then( apiResponse => {
      replyEmailForm.style.display = 'none';
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

const getReplyEmailForm = () => {
  const form =  document.createElement('form');
  form.appendChild(cgPrompt("Prompt", undefined, 'cg-prompt'));
  form.appendChild(cmpDivider("0 0 16px 0"));
  form.appendChild(cmpTone());
  form.appendChild(cmpActionBarSingle('Generate Reply'));
  return form;
}




