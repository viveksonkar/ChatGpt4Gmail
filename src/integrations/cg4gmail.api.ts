import axios from "axios";
import { GLOBAL } from "../utils/global-data";
import { mockCgApiCall } from "../test-data/mock-cg-api";
import { ApiResponse } from "./models/cg4gmail.model";
import Menu from "../menu/menu";

export const retrieveLicense = async (): Promise<ApiResponse> => {
  let lincenseKey = "";
  let email = "";
  
  const apiUrl = `${GLOBAL.rootUrl}/license-auth?api_key=${lincenseKey}&email=${email}`;
  
  if(GLOBAL.isApiMock) {
    return mockCgApiCall(Menu.MENU_TYPE.LICENSE, 100);
  }

  try {
    // Make the API request using Axios
    const response = await axios.get(apiUrl);
    console.log('Response from CG4Gmail API:', response.data);
    const cgResponse = response.data as ApiResponse;
    return cgResponse; // Return the response data
  } catch (errorResponse: any) {
    console.error('License download error:', errorResponse);
    if(errorResponse?.response?.data?.error?.message) {
      return errorResponse?.response?.data?.error?.message
    }
    throw errorResponse; // Throw the error to indicate failure
  }
}