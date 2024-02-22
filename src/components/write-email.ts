import { cmpDropDown } from "../controls/dropdown";
import { cmpTone } from "../controls/tone";

export const writeEmailTypeOptions = [
  { label: 'Sales', content: 'SALES', command: 'Write a sales email' },
  { label: 'Promotion', content: 'PROMOTION', command: 'Write a promotional email' },
  { label: 'Custom', content: 'Custom', command: 'Write a email for ' },
];

export const WriteEmail = (responseCb: (response: string) => void): HTMLDivElement => {
  const el = document.createElement('div');
  let ddOptions = writeEmailTypeOptions.map( ({label, content}) => ({label, content}));
  el.appendChild(cmpDropDown(ddOptions, 'SALES'));
  el.appendChild(cmpTone())
  return el;
}