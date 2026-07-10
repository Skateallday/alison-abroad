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
    <section className="runningStats px-4 py-2">
      
      <div className="card--a">
        <span className="eyebrows">Running statistics</span>
      </div>

      <h2>Travel Highlights</h2>

      <div className="flex w-full space-around justify-center">
        
        <div className="flex p-2 border-r-2 border-black">
          <i className="fa-solid fa-camera fa-xl"></i>
          <span>
            <h3>{stats.totalPhotos}</h3>
            <h4>Photos captured</h4>
          </span>
        </div>

        <div className="flex p-2 border-r-2 border-black">
          <i className="fa-solid fa-earth-europe fa-xl"></i>
          <span>
            <h3>{stats.totalCountries}</h3>
            <h4>Countries visited</h4>
          </span>
        </div>

        <div className="flex p-2 ">
          <i className="fa-solid fa-map-location-dot fa-xl"></i>
          <span>
            <h3>{stats.totalDestinations}</h3>
            <h4>Destinations explored</h4>
          </span>
        </div>

      </div>
    </section>
  );
}