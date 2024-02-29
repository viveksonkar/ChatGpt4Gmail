import Menu from "../menu/menu";
import { dummyData } from "./dummay-data";

export const mockCgApiCall = (responseType: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mockHandler(responseType));
    }, 500);
  });
}

export const mockHandler = (menuType: string): string => {
  const mockDataMap: Record<string, string> = {
    [Menu.MENU_TYPE.WRITE_EMAIL]: dummyData,
    [Menu.MENU_TYPE.REPLY_EMAIL]: 'This is the suggested reply from chatgpt',
    [Menu.MENU_TYPE.SUMMARIZE_EMAIL]: 'This is generated summary of the email',
    [Menu.MENU_TYPE.WRITE_EMAIL]: 'This is suggested reply from chat gpt',
    [Menu.MENU_TYPE.REWRITE_EMAIL]: 'This is replaced text',
    [Menu.MENU_TYPE.TRANSLATE_TO]: 'This is the translated email from chat gpt',
  }
  return mockDataMap[menuType];
}