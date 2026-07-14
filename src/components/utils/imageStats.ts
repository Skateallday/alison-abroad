import { ImagesProps } from "../interfaces/images";

export const getUniqueCountries = (images: ImagesProps[]): string[] => {
  return [...new Set(images.map((image) => image.country).filter(Boolean))];
};

export const getUniqueSubregions = (images: ImagesProps[]): string[] => {
  return [...new Set(images.map((image) => image.subregion).filter(Boolean))];
};

export const getCountryCounts = (images: ImagesProps[]) => {
  const countryCounts: Record<string, number> = {};

  images.forEach((image) => {
    countryCounts[image.country] = (countryCounts[image.country] || 0) + 1;
  });

  return Object.keys(countryCounts).map((country) => ({
    country,
    count: countryCounts[country],
  }));
};

export const getImageStats = (images: ImagesProps[]) => {
  return {
    totalPhotos: images.length,
    totalCountries: getUniqueCountries(images).length,
    totalDestinations: getUniqueSubregions(images).length,
  };
};