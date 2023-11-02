import axios, { AxiosResponse } from 'axios';
import config from '../../config';

export const getImages = (): Promise<AxiosResponse> => {
  return axios.get(`${config.apiUrl}/images`);
};