export const tones = [
  "polite",
  "friendly",
  "warning",
  "official",
  "nice"
];

export const cmpTone = () => {
  let cgTone = document.createElement('ul');
  cgTone.classList.add('cg-tone');
  tones.forEach( tone => {
    let liEl = document.createElement('li');
    let checkboxEl = document.createElement('input');
    checkboxEl.type = "checkbox";
    checkboxEl.value = tone;
    checkboxEl.classList.add('cg-tone-checkbox')
    checkboxEl.classList.add('checkbox')
    liEl.appendChild(checkboxEl);
    liEl.innerText = tone.toUpperCase();
    cgTone.appendChild(liEl);
  });
  return cgTone;
}
