import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

// QueryClient to use it globally
export const queryClient = new QueryClient();

// Helper function to get token safely
export const getToken = () => {
  try {
    return localStorage.getItem("token") || "";
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return "";
  }
};

// Helper function to handle all GET requests
export const getData = async (url) => {
  const token = getToken();
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      timeout: 10000, // 10 second timeout
    });
    const data = response.data.data;
    return data;
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || err.message || "An unknown error occurred";
    console.error("API Request Failed:", {
      url,
      status: err.response?.status,
      message: errorMessage,
    });
    throw new Error(errorMessage);
  }
};

// Helper function to handle all POST requests
export const postData = async (url, body = {}) => {
  const token = getToken();
  try {
    const response = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 15000,
    });
    return response.data.data;
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || err.message || "An unknown error occurred";
    console.error("API POST Request Failed:", {
      url,
      status: err.response?.status,
      message: errorMessage,
    });
    throw new Error(errorMessage);
  }
};

// Helper function to handle all PATCH requests
export const patchData = async (url, body = {}) => {
  const token = getToken();
  try {
    const response = await axios.patch(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });
    return response.data.data;
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || err.message || "An unknown error occurred";
    console.error("API PATCH Request Failed:", {
      url,
      status: err.response?.status,
      message: errorMessage,
    });
    throw new Error(errorMessage);
  }
};
