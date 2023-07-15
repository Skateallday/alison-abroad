import React from "react";
import { ComposableMap, Geographies, Geography} from "react-simple-maps";


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

    return(
        <div className='bg-gray-700 grid grid-cols-1 md:grid-cols-2'>
            <h1>Travel Map Component</h1>
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
    </ComposableMap>
        </div>
    )   

;}

export default TravelMap