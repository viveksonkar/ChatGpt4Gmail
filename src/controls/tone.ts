import { capitalize } from "lodash";
import { cmpDivider } from "./divider";

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
  const checkBoxes = tones.map( tone => `
    <li class="cg-tone-item checkbox-item">
      <input type="checkbox" name="tone" class="cg-tone-checkbox checkbox-input" value="${tone}"/>
      <label>${capitalize(tone)}</label>
    </li>`).join("");
  const cgToneEl = `
    <label class="cg-label">Tone</label>
    ${cmpDivider("0 0 8px 0").outerHTML}
    <ul class="cg-tone-list checkbox">${checkBoxes}</ul>
  `;
  cgTone.innerHTML = cgToneEl;
  return cgTone;
}
