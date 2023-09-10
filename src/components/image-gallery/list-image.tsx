import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Gallery } from "react-grid-gallery";



interface ImageData {
  _id: string;
  src: string;
  width: number;
  height: number;
  country: string;
  subregion: string;
  caption: string;
}

interface ImagesListProps {
  country: string;
}

const ImagesList = ({ country }: ImagesListProps) => {
  const [galleries, setGalleries] = useState<ImageData[]>([]);

  useEffect(() => {
    axios.get<ImageData[]>('http://localhost:5000/images/')
      .then(response => {

        setGalleries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Filter images based on selected country
  const filteredImages = galleries.filter((image) => image.country === country).map((image) => ({
      src: `http://localhost:5000/${image.src}`,
      width: image.width,
      height: image.height,
      caption: image.country,

  }));

  console.log(filteredImages)


  return (
    <div className="w-full object-cover flex content-center">
      <div>
        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
          <div className="-m-1 flex flex-wrap md:-m-2">
            {filteredImages.map((image, index) => (
              <div className="flex w-1/3 flex-wrap" key={index}>
                <div className="w-full p-1 md:p-2">
                  <div>
                    <img
                      alt={image.caption}
                      className="h-auto max-w-full rounded-lg"
                      src={image.src}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default ImagesList;
