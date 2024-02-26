import { languages } from "../utils/language";

export const cmplanguageDropDown = ( selected: string, id: string = 'cg-select' ): HTMLSelectElement => {
    let selectNode: HTMLSelectElement = document.createElement('select');
    selectNode.style.marginBottom = "20px";
    selectNode.classList.add('cg-select');
    selectNode.name = 'email-type';
    selectNode.id = id;
    languages.forEach( option => {
      let optionEl = document.createElement('option');
      optionEl.value = option;
      optionEl.selected = option === selected;
      optionEl.text = option;
      selectNode.appendChild(optionEl);
    });
    return selectNode;
  }