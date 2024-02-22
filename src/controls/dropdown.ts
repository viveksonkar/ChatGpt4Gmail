export interface Option {
  label: string;
  content: string;
}

export const cmpDropDown = (options: Array<Option>, selected: string): HTMLSelectElement => {
  let selectNode: HTMLSelectElement = document.createElement('select');
  selectNode.classList.add('cg-select');
  options.forEach( option => {
    let optionEl = document.createElement('option');
    optionEl.value = option.content;
    optionEl.selected = option.content === selected;
    optionEl.text = option.label;
    selectNode.appendChild(optionEl);
  });
  return selectNode;
}