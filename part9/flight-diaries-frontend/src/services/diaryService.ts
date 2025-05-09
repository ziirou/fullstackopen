import axios from 'axios';
import type { Diary, NewDiary } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaries = () => {
  return axios
    .get<Diary[]>(baseUrl)
    .then(response => response.data);
};

export const createDiary = (object: NewDiary) => {
  return axios
    .post<Diary>(baseUrl, object)
    .then(response => response.data)
    .catch((error: unknown) => {
      if (axios.isAxiosError(error)) {
        if (error?.response?.data && typeof error?.response?.data === "string") {
          throw error.response?.data
        } else if (error?.message && typeof error?.message === "string") {
          throw error.message
        }
        throw "An unknown Axios error occurred";
      } else {
        throw "An unexpected error occurred";
      }
    });
};
