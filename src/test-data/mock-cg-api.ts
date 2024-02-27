import Menu from "../menu/menu";
import { dummyData } from "./dummay-data";

export const mockCgApiCall = (responseType: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mockHandler(Menu.MENU_TYPE.WRITE_EMAIL));
    }, 500);
  });
}

export const mockHandler = (menuType: string): string => {
  /* const dummayData: Record<string, string> = {
    Menu.MENU_TYPE.WRITE_EMAIL: dummyData
  } */
  return dummyData;
}