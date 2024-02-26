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
  const checkBoxes = tones.map( tone => `<li class="cg-tone-item">
    <input type="checkbox" name="tone" class="cg-tone-checkbox" value="${tone}"/>
      ${capitalize(tone)}
    </li>`).join("");
  const cgToneEl = `
    <label class="cg-label">Tone</label>
    ${cmpDivider("0 0 8px 0").outerHTML}
    <ul class="cg-tone-list">${checkBoxes}</ul>
  `;
  cgTone.innerHTML = cgToneEl;
  return cgTone;
}
