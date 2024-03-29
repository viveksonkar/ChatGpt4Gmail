import { cmpButton } from "../controls/button";
import { cmpDivider } from "../controls/divider";
import { cmpDropDown } from "../controls/dropdown";
import { cmpTone } from "../controls/tone";
import { cgApi } from "../integrations/cg.api";
import { cmpActionBar } from "./action-bar";
import { GLOBAL } from "../utils/global-data";
import { cgPrompt } from "../controls/prompt";
import { heading } from "../controls/heading";
import { extractSubjectAndBody, htmlFormatting } from "../utils/library-fn";

export const writeEmailTypeOptions = [
  { label: 'Sales', content: 'SALES', command: 'Write a sales email' },
  { label: 'Promotion', content: 'PROMOTION', command: 'Write a promotional email' },
  { label: 'Custom', content: 'Custom', command: 'Write a email for ' },
];

export const WriteEmail = (responseCb: (response: string) => void): HTMLDivElement => {

  const successHandler = (btnEv: MouseEvent) => {
    console.log("Write Email sucess handler called")
    GLOBAL.sdk?.Compose.openNewComposeView().then( composeView => {
      GLOBAL.composeView = composeView;
      const emailData = extractSubjectAndBody(GLOBAL.response);
      if(emailData && emailData.subject && emailData.body) {
        GLOBAL.composeView.setSubject(emailData.subject);
        GLOBAL.composeView?.insertTextIntoBodyAtCursor(emailData.body);
      } else {
        GLOBAL.composeView?.insertTextIntoBodyAtCursor(GLOBAL.response);
      }
    }).catch( error => {
      GLOBAL.error = `Failed to create new message`;
    });
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

  let ddOptions = writeEmailTypeOptions.map( ({label, content}) => ({label, content}));

  el.appendChild(heading('Write Email'));
  el.appendChild(cmpDivider("0 0 16px 0"));
  const form = document.createElement("form");
  form.appendChild(cmpDropDown("Email Type", 'email-type', ddOptions, 'SALES', 'cg-email-type'));
  form.appendChild(cmpDivider("0 0 16px 0"));
  form.appendChild(cgPrompt("Prompt", undefined, 'cg-prompt'))
  form.appendChild(cmpDivider("0 0 16px 0"));
  form.appendChild(cmpTone());
  form.appendChild(cmpDivider("0 0 16px 0"));

  const singleBtnFooter = document.createElement('div');
  singleBtnFooter.classList.add('dflex');
  singleBtnFooter.classList.add('dflex-right');
  singleBtnFooter.appendChild(cmpButton('Generate', 'PRIMARY', undefined, true));
  form.appendChild(singleBtnFooter);
  form.classList.add('animate__animated');
  form.classList.add('animate__fadeIn');

  el.appendChild(form);

  const responseEl = document.createElement('div');
  const response = document.createElement('div');
  response.classList.add('response');
  response.classList.add('animate__animated');
  response.classList.add('animate__fadeIn');
  responseEl.appendChild(response);
  const actionBar = cmpActionBar('Create Draft', 'Back', successHandler, backHandler)
  responseEl.appendChild(actionBar);

  el.appendChild(responseEl);

  form.addEventListener('submit', (ev: SubmitEvent) => {
    ev.preventDefault();
    form.style.display = 'none';

    const formData = new FormData(form); //this will return values from form for element using name attribute
    const emailType = formData.get('email-type');
    const prompt = formData.get('prompt');
    const tone = formData.get('tone');

    console.log(`EmailType: ${formData.get('email-type')} : PROMPT: ${formData.get('prompt')} : Tone: ${formData.get('tone')}` );
    response.innerHTML = `${emailType} : ${prompt} : ${tone}: ${formData.get('tone')} : ${JSON.stringify(formData)}`;

    let userMessage = `Write a ${emailType} for ${prompt}`;
    // TODO - need to see how to get list of tone
    if(tone) {
      userMessage = userMessage.concat(`and keep the tone to be ${tone}`)
    }

    console.log(`[WriteEmail: payload to cg: ${userMessage}]`);

    cgApi(`Generate a email based on user content`, userMessage).then( apiResponse => {
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