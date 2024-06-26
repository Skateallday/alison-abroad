import React, { useState, useEffect } from "react";
import ImagesList from "./list-image";
import { getImages } from "../api/getImages";

interface Image {
  country: string;
  subregion: string;
}

const ImageGallery: React.FC = () => {
  const [country, setCountry] = useState<string>("Scotland");
  const [countries, setCountries] = useState<string[]>([]);
  const [subregion, setsubregion ] = useState<string>("Glasgow");
  const [subregions, setsubregions] = useState<string[]>([]);



  useEffect(() => {
      getImages()
      .then((response : {data: Image[]}) => {
        console.log(response.data); // Log the data property

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
      
      const subregionsArray = response.data
      .filter((image) => image.country === country) // Filter images by selected country
      .map((image) => image.subregion)
      .reduce<string[]>((uniquesubregions, subregion) => {
        // Only keep the first occurrence of the subregion
        if (!uniquesubregions.includes(subregion)) {
          uniquesubregions.push(subregion);
        }
        return uniquesubregions;
      }, [])
      .map((subregion) => subregion.charAt(0).toUpperCase() + subregion.slice(1));
      setsubregions(subregionsArray);
  })
      .catch((error) => {
        console.log(error);
      });
  }, [country]);

  const handleCountryChange = (selectCountry: string) => {
    setCountry(selectCountry);
  };

  const handleSubregionChange = (selectSubregion: string) => {
    setCountry(selectSubregion);
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
              onClick={() => setCountry(countryOption)}
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
              onClick={() => setsubregion(subregionOption)}
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
