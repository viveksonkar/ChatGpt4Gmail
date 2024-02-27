import { cmpButton } from "../controls/button";
import { cmpDivider } from "../controls/divider";
import { cmpDropDown } from "../controls/dropdown";
import { cmpTone } from "../controls/tone";
import { cgApi } from "../integrations/cg.api";
import { cmpActionBar } from "./action-bar";
import { GLOBAL } from "../utils/global-data";
import { loader } from "./loader";
import { cgPrompt } from "../controls/prompt";

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
      GLOBAL.composeView?.insertTextIntoBodyAtCursor(GLOBAL.response);
      GLOBAL.contentPanelRef?.close();
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
    loadingEl.style.display = 'none';
    responseEl.style.display = 'none';
  }

  const el = document.createElement('div');
  let ddOptions = writeEmailTypeOptions.map( ({label, content}) => ({label, content}));

  const heading = document.createElement("h3");
  heading.classList.add('heading-title')
  heading.innerText = 'Write Email';
  el.appendChild(heading);
  el.appendChild(cmpDivider("0 0 16px 0"));
  const form = document.createElement("form");
  form.appendChild(cmpDropDown("Email Type", ddOptions, 'SALES', 'cg-email-type'));
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
  el.appendChild(form);

  const loadingEl = loader();
  el.appendChild(loadingEl);

  const responseEl = document.createElement('div');
  const response = document.createElement('div');
  response.classList.add('response');
  responseEl.appendChild(response);
  const actionBar = cmpActionBar('Create Draft', 'Back', successHandler, backHandler)
  responseEl.appendChild(actionBar);

  el.appendChild(responseEl);

  form.addEventListener('submit', (ev: SubmitEvent) => {
    ev.preventDefault();
    form.style.display = 'none';
    loadingEl.style.display = 'block';

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

    cgApi(`Generate a email based on user content`, userMessage).then( apiResponse => {
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