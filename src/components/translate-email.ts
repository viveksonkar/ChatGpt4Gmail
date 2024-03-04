import { cmpDivider } from "../controls/divider";
import { heading } from "../controls/heading";
import { cmplanguageDropDown } from "../controls/languageDropDown";
import { cgApi } from "../integrations/cg.api";
import { GLOBAL } from "../utils/global-data";
import { htmlFormatting } from "../utils/library-fn";
import { cmpActionBarSingle } from "./action-bar-single";

export const TranslateEmail = (responseCb: (response: string) => void): HTMLDivElement => {
  
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

  el.appendChild(heading('Translate Email'));
  el.appendChild(cmpDivider("0 0 16px 0"));

  const form = document.createElement("form");
  form.classList.add('animate__animated');
  form.classList.add('animate__fadeIn');
  
  form.appendChild(cmplanguageDropDown( 'English', 'cg-language'));

  form.appendChild(cmpActionBarSingle('Translate'));
  el.appendChild(form);

  const responseEl = document.createElement('div');
  const response = document.createElement('div');
  response.classList.add('response');
  response.classList.add('animate__animated');
  response.classList.add('animate__fadeIn');

  responseEl.appendChild(response);
  responseEl.appendChild(cmpActionBarSingle('Back', backHandler));
  el.appendChild(responseEl);

  form.addEventListener('submit', (ev: SubmitEvent) => {
    ev.preventDefault();
    const formData = new FormData(form);
    const language = formData.get('language');
    const prompt = formData.get('prompt');

    let userMessage = `Translate this email to ${language}`;
    if(prompt) {
      userMessage = userMessage.concat(` and ${prompt}`)
    }

    if(GLOBAL.messageView) {
      userMessage = userMessage.concat(` - ${GLOBAL.messageView.getBodyElement().innerText}`);
    }

    console.log(`[TranslateEmail: payload to cg: ${userMessage}]`);

    cgApi(`This this email from gmail`, userMessage).then( apiResponse => {
      form.style.display = 'none';
      responseEl.style.display = 'block';
      response.innerHTML = htmlFormatting(apiResponse);;
      GLOBAL.response = apiResponse;
    }).catch( (error) => {
      response.innerHTML = `${JSON.stringify(error)}`;
    });
  });

  setDefaultState();

  return el;
}