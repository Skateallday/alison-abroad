import axios from 'axios';
import config from '../../config';
import { ImagesProps } from '../interfaces/images';

export const getImages = async (): Promise<ImagesProps[]> => {

  const response = await axios.get<ImagesProps[]>(`${config.apiUrl}/images`);

  return response.data;
};