import React, { useState, useEffect } from "react";
import ImagesList from "./list-image";
import { getImages } from "../api/getImages";
import { ImagesProps } from "../interfaces/images";
import RunningTotals from "../runningtotals/runningtotals";
import "./styles.css";

const ImageGallery: React.FC = () => {
  const [country, setCountry] = useState<string>("Scotland");
  const [countries, setCountries] = useState<string[]>([]);
  const [subregion, setSubregion] = useState<string>("Glasgow");
  const [subregions, setSubregions] = useState<string[]>([]);
  const [images, setImages] = useState<ImagesProps[]>([]);
  const [display, setDisplay] = useState(false);

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
          .map(
            (subregion) =>
              subregion.charAt(0).toUpperCase() + subregion.slice(1),
          );

        setSubregions(subregionsArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [country]);

  const handleHideShow = () => {
    setDisplay(!display);
  };

  const handleCountryChange = (selectedCountry: string) => {
    setCountry(selectedCountry);
    const newSubregions = images
      .filter((image) => image.country === selectedCountry)
      .map((image) => image.subregion)
      .filter((subregion, index, array) => array.indexOf(subregion) === index);

    setSubregions(newSubregions);
    setSubregion(newSubregions[0] || "");
  };

  const handleSubregionChange = (selectSubregion: string) => {
    setSubregion(selectSubregion);
  };

  return (
    <section className="image-gallery  pb-4">
      <div className="image-gallery-intro px-10 text-white w-full flex flex-col md:flex-row  p-4 border-b border-black">
        <div className="pr-10">
          <h1 className="text-white py-4">Image Gallery</h1>
          <p className="text-white">
            Alison is a keen photographer who has an unwavering passion for
            capturing the beauty of stunning locations during her travels. Her
            lens has a knack for preserving exquisite moments in time, from
            enchanting landscapes to vibrant city scenes. So, join her as she
            shares her photographic journey through her travels, where every
            click of her camera tells a unique story, allowing you to discover
            the captivating charm of this remarkable place.
          </p>
        </div>
        <div className="py-10"><RunningTotals /></div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full flex-auto">
          <div className="flex flex-col md:flex-row ">
            <div className="w-full md:w-1/6  md:border-r border-black">
              <div className="p-4 border-b border-black">
                <h2 className="pb-2">Filters</h2>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded mr-4 mb-4"
                  onClick={handleHideShow}
                >
                  {display ? <p>Hide filters</p> : <p>Show filters</p>}
                </button>
              </div>
              {display ? (
                <>
                  <div className="flex flex-col md:flex-row  md:flex-wrap p-4 border-b border-black">
                    <h3 className="py-4">Country</h3>
                    <div>
                      {countries.map((countryOption) => (
                        <button
                          key={countryOption}
                          className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded mr-4 mb-4 ${
                            country === countryOption ? "bg-green-700" : ""
                          }`}
                          onClick={() => handleCountryChange(countryOption)}
                        >
                          {countryOption}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:flex-wrap p-4 border-b border-black">
                    <h3 className="py-4">Region</h3>
                    <div>
                      {subregions.map((subregionOption) => (
                        <button
                          key={subregionOption}
                          className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded mr-4 mb-4 ${
                            subregion === subregionOption ? "bg-green-700" : ""
                          }`}
                          onClick={() => handleSubregionChange(subregionOption)}
                        >
                          {subregionOption}
                        </button>
                      ))}
                    </div>
                  </div>{" "}
                </>
              ) : null}
            </div>
            <div className="w-full md: w-5/6 p-5">
              <div className="relative image-gallery">
                <div className="py-5 flex content-center w-full ">
                  <h2 className=" px-4">{country}</h2>
                  <div className="card--a">
                    <span className="eyebrows">{subregion}</span>
                  </div>
                </div>

                <div className="flex content-center w-full ">
                  <ImagesList subregion={subregion} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
