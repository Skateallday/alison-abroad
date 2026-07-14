import './styles.css';
import { useEffect, useState } from 'react';
import { getImages } from '../api/getImages';
import { getImageStats } from '../utils/imageStats';
import { ImagesStats } from '../interfaces/imageStats';

const emptyStats: ImagesStats = {
  totalPhotos: 0,
  totalCountries: 0,
  totalDestinations: 0,
};

export default function RunningTotals() {
  const [stats, setStats] = useState<ImagesStats>(emptyStats);

  useEffect(() => {
    getImages()
      .then((images) => {
        setStats(getImageStats(images));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    
      <div className="row">


      <div className=" runningStats flex w-full space-around justify-center border border-black rounded-lg py-4">
        
        <div className="flex items-center p-4 border-r border-black">
          <i className="fa-solid fa-camera fa-xl px-4"></i>
          <span>
            <h3>{stats.totalPhotos}</h3>
            <h4>Photos captured</h4>
          </span>
        </div>

        <div className="flex items-center p-4 border-r border-black">
          <i className="fa-solid fa-earth-europe fa-xl px-4"></i>
          <span>
            <h3>{stats.totalCountries}</h3>
            <h4>Countries visited</h4>
          </span>
        </div>

        <div className="flex items-center p-2 ">
          <i className="fa-solid fa-map-location-dot fa-xl px-4"></i>
          <span>
            <h3>{stats.totalDestinations}</h3>
            <h4>Destinations explored</h4>
          </span>
        </div>

      </div>
      </div>
  );
}