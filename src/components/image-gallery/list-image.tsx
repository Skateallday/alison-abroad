import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ImagesProps } from '../interfaces/images';
import myImage from '../../../backend/images/me.png';

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

const ImagesList = () => {
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

  

  return (
    <div>
      <h3>Logged images</h3>
      <table className="table table-auto">
        <thead className="thead-light">
          <tr>
            <th>Source</th>
            <th>Country</th>
            <th>Subregion</th>
            <th>Caption</th>
          </tr>
        </thead>
        <tbody>
          {galleries.map((image) => (
            <GalleryImages {...image} key={image._id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ImagesList;
