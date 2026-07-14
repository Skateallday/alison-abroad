import { ImagesProps } from "../interfaces/images";

export const sortImagesByCountry = (images: ImagesProps[]): ImagesProps[] => {
  return [...images].sort((a, b) => a.country.localeCompare(b.country));
};

export const sortImagesBySubregion = (images: ImagesProps[]): ImagesProps[] => {
  return [...images].sort((a, b) => a.subregion.localeCompare(b.subregion));
};

export const sortImagesByCaption = (images: ImagesProps[]): ImagesProps[] => {
  return [...images].sort((a, b) => a.caption.localeCompare(b.caption));
};