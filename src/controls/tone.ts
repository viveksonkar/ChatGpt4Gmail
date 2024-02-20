export const tones = [
  "polite",
  "friendly",
  "warning",
  "official",
  "nice"
];

export const cmpTone = () => {
  const inputs = tones.map(tone => `<li><input type="checkbox" value="${tone}">${tone.toUpperCase()}</li>`).join('');
  return `<ul class="cg-tone">${inputs}</ul>`;
}
