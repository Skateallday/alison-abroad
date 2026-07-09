import React from 'react';
import './styles.css';

function ImageFlair() {
  return (
    <div className="image-flair-background">
      <div className="card-group" data-index="0" data-status="active">
        <div className="small-card card">
          <img src="https://picsum.photos/800/600?random=4" alt="" loading="lazy" />
        </div>

        <div className="big-card bc1 card">
          <img src="https://picsum.photos/800/600?random=8" alt="" loading="lazy" />
        </div>

        <div className="small-card card">
          <img src="https://picsum.photos/800/600?random=3" alt="" loading="lazy" />
        </div>

        <div className="big-card bc2 card">
          <img src="https://picsum.photos/800/600?random=7" alt="" loading="lazy" />
        </div>

        <div className="small-card card">
          <img src="https://picsum.photos/800/600?random=2" alt="" loading="lazy" />
        </div>

        <div className="big-card bc3 card">
          <img src="https://picsum.photos/800/600?random=6" alt="" loading="lazy" />
        </div>

        <div className="small-card card">
          <img src="https://picsum.photos/800/600?random=1" alt="" loading="lazy" />
        </div>

        <div className="big-card bc4 card">
          <img src="https://picsum.photos/800/600?random=5" alt="" loading="lazy" />
        </div>
      </div>
    </div>
  );
}

export default ImageFlair;