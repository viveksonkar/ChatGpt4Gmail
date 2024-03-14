import { combineLatest } from "rxjs";
import { cmpButton } from "../controls/button";
import { cmpDropDown } from "../controls/dropdown";
import { CG_API_KEY, LICENSE_KEY, SELECTED_CG_MODEL } from "../utils/storage-constants";
import { GLOBAL } from "../utils/global-data";
import { cmpDivider } from "../controls/divider";
import { heading } from "../controls/heading";

export const gptModels = [
  { content: 'gpt-3.5-turbo', label: '3.5 Turbo'},
  { content: 'davinci', label: 'Davinci'},
  { content: 'curie', label: 'Curie'},
  { content: 'babbage', label: 'Babbage'},
  { content: 'ada', label: 'Ada'}
];

export const Settings = (responseCb: (response: string) => void): HTMLDivElement => {

  const el = document.createElement('div');
  el.appendChild(heading('Re-Write Email'));
  el.appendChild(cmpDivider("0 0 16px 0"));
  
  const keyForm = document.createElement('form');
  var apiLabel = document.createElement("label");
  apiLabel.innerHTML = "Chat GPT Api Key";
  apiLabel.classList.add('cg-label');
  keyForm.appendChild(apiLabel);
  keyForm.appendChild(cmpDivider("0 0 8px 0"));
  const apiKeyInput = document.createElement('input');
  apiKeyInput.classList.add('cg-input');
  apiKeyInput.name = 'cgApiKey';
  apiKeyInput.placeholder = 'Enter API Key';
  keyForm.appendChild(apiKeyInput);
  keyForm.appendChild(cmpDivider("0 0 8px 0"));
  keyForm.appendChild(cmpButton('Update', 'PRIMARY', undefined, true));
  keyForm.classList.add('animate__animated');
  keyForm.classList.add('animate__fadeIn');

  keyForm.addEventListener('submit', (ev: SubmitEvent) => {
    ev.preventDefault();
    const formData = new FormData(keyForm);
    const cgApiKey = formData.get('cgApiKey');
    console.log("Api Key sete => ", cgApiKey);
    chrome.storage.sync.set({ [CG_API_KEY]: cgApiKey });
    GLOBAL.settingData$.next({
      ...GLOBAL.settingData$.value,
      [CG_API_KEY]: cgApiKey as string
    });
  })

  const licenseForm = document.createElement('form');
  licenseForm.classList.add('animate__animated');
  licenseForm.classList.add('animate__fadeIn');

  var licenseLabel = document.createElement("label");
  licenseLabel.innerHTML = "License Key";
  licenseLabel.classList.add('cg-label');
  licenseForm.appendChild(licenseLabel);
  licenseForm.appendChild(cmpDivider("0 0 8px 0"));
  const licenseKeyInput = document.createElement('input');
  licenseKeyInput.classList.add('cg-input');
  licenseKeyInput.placeholder = 'Enter license Key';
  licenseKeyInput.name = 'licenseKey';
  licenseForm.appendChild(licenseKeyInput);
  licenseForm.appendChild(cmpDivider("0 0 8px 0"));
  licenseForm.appendChild(cmpButton('Update', 'PRIMARY', undefined, true));

  licenseForm.addEventListener('submit', (ev: SubmitEvent) => {
    ev.preventDefault();
    const formData = new FormData(licenseForm);
    const licenseKey = formData.get('licenseKey');
    chrome.storage.sync.set({ [LICENSE_KEY]: licenseKey });
    GLOBAL.settingData$.next({
      ...GLOBAL.settingData$.value,
      [LICENSE_KEY]: licenseKey as string
    });
    console.log("licenseKey Key set => ", licenseKey);
  });


  const cgModelsForm = document.createElement('form');
  cgModelsForm.classList.add('animate__animated');
  cgModelsForm.classList.add('animate__fadeIn');
  const selectDiv = document.createElement('div');
  const dropDownCb = (ev: Event | any) => {
    ev.preventDefault();
    chrome.storage.sync.set({ [SELECTED_CG_MODEL]: ev.target.value });
    GLOBAL.settingData$.next({
      ...GLOBAL.settingData$.value,
      [SELECTED_CG_MODEL]: ev.target.value
    });
    console.log("cg-models Key set => ", ev.target.value);
  }
  let selectedModel = 'gpt-3.5-turbo';
  const cgModelsDd = cmpDropDown('Select Model', 'cg-models', gptModels, selectedModel, 'cg-models', dropDownCb );
  selectDiv.appendChild(cgModelsDd);
  cgModelsForm.appendChild(selectDiv);
 
  el.appendChild(keyForm);
  el.appendChild(cmpDivider("0 0 16px 0"))
  el.appendChild(licenseForm);
  el.appendChild(cmpDivider("0 0 16px 0"))
  el.appendChild(cgModelsForm);

  combineLatest([chrome.storage.sync.get(CG_API_KEY), 
    chrome.storage.sync.get(LICENSE_KEY), 
    chrome.storage.sync.get(SELECTED_CG_MODEL)])
    .subscribe( ([apiKeyData, licenseKeyData, cgModelData]) => {
      GLOBAL.settingData$.next({
        CG_API_KEY: apiKeyData[CG_API_KEY],
        LICENSE_KEY: licenseKeyData[LICENSE_KEY],
        SELECTED_CG_MODEL: cgModelData[SELECTED_CG_MODEL]
      });
      console.log("Setting data: => ", GLOBAL.settingData$.value)
    });
  
  GLOBAL.settingData$.subscribe( setting => {
    if(setting.LICENSE_KEY) {
      licenseKeyInput.value = setting.LICENSE_KEY;
    }
    if(setting.SELECTED_CG_MODEL) {
      selectedModel = setting.SELECTED_CG_MODEL;
    }
    if(setting.CG_API_KEY) {
      apiKeyInput.value = setting.CG_API_KEY;
    }
  });
  return el;
}