import React, { useEffect, useState } from "react";
import axios from 'axios';

export interface CountryData {
  country: string;
  count: number;
}

interface ImageData {
  _id: string;
  src: string;
  width: number;
  height: number;
  country: string;
  subregion: string;
  caption: string;
}

interface TravelMapDataProps {
  onCountryData: (data: CountryData[]) => void;
}

const TravelMapData: React.FC<TravelMapDataProps> = ({ onCountryData }) => {
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    axios
      .get<ImageData[]>("http://localhost:5000/images/")
      .then((response) => {
        // Count occurrences of each country
        const countryCounts: { [key: string]: number } = {};
        response.data.forEach((data) => {
          if (data.country in countryCounts) {
            countryCounts[data.country] += 1;
          } else {
            countryCounts[data.country] = 1;
          }
        });

        // Convert the countryCounts object to the array of CountryData
        const uniqueCountriesData: CountryData[] = Object.keys(countryCounts).map(
          (country) => ({
            country,
            count: countryCounts[country],
          })
        );

        // Call the prop function with the uniqueCountriesData
        onCountryData(uniqueCountriesData);
        setIsLoading(false); // Data has been fetched, so set isLoading to false
      })
      .catch((error) => {
        console.log(error);
      });
  }, [onCountryData]); // Add onCountryData as a dependency for useEffect

  if (isLoading) {
    return <p>Loading...</p>; // Display a loading message while fetching data
  }

  return (
    <div>
    </div>
  );
};

export default TravelMapData;
