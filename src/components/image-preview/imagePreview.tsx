import "./styles.css";
import { useState, useEffect } from "react";
import PreviewCard from "./preview-card";
import { getImages } from "../api/getImages";
import {
    buildPreviewBundle,
  getRandomCountries,
} from "../utils/imageFilters";

interface PreviewBundle{
    country:string;
    region: string;
    image: string;
}

export default function ImagePreview() {
  const [previews, setPreviews] = useState<PreviewBundle[]>([]);

  useEffect(() => {
    getImages()
      .then((images) => {
        const randomCountry = getRandomCountries(images);
        const bundle = randomCountry.map((country) =>
            buildPreviewBundle(images, country)
    );        

        setPreviews(bundle);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section className="image-preview">
      <h2 className="">Destination preview</h2>
      <div className="flex flex-row">
        {previews.map((preview) =>(

        <PreviewCard 
            key={preview.country}
            image={preview.image} 
            country={preview.country} 
            region={preview.region} />
        ))}
      </div>
    </section>
  );
}
