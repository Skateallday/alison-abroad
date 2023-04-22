import React, { useState, useEffect } from "react";
import { Gallery } from "react-grid-gallery";
import ImagesList from "./list-image";
import axios from "axios";

const ImageGallery = () => {
  const [country, setCountry] = useState("France");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/images")
      .then((response) => { 
        const countriesArray = response.data
          .map((image:any) => image.country)
          .filter(
            (country:string, index:number, array:any) =>
              // Only keep the first occurrence of the country
              array.indexOf(country) === index
          );
        setCountries(countriesArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App-header ">
      <div className="justify-center text-left p-10">
        <h1 className="text-3xl py-5 ">Welcome to my {country} Images</h1>
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
      <div className="justify-center text-left p-10"></div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="justify-center text-left p-10">
          <ImagesList country={country} />
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;