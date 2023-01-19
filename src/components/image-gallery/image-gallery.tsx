import React, { useState } from "react";
import { Gallery } from "react-grid-gallery";
import Images from "./gallery"


const ImageGallery = () => {
    const [country, setCountry] = useState ('France');

        

    return (
        <div className="App-header ">
        <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="justify-center text-left p-10"> 
        <h1 className="text-3xl py-5 ">Welcome to my { country } Images</h1>

        <div className="flex space-x-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => setCountry('France')}>France</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => setCountry('Scotland')}>Scotland</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => setCountry('Wales')}>Wales</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => setCountry('England')}>England</button>

        </div>

        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni minus repellendus labore natus ut, sint accusantium similique sit nulla molestias perspiciatis non minima repudiandae sequi omnis maxime aspernatur maiores earum.</p>
       </div>
       <div className="justify-center text-left p-10">  
        <Images country={ country }/>
        </div>
       </div>
       </div>
 


    );
};

export default ImageGallery;