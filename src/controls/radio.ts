import { cmpDivider } from "./divider";

export interface Option {
    label: string;
    content: string;
    value: string;
  }

  export const cmpRadio = (options: Array<Option>, selected: string, name: string = 'cg-radio', id: string = 'cg-radio-group'): HTMLDivElement => {
    let radioGroupNode: HTMLDivElement = document.createElement('div');
    radioGroupNode.classList.add('cg-radio-group');
    radioGroupNode.id = id;
  
    options.forEach(option => {
      let radioContainer = document.createElement('div');
  
      let radioInput = document.createElement('input');
      radioInput.type = 'radio';
      radioInput.name = name;
      radioInput.value = option.value;
      radioInput.checked = option.value === selected;
      radioInput.style.marginRight = "14px";

  
      let radioLabel = document.createElement('label');
      radioLabel.textContent = option.label;
  
      radioContainer.appendChild(radioInput);
      radioContainer.appendChild(radioLabel);
  
      radioGroupNode.appendChild(radioContainer);
      radioGroupNode.appendChild(cmpDivider("0 0 8px 0"));
    });
  
    return radioGroupNode;
  };
  