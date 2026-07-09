import { ImagesProps } from "../interfaces/images";

export const filterImagesByCountry = (
  images: ImagesProps[],
  country: string
): ImagesProps[] => {
  return images.filter((image) => image.country === country);
};

export const filterImagesBySubregion = (
  images: ImagesProps[],
  subregion: string
): ImagesProps[] => {
  return images.filter((image) => image.subregion === subregion);
};

export const getSubregionsForCountry = (
  images: ImagesProps[],
  country: string
): string[] => {
  return [
    ...new Set(
      images
        .filter((image) => image.country === country)
        .map((image) => image.subregion)
        .filter(Boolean)
    ),
  ];
};