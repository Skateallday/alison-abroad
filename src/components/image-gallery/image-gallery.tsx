import React, { useState, useEffect } from "react";
import ImagesList from "./list-image";
import { getImages } from "../api/getImages";

interface Image {
  country: string;
  // Add other properties of the image
}

const ImageGallery: React.FC = () => {
  const [country, setCountry] = useState<string>("Italy");
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
        <h1 className="text-3xl py-5">Welcome to my {country} Images</h1>
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
          Discover the beauty of {country} through my collection of photographs.
          Each image tells a story and captures a unique moment in time. From
          breathtaking landscapes to vibrant city scenes, there's something for
          everyone to enjoy. So sit back, relax, and let me take you on a
          journey through {country}.
        </p>
      </div>
      <div className="relative bg-slate-700">
        <div className="flex content-center bg-slate-800 w-full ">
          <ImagesList country={country} />
        </div>
      </div>
      <div className="justify-center text-left p-10">
        <p>
          Discover the beauty of {country} through my collection of photographs.
          Each image tells a story and captures a unique moment in time. From
          breathtaking landscapes to vibrant city scenes, there's something for
          everyone to enjoy. So sit back, relax, and let me take you on a
          journey through {country}.
        </p>
      </div>
    </div>
  );
};

export default ImageGallery;
