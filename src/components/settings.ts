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

  const apiUpdateButton = document.createElement('button');
  apiUpdateButton.type = 'submit';
  apiUpdateButton.innerHTML = 'Update';
  apiUpdateButton.classList.add('upbtn');
  keyForm.appendChild(apiUpdateButton);

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

  const licenseUpdateButton = document.createElement('button');
  licenseUpdateButton.type = 'submit';
  licenseUpdateButton.innerHTML = 'Update';
  licenseUpdateButton.classList.add('upbtn');
  keyForm.appendChild(apiUpdateButton);
  licenseForm.appendChild(licenseUpdateButton);
  
  const selectDiv = document.createElement('div');
  selectDiv.style.marginTop = '20px';
  selectDiv.appendChild(cmpDropDown('Select Model', option, 'label1'));
  const resetLabel = document.createElement("label");
  resetLabel.innerHTML = 'Click to reset counter(Testing Mode)';

  const resetButton = document.createElement('button');
  resetButton.type = 'submit';
  resetButton.innerHTML = 'Reset Counter';
  resetButton.classList.add('upbtn');

  selectDiv.appendChild(resetLabel);
  selectDiv.appendChild(resetButton);
  
 
  el.appendChild(keyForm);
  el.appendChild(licenseForm);
  el.appendChild(selectDiv);
  return el;
}