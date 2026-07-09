import React, { useEffect, useState } from "react";
import { getImages } from "../api/getImages";

export interface CountryData {
  country: string;
  count: number;
}


interface TravelMapDataProps {
  onCountryData: (data: CountryData[]) => void;
}

const TravelMapData: React.FC<TravelMapDataProps> = ({ onCountryData }) => {
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
  getImages()
    .then((images) => {
      const countryCounts: { [key: string]: number } = {};

      images.forEach((data) => {
        if (data.country in countryCounts) {
          countryCounts[data.country] += 1;
        } else {
          countryCounts[data.country] = 1;
        }
      });

      const uniqueCountriesData: CountryData[] = Object.keys(countryCounts).map(
        (country) => ({
          country,
          count: countryCounts[country],
        })
      );

      onCountryData(uniqueCountriesData);
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
    });
}, [onCountryData]);

  if (isLoading) {
    return <p>Loading...</p>; // Display a loading message while fetching data
  }

  return (
    <div>
    </div>
  );
};

export default TravelMapData;
