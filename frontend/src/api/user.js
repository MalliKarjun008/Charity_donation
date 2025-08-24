import axios from "axios";
import { getData, patchData } from "./helper";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const registerUser = async (data) => {
  const url = `${baseUrl}/auth/register`;
  try {
    const response = await axios.post(url, data, {
      timeout: 15000,
    });
    return response.data.data;
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || err.message || "An unknown error occurred";

    throw new Error(errorMessage);
  }
};

export const updateUser = async (data) => {
  const url = `${baseUrl}/users/updateUser`;
  return patchData(url, data);
};

export const getFollowSuggestions = async (limit = 10) => {
  const url = new URL(`${baseUrl}/users/suggestionToFollow`);
  // Convert limit to number before sending
  url.searchParams.append("limit", Number(limit));
  return await getData(url.toString());
};

export const followUser = async (userId) => {
  const url = `${baseUrl}/users/startFollowing/${userId}`;
  return await patchData(url);
};

export const handleFollow = async (userId) => {
  const url = `${baseUrl}/users/handleFollow/${userId}`;
  return await patchData(url);
};

export const getMe = async () => {
  const url = `${baseUrl}/users/getMe`;
  return await getData(url);
};

export const searchUsers = async (term) => {
  const url = `${baseUrl}/users/searchUsers?search=${term}&fields=username,email,profilePicture&limit=10`;
  return getData(url);
};
