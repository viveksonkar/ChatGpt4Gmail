export const tones = [
  "polite",
  "friendly",
  "warning",
  "official",
  "nice"
];

export const cmpTone = (): HTMLDivElement => {
  let cgTone = document.createElement('div');
  cgTone.classList.add('cg-tone');
  const checkBoxes = tones.map( tone => `<li>
    <input type="checkbox" class="cg-tone-checkbox" value="${tone}"/>
      ${tone.toUpperCase()}
    </li>`).join("");
  const cgToneEl = `<ul class="cg-tone">${checkBoxes}</ul>`;
  cgTone.innerHTML = cgToneEl;
  return cgTone;
}
