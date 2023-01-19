import { Gallery } from "react-grid-gallery";
import { ImagesProps } from '../interfaces/images'


export default function Images(props: ImagesProps) {

    const country = props.country;

    const images = [
        {
            src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
            width: 320,
            height: 174,
            country: 'Scotland',
            caption: "After Rain (Jeshu John - designerspics.com)",
            alt: "Boats (Jeshu John - designerspics.com)"

         },
         {
            src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
            width: 320,
            height: 212,
            country: 'England',
            alt: "Boats (Jeshu John - designerspics.com)",
         },
       
         {
            src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
            width: 320,
            height: 212,
            country: 'Wales',
            alt: "Boats (Jeshu John - designerspics.com)",

         },
         {
            src: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
            width: 228,
            height: 320,
            country: 'France',
         }
     ];

     const filteredImages = images.filter(image => image.country === country);


     return(  
        <div>
            { country }
            <Gallery images={ filteredImages } />  
        </div>
        )       
} 


   
 


