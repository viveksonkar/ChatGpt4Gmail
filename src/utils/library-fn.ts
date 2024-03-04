export const htmlFormatting = (text: string ) => {
  if(text) {
    return text.replace(/\n/g, '<br>');
  }
  return text;
}