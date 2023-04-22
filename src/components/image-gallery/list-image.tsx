import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ImageData {
  _id: string;
  src: string;
  width: number;
  height: number;
  country: string;
  subregion: string;
  caption: string;
}


const GalleryImages = ({ src, width, height, country, subregion, caption }: ImageData) => (
  
  <tr>
    <td>
      <img src={`http://localhost:5000/${src}`} width={width} height={height} />
    </td>
    <td>{country}</td>
    <td>{subregion}</td>
    <td>{caption}</td>
  </tr>
);

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
  const filteredImages = galleries.filter((image) => image.country === country);

  return (
    <div className="mx-auto max-w-5xl p-6">
      <table className="table-auto  rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Source</th>
            <th className="px-4 py-2 text-left">Country</th>
            <th className="px-4 py-2 text-left">Subregion</th>
            <th className="px-4 py-2 text-left">Caption</th>
          </tr>
        </thead>
        <tbody>
          {filteredImages.map((image) => (
            <GalleryImages
              _id={image._id}
              src={image.src}
              width={image.width}
              height={image.height}
              country={image.country}
              subregion={image.subregion}
              caption={image.caption}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ImagesList;
