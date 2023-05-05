import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';


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
    original: `http://localhost:5000/${image.src}`,
    originalWidth: image.width,
    originalHeight: image.height,
    originalTitle : image.country,
    description : image.caption
  }));

  

  return (
    <div className="mx-auto max-w-5xl p-6">
      <ImageGallery
        items={filteredImages}
      />
    </div>
  );
};

export default ImagesList;
