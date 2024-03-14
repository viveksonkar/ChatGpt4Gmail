import { cmpDivider } from "./divider";

export interface Option {
  label: string;
  content: string;
}

export const cmpDropDown = (title: string, name: string, options: Array<Option>, 
  selected: string, id: string = 'cg-select', onChange: (ev: Event) => void = (ev: Event) => {} ): HTMLDivElement => {
    const root = document.createElement('div');
    const label = document.createElement('label');
    label.classList.add('cg-label');
    label.innerText = title;
    let selectNode: HTMLSelectElement = document.createElement('select');
    selectNode.classList.add('cg-select');
    selectNode.onchange = onChange;
    selectNode.name = name;
    selectNode.id = id;
    options.forEach( option => {
      let optionEl = document.createElement('option');
      optionEl.value = option.content;
      optionEl.selected = option.content === selected;
      optionEl.text = option.label;
      selectNode.appendChild(optionEl);
    });
    root.appendChild(label);
    root.appendChild(cmpDivider("0 0  8px 0"));
    root.appendChild(selectNode);
  return root;
}