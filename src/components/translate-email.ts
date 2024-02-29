import { cmpDivider } from "../controls/divider";
import { heading } from "../controls/heading";
import { cmplanguageDropDown } from "../controls/languageDropDown";
import { cgApi } from "../integrations/cg.api";
import { GLOBAL } from "../utils/global-data";
import { cmpActionBarSingle } from "./action-bar-single";
import { loader } from "./loader";

export const TranslateEmail = (responseCb: (response: string) => void): HTMLDivElement => {
  
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
  el.appendChild(heading('Translate Email'));
  el.appendChild(cmpDivider("0 0 16px 0"));

  const form = document.createElement("form");
  form.appendChild(cmplanguageDropDown( 'English', 'cg-language'));

  form.appendChild(cmpActionBarSingle('Translate'));
  el.appendChild(form);

  const loadingEl = loader();
  el.appendChild(loadingEl);

  const responseEl = document.createElement('div');
  const response = document.createElement('div');
  responseEl.appendChild(response);
  responseEl.appendChild(cmpActionBarSingle('Back', backHandler));
  el.appendChild(responseEl);

  form.addEventListener('submit', (ev: SubmitEvent) => {
    ev.preventDefault();
    const formData = new FormData(form);
    const prompt = formData.get('prompt');

    let userMessage = `Summarize the email below `;
    if(prompt) {
      userMessage = userMessage.concat(` and ${prompt}`)
    }

    if(GLOBAL.messageView) {
      userMessage = userMessage.concat(` - ${GLOBAL.messageView.getBodyElement()}`);
    }

    cgApi(`This this email from gmail`, userMessage).then( apiResponse => {
      form.style.display = 'none';
      responseEl.style.display = 'block';
      response.innerHTML = apiResponse;
      GLOBAL.response = apiResponse;
    }).catch( (error) => {
      response.innerHTML = `${JSON.stringify(error)}`;
    }).finally(() => {
      loadingEl.style.display = 'none';
    });
  });

  setDefaultState();

  return el;
}