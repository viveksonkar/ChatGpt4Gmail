import { cmpButton } from "../controls/button";
import { heading } from "../controls/heading";

export const Activation = (responseCb: (response: string) => void): HTMLDivElement => {
  const el = document.createElement('div');

  el.appendChild(heading('Get Your Free License Key'));

  const keyLinksContainer = document.createElement('div');
  keyLinksContainer.style.paddingTop = '10px';
  keyLinksContainer.style.paddingBottom = '10px';

  const linkTab1 = document.createElement('div');
  linkTab1.classList.add('dflex', 'dflex-vcenter');
  
  const bullet1 = document.createElement('label');
  bullet1.innerHTML = '1';
  bullet1.classList.add('cg-bullet');

  const goTo = document.createElement('div');
  goTo.innerHTML = 'Go to';
  const link1 = document.createElement('a');
  link1.setAttribute('href','http://www.google.com');
  link1.innerHTML = 'http://www.google.com';

  linkTab1.appendChild(bullet1);
  linkTab1.appendChild(goTo);
  linkTab1.appendChild(link1);

  const linkTab2 = document.createElement('div');
  linkTab2.classList.add('dflex', 'dflex-vcenter');
  linkTab2.style.marginTop = '10px';

  const bullet2 = document.createElement('label');
  bullet2.innerHTML = '2';
  bullet2.classList.add('cg-bullet');

  const link2 = document.createElement('a');
  link2.style.textDecoration = 'none';
  link2.setAttribute('href','http://www.google.com');
  link2.innerHTML = 'Create a free account';

  linkTab2.appendChild(bullet2);
  linkTab2.appendChild(link2);

  const linkTab3 = document.createElement('div');
  linkTab3.classList.add('dflex', 'dflex-vcenter');
  linkTab3.style.marginTop = '10px';

  const bullet3 = document.createElement('label');
  bullet3.innerHTML = '3';
  bullet3.classList.add('cg-bullet');

  const link3 = document.createElement('a');
  link3.style.textDecoration = 'none';
  link3.setAttribute('href','http://www.google.com');
  link3.innerHTML = 'Get a License key and copy it below';

  linkTab3.appendChild(bullet3);
  linkTab3.appendChild(link3);

  keyLinksContainer.appendChild(linkTab1);
  keyLinksContainer.appendChild(linkTab2);
  keyLinksContainer.appendChild(linkTab3);

  el.appendChild(heading('Activate Your Plugin'));
  const activateForm = document.createElement('form');
  activateForm.style.marginTop = '50px';
  var activateLabel = document.createElement("label");
  activateLabel.innerHTML = "Copy the license key you received and click activate";
  activateForm.appendChild(activateLabel);
  const activateKeyInput = document.createElement('input');
  activateKeyInput.classList.add('cg-input');
  activateKeyInput.placeholder = 'Enter License Key';
  activateForm.appendChild(activateKeyInput);
  activateForm.appendChild(cmpButton('Activate', 'PRIMARY', undefined, true));



  el.appendChild(keyLinksContainer);
  el.appendChild(activateForm);

  return el;
}