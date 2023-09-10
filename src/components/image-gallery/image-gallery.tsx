import React, { useState, useEffect } from "react";
import ImagesList from "./list-image";
import { getImages } from "../api/getImages";

interface Image {
  country: string;
  // Add other properties of the image
}

const ImageGallery: React.FC = () => {
  const [country, setCountry] = useState<string>("Scotland");
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
      getImages()
      .then((response : {data: Image[]}) => {
        const countriesArray = response.data
          .map((image) => image.country)
          .reduce<string[]>((uniqueCountries, country) => {
            // Only keep the first occurrence of the country
            if (!uniqueCountries.includes(country)) {
              uniqueCountries.push(country);
            }
            return uniqueCountries;
          }, [])
          .map((country) => country.charAt(0).toUpperCase() + country.slice(1));
        setCountries(countriesArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <div className="App-header">
      <div className="justify-center text-left p-10">
        <h1 className="text-3xl py-5">Here are my {country} Images</h1>
        <div className="flex flex-wrap p-4">
          {countries.map((countryOption) => (
            <button
              key={countryOption}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mr-4 mb-4"
              onClick={() => setCountry(countryOption)}
            >
              {countryOption}
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
          <ImagesList country={country} />
        </div>
      </div>
      
    </div>
  );
};

export default ImageGallery;
