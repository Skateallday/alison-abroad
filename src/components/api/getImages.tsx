import axios, { AxiosResponse } from 'axios';

export const getImages = (): Promise<AxiosResponse> => {
  return axios.get('http://localhost:5000/images');
};