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
    <section className="px-4 py-2">
      <div className="card--a">
        <span className="eyebrows">Running statistics</span>
      </div>

      <h2>Travel Highlights</h2>

      <div className="flex">
        <div className="flex">
          <i className="fa-solid fa-camera"></i>
          <span>
            <h3>{stats.totalPhotos}</h3>
            <p>Photos captured</p>
          </span>
        </div>

        <div className="flex">
          <i className="fa-solid fa-earth-europe"></i>
          <span>
            <h3>{stats.totalCountries}</h3>
            <p>Countries visited</p>
          </span>
        </div>

        <div className="flex">
          <i className="fa-solid fa-map-location-dot"></i>
          <span>
            <h3>{stats.totalDestinations}</h3>
            <p>Destinations explored</p>
          </span>
        </div>

        <div className="flex">
          <i className="fa-solid fa-heart"></i>
          <span>
            <h3>Countless</h3>
            <p>Memories made</p>
          </span>
        </div>
      </div>
    </section>
  );
}