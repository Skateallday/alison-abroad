import { useState, useEffect, Suspense } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import config from '../../config';
import { getImages } from '../api/getImages';


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
  subregion: string;
}

const ImagesList = ({ subregion }: ImagesListProps) => {
  const [galleries, setGalleries] = useState<ImageData[]>([]);

  useEffect(() => {
    getImages()
      .then(images => {

        setGalleries(images);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Filter images based on selected subregion
  const filteredImages = galleries.filter((image) => image.subregion === subregion).map((image) => ({
      src: `${config.apiUrl}/images/${image.src}`,
      _id: image._id,
      width: image.width,
      height: image.height,
      caption: image.caption,
      subregion: image.subregion

  }));


  

return (

  <div className="w-full object-cover flex content-center">
    <div>
      <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
        <div className="-m-1 flex flex-wrap md:-m-2">
        <Suspense fallback={<div>Loading...</div>}>

            <ImageList variant="masonry" cols={3} gap={8}>
              {filteredImages.map((item, index) => (
                <ImageListItem key={item._id}>
                  <img
                    src={`${item.src}?w=248&fit=crop&auto=format`}
                    alt={item.caption}
                    loading="lazy"
                  />
                            <ImageListItemBar
            title={item.caption}
          />
              </ImageListItem>
              
            ))}
          </ImageList>
        </Suspense>

        </div>
      </div>
    </div>
  </div>
);
  
};

export default ImagesList;
