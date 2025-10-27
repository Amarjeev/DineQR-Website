import axios from "axios";
import { BaseUrl } from "../../../../../../BaseUrl/BaseUrl";

export const use_SearchTable_List = () => {

  const handleSearchApiCall = async (tableName: string) => {
    // Allow only letters and digits
    const validNameRegex = /^[A-Za-z0-9]+$/;
    if (!validNameRegex.test(tableName)) {
      return;
    }

    try {
      // Axios GET request with query params
      const response = await axios.get(`${BaseUrl}manager/search/tableList`, {
        params: { tableName }, // send tableName as query param
        withCredentials: true, // include cookies if needed
      });

      // Return or process response data
      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  return { handleSearchApiCall };
};
