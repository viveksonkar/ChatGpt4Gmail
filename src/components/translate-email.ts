import { cmpButton } from "../controls/button";
import { cmplanguageDropDown } from "../controls/languageDropDown";
import { GLOBAL } from "../utils/global-data";
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
  
  const heading = document.createElement("h3");
  heading.classList.add('heading-title')
  heading.innerText = 'Translate Email';
  el.appendChild(heading);
  const form = document.createElement("form");
  form.appendChild(cmplanguageDropDown( 'English', 'cg-email-type'));
  const singleBtnFooter = document.createElement('div');
  singleBtnFooter.classList.add('dflex');
  singleBtnFooter.classList.add('dflex-right');
  singleBtnFooter.appendChild(cmpButton('Translate', 'PRIMARY', undefined, true));
  form.appendChild(singleBtnFooter);
  el.appendChild(form);

  const loadingEl = loader();
  el.appendChild(loadingEl);
  const responseEl = document.createElement('div');

  return el;
}