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


export const getRandomCountry = (
  images: ImagesProps[]
): string => {

  let uniqueCountries = [...new Set(images.filter((image) => image.country).map((image) =>image.country).filter(Boolean)),]

  
  let randomCountryID = Math.floor(Math.random()* uniqueCountries.length);

  let chosenCountry = uniqueCountries[randomCountryID];

  return chosenCountry
  
};