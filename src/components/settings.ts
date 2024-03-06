import { cmpButton } from "../controls/button";
import { cmpDropDown } from "../controls/dropdown";

export const option = [
  { label: 'Option1', content: 'Content1'},
  { label: 'Option2', content: 'Content2'},
]



export const Settings = (responseCb: (response: string) => void): HTMLDivElement => {

  const el = document.createElement('div');
  const keyForm = document.createElement('form');

  var apiLabel = document.createElement("label");
  apiLabel.innerHTML = "Chat GPT Api Key";
  apiLabel.classList.add('cg-label');
  keyForm.appendChild(apiLabel);
  const apiKeyInput = document.createElement('input');
  apiKeyInput.classList.add('cg-input');
  apiKeyInput.placeholder = 'Enter API Key';
  keyForm.appendChild(apiKeyInput);
  keyForm.appendChild(cmpButton('Update', 'PRIMARY', undefined, true));

  const licenseForm = document.createElement('form');
  licenseForm.style.marginTop = '20px';
  var licenseLabel = document.createElement("label");
  licenseLabel.innerHTML = "License Key";
  licenseLabel.classList.add('cg-label')
  licenseForm.appendChild(licenseLabel);

  const licenseKeyInput = document.createElement('input');
  licenseKeyInput.classList.add('cg-input');
  licenseKeyInput.placeholder = 'Enter license Key';
  licenseForm.appendChild(licenseKeyInput);
  licenseForm.appendChild(cmpButton('Update', 'PRIMARY', undefined, true));

  const selectDiv = document.createElement('div');
  selectDiv.style.marginTop = '20px';
  selectDiv.appendChild(cmpDropDown('Select Model', option, 'label1'));
  selectDiv.appendChild(cmpButton('Reset Counter', 'PRIMARY', undefined, true));
  const resetLabel = document.createElement("div");
  resetLabel.innerHTML = 'Click to reset counter(Testing Mode)';
  selectDiv.appendChild(resetLabel);
 
  el.appendChild(keyForm);
  el.appendChild(licenseForm);
  el.appendChild(selectDiv);
  return el;
}