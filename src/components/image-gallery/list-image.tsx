import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';



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
      subtitle: image.subregion

  }));

  console.log(filteredImages)

  

return (

  <div className="w-full object-cover flex content-center">
    <div>
      <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
        <div className="-m-1 flex flex-wrap md:-m-2">

            <ImageList variant="masonry" cols={3} gap={8}>
              {filteredImages.map((item, index) => (
                <ImageListItem key={index}>
                  <img
                    src={`${item.src}?w=248&fit=crop&auto=format`}
                    alt={item.caption}
                    loading="lazy"
                  />
                            <ImageListItemBar
            title={item.subtitle}
          />
              </ImageListItem>
            ))}
          </ImageList>


        </div>
      </div>
    </div>
  </div>
);
  
};

export default ImagesList;
