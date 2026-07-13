import "./styles.css"
import {useState, useEffect} from 'react'
import PreviewCard from "./preview-card"
import { getImages } from "../api/getImages"
import { ImagesProps } from "../interfaces/images"
import { getRandomCountry, getSubregionsForCountry } from "../utils/imageFilters"
import { getOptimisedImageUrl } from "../utils/imageUrls"

export default function ImagePreview(){

    const [country, setCountry] = useState<string>("Scotland");
    const [region, setSubregion ] = useState<string>("Glasgow");      
    const [image, setImage]= useState<string>("");

    useEffect(() => {
      getImages()
        .then((images) => {
            const randomCountry = getRandomCountry(images)
            const subregions = getSubregionsForCountry(images, randomCountry)
            const imageUrl = getOptimisedImageUrl(images[0].src)


            setImage(imageUrl)
            setCountry(randomCountry)
            setSubregion(subregions[0])
    })
    .catch((error) => {
        console.log(error);
    });}, []);


    return(
        <>
        <p>Image preview</p>

        <PreviewCard image={image} country={country} region={region}/>    
        </>
    )
}