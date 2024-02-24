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
  let ddOptions = writeEmailTypeOptions.map( ({label, content}) => ({label, content}));

  const heading = document.createElement("h3");
  heading.classList.add('heading-title')
  heading.innerText = 'Write Email';
  el.appendChild(heading);
  el.appendChild(cmpDivider("0 0 16px 0"));
  const form = document.createElement("form");
  form.appendChild(cmpDropDown(ddOptions, 'SALES', 'cg-email-type'));
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
  responseEl.appendChild(response);
  const actionBar = cmpActionBar('Create Draft', 'Back', sucessHandler, backHandler)
  responseEl.appendChild(actionBar);

  el.appendChild(responseEl);

  form.addEventListener('submit', (ev: SubmitEvent) => {
    ev.preventDefault();
    form.style.display = 'none';
    loadingEl.style.display = 'block';
    console.log(ev);

    const emailType = form.querySelector('#cg-email-type');
    const prompt = form.querySelector('#cg-prompt');
    const tone = form.querySelector(".cg-tone-checkbox");

    response.innerHTML = `${emailType} : ${prompt} : ${tone}`;
    responseEl.style.display = 'block';

    /* cgApi("You are gmail expert", "write a promotional email for video creation platform for Instagram, facebook in 50 words").then( apiResponse => {
      responseEl.style.display = 'block';
      response.innerHTML = apiResponse;
      GLOBAL.response = apiResponse;
    }).catch( (error) => {
      response.innerHTML = `${JSON.stringify(error)}`;
    }).finally(() => {
      loadingEl.style.display = 'none';
    }); */
  });

  setDefaultState();

  return el;
}