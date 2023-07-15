import React from "react";
import { ComposableMap, Geographies, Geography, Marker} from "react-simple-maps";
import './styles.css'

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"
type GeoData = {
    rsmKey: string;
    // Add other properties as needed
  };
  
  type TravelMapProps = {
    geographies: GeoData[];
    geo: string;
  };

const TravelMap: React.FC<TravelMapProps> = ({geographies, geo}) =>{
const rng:number = Math.floor((Math.random()*100));
    return(
        <div className='bg-gray-700 grid grid-cols-2 md:grid-cols-2'>
          <div> <h1 className='text-xl text-left text-white'>Travel Map Component</h1>
            <p className='text-left text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum enim exercitationem provident vero placeat asperiores aperiam voluptas praesentium, inventore, corrupti cum odio delectus cupiditate dolorem itaque eaque magnam. Quasi, officia.</p>
</div><div>
                       <ComposableMap
      width={800}
      height={800}
      projection="geoAzimuthalEqualArea"
      projectionConfig={{
        rotate: [-10.0, -53.0, 0],
        scale: 1200
      }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }: any) =>
          geographies.map((geo:any) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#9998A3"
              stroke="#EAEAEC"
            />
          ))
        }
      </Geographies>
      
      <Marker coordinates={[2.3522, 48.8566]} fill="#777">
        <circle r={rng}/>
        <text className="text" >
          Paris, photos:{rng}
        </text>
        
      </Marker>

      <Marker coordinates={[-0.118092, 51.509865]} fill="#777">
        <circle r='20' />
        <text className="text" >
          London
        </text>
        
      </Marker>

      <Marker coordinates={[-3.2, 55.9]} fill="#777">
        <circle r='18' />
        <a href="http://localhost:3000/image-gallery">
        <text className="text" >
          Edinburgh
        </text></a>
        
      </Marker>

      <Marker coordinates={[13.4050, 52.52]} fill="#777">
        <circle r='23' />
        <text className="text" >
          Berlin
        </text>
        
      </Marker>
      
      <Marker coordinates={[2.1686, 41.3874]} fill="#777">
        <circle r='23'/>
        <text className="text" >
          Barcelona, photos:{rng}
        </text>
        
      </Marker>

      <Marker coordinates={[-8.6291, 41.1579]} fill="#777">
        <circle r='20' />
        <text className="text" >
          Porto
        </text>
        
      </Marker>

      <Marker coordinates={[23.3219, 42.6977]} fill="#777">
        <circle r='18' />
        <a href="http://localhost:3000/image-gallery">
        <text className="text" >
          Sofia
        </text></a>
        
      </Marker>

      <Marker coordinates={[-21.9408, 64.1470]} fill="#777">
        <circle r='23' />
        <text className="text" >
        Reykjavík
        </text>
        
      </Marker>
      
    </ComposableMap>
        </div>
        </div>
    )   

;}

export default TravelMap