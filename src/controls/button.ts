export type BUTTON_TYPE = 'PRIMARY' | 'SECONDARY';

export const cmpButton = (text: string, type: BUTTON_TYPE, 
  classList: Array<string> | string | undefined = undefined, 
  isOutlined: boolean = false, 
  cb: (event: any) => void = () => {}) => {
  const el = document.createElement("button");
  el.innerText = text;
  el.classList.add('cgbtn');

  if (classList) {
    if (typeof classList === 'string') {
      el.classList.add(classList);
    } else {
      classList.forEach(className => {
        el.classList.add(className);
      });
    }
  }
  
  switch(type) {
    case 'PRIMARY':
      el.classList.add('cgbtn-primary');
      if(isOutlined) el.classList.add('cgbtn-primary-outlined');
      break;
    case 'SECONDARY':
      el.classList.add('cgbtn-secondary');
      if(isOutlined) el.classList.add('cgbtn-secondary-outlined');
      break;
    default:
      el.classList.add('cgbtn-default')
  }
  el.addEventListener('click', cb);
  return el;  
}