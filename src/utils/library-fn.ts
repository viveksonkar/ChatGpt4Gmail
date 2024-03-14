export const htmlFormatting = (text: string ) => {
  if(text) {
    return text.replace(/\n/g, '<br>');
  }
  return text;
}


export const extractSubjectAndBody = (emailText: string) => {
  // Split the email text into lines
  const lines = emailText.split('\n');
  // Find the index where the body starts (after the first empty line)
  let bodyIndex = lines.findIndex(line => line.trim() === '');

  // If no empty line is found, consider the entire text as the subject
  if (bodyIndex === -1) {
      return {
          subject: lines.join('\n').trim(),
          body: ''
      };
  }

  // Extract the subject from the lines before the empty line
  const subject = lines.slice(0, bodyIndex).join('\n').trim();

  // Extract the body from the lines after the empty line
  const body = lines.slice(bodyIndex + 1).join('\n').trim();

  return {
      subject: subject,
      body: body
  };
}