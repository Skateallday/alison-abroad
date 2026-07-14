import { ImagesProps } from "../interfaces/images";
import { getOptimisedImageUrl } from "./imageUrls";

export const filterImagesByCountry = (images: ImagesProps[],country: string,): ImagesProps[] => {
  return images.filter((image) => image.country === country);
};

export const filterImagesBySubregion = (images: ImagesProps[],subregion: string,): ImagesProps[] => {
  return images.filter((image) => image.subregion === subregion);
};

export const getSubregionsForCountry = (images: ImagesProps[],country: string,): string[] => {
  return [
    ...new Set(
      images
        .filter((image) => image.country === country)
        .map((image) => image.subregion)
        .filter(Boolean),
    ),
  ];
};

export const getRandomCountries = (images: ImagesProps[], limit=4): string[] => {
  let uniqueCountries = [
    ...new Set(
      images
        .filter((image) => image.country)
        .map((image) => image.country)
        .filter(Boolean),
    ),
  ];

    for (let i =uniqueCountries.length -1; i> 0; i--){
      let j = Math.floor(Math.random() * (i +1));

      [uniqueCountries[i], uniqueCountries[j]] = [uniqueCountries[j], uniqueCountries[i]]
    }

  return uniqueCountries.slice(0,limit);
};

export const buildPreviewBundle = (images:ImagesProps[], country: string) =>{
  const countryImages = filterImagesByCountry(images, country)
  const subregion = getSubregionsForCountry(images, country);

  return{
    country,
    region: subregion[0] || "",
    image: getOptimisedImageUrl(countryImages[0]?.src || ""),
  }
}