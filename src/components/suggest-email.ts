import { cmpButton } from "../controls/button";
import { cgPrompt } from "../controls/prompt";
import { GLOBAL } from "../utils/global-data";
import { cmpActionBar } from "./action-bar";
import { loader } from "./loader";

export const SuggestEmail = (responseCb: (response: string) => void): HTMLDivElement => {
  
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

    const heading = document .createElement('h3');
    heading.classList.add('heading');
    heading.innerText = 'Suggest Email';
    el.appendChild(heading);

    const form = document.createElement('form');
  form.appendChild(cgPrompt("Prompt", undefined, 'cg-prompt'));

  const singleBtnFooter = document.createElement('div');
  singleBtnFooter.classList.add('dflex');
  singleBtnFooter.classList.add('dflex-right');
  singleBtnFooter.appendChild(cmpButton('Suggest', 'PRIMARY', undefined, true));
  form.appendChild(singleBtnFooter);
  el.appendChild(form);
  
  const loadingEl = loader();
  el.appendChild(loadingEl);

  const responseEl = document.createElement('div');
  const response = document.createElement('div');
  responseEl.appendChild(response);

  const actionBar = cmpActionBar('Create Draft', 'Back', sucessHandler, backHandler)
  responseEl.appendChild(actionBar);

  return el;
  }
