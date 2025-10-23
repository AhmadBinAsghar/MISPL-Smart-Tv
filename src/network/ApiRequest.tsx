import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppKeys } from "../constants/AppKeys";

export const BASE_URL = "http://103.86.135.164:25461/get.php?username=test&password=1122&type=m3u_plus&output=ts";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export const API_REQUEST = async (
  method: HttpMethod,
  endPoint: string,
  onSuccess: (data: any) => void,
  onFailed: (error: any) => void,
  data?: any
): Promise<void> => {
  try {
    const token = await AsyncStorage.getItem(AppKeys.sessionToken);

    const headers: HeadersInit_ = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(BASE_URL + endPoint, {
      method: method,
      body: data ? JSON.stringify(data) : null,
      headers,
    });

    if (!response.ok) {
      let errorMessage = "Something went wrong";

      // Handle different HTTP response status codes
      if (response.status >= 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (response.status === 401) {
        errorMessage = "Unauthorized. Please log in again.";
      } else if (response.status === 404) {
        errorMessage = "Not found.";
      } else if (response.status === 400) {
        errorMessage = "Bad request.";
      }

      try {
        const jsonData = await response.json();
        errorMessage = jsonData?.message || errorMessage;
      } catch (parseError) {
        // Fail silently: console.log can be uncommented for debugging
      }

      onFailed(errorMessage);
      return;
    } else {
      // Successfully received response
      const jsonData = await response.json();
      onSuccess(jsonData);
    }

  } catch (error: any) {
    let errorMessage = "Something went wrong. Please try again.";

    if (error?.message?.includes("Network request failed")) {
      errorMessage = "Network error. Please check your connection.";
    } else if (error?.message?.includes("Session token not found")) {
      errorMessage = "Session expired. Please log in again.";
    }

    onFailed(errorMessage);
  }
};