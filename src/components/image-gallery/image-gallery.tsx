import React, { useState, useEffect } from "react";
import ImagesList from "./list-image";
import { getImages } from "../api/getImages";
import { ImagesProps } from "../interfaces/images"


const ImageGallery: React.FC = () => {
  const [country, setCountry] = useState<string>("Scotland");
  const [countries, setCountries] = useState<string[]>([]);
  const [subregion, setSubregion ] = useState<string>("Glasgow");
  const [subregions, setSubregions] = useState<string[]>([]);
  const [images, setImages]= useState<ImagesProps[]>([]);



useEffect(() => {
  getImages()
    .then((images) => {
      setImages(images);

      const countriesArray = images
        .map((image) => image.country)
        .reduce<string[]>((uniqueCountries, country) => {
          if (!uniqueCountries.includes(country)) {
            uniqueCountries.push(country);
          }
          return uniqueCountries;
        }, [])
        .map((country) => country.charAt(0).toUpperCase() + country.slice(1));

      setCountries(countriesArray);

      const subregionsArray = images
        .filter((image) => image.country === country)
        .map((image) => image.subregion)
        .reduce<string[]>((uniqueSubregions, subregion) => {
          if (!uniqueSubregions.includes(subregion)) {
            uniqueSubregions.push(subregion);
          }
          return uniqueSubregions;
        }, [])
        .map((subregion) => subregion.charAt(0).toUpperCase() + subregion.slice(1));

      setSubregions(subregionsArray);
    })
    .catch((error) => {
      console.log(error);
    });
}, []);

  const handleCountryChange = (selectedCountry: string) => {
    setCountry(selectedCountry);
      const newSubregions = images
      .filter((image) => image.country === selectedCountry)
      .map((image) => image.subregion)
      .filter((subregion, index, array) => array.indexOf(subregion) === index);

      setSubregions(newSubregions);
      setSubregion(newSubregions[0] || "" )
  };

  const handleSubregionChange = (selectSubregion: string) => {
    setSubregion(selectSubregion);
  };

  return (
    <div className="App-header">
      <div className="justify-center text-left p-10">
        <h1 className="text-3xl py-5">Here are my {country} Images</h1>
        <h2 className="text-2xl py-5">Please select a country and subregion below</h2>
        <div className="flex flex-wrap p-4">
          {countries.map((countryOption) => ( 
            <button
              key={countryOption}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mr-4 mb-4 ${
                country === countryOption ? "bg-blue-700" : ""
              }`}
              onClick={() => handleCountryChange(countryOption)}
            >
              {countryOption}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap p-4">
          {subregions.map((subregionOption) => (
            <button
              key={subregionOption}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mr-4 mb-4 ${
                subregion === subregionOption ? "bg-blue-700" : ""
              }`}
              onClick={() => handleSubregionChange(subregionOption)}
            >
              {subregionOption}
            </button>
          ))}
        </div>
        <p>
        Alison is a keen photographer who has an unwavering passion for 
        capturing the beauty of stunning locations during her travels. 
        Her lens has a knack for preserving exquisite moments in time, 
        from enchanting landscapes to vibrant city scenes. So, join her 
        as she shares her photographic journey through her travels, where 
        every click of her camera tells a unique story, allowing you to 
        discover the captivating charm of this remarkable place.
        </p>
      </div>
      <div className="relative bg-slate-700">
        <div className="flex content-center bg-slate-800 w-full ">
          <h3>{subregion}</h3>
          <ImagesList subregion={subregion}/>
        </div>
      </div>
      
    </div>
  );
};

export default ImageGallery;
