import React, {useState} from "react";
import { ComposableMap, Geographies, Geography, Marker} from "react-simple-maps";
import TravelMapData, { CountryData } from "./travelmapdata";
import markers from "./markers";
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
  const [uniqueCountryData, setUniqueCountryData] = useState<CountryData[]>([]);

  const handleCountryData = (data: CountryData[]) => {
    setUniqueCountryData(data)
  };


const rng:number = Math.floor((Math.random()*100));

    return(
        <div className='bg-gray-700 grid grid-cols-2 md:grid-cols-2'>
          <div> <h1 className='text-xl text-left text-white'>Travel Map Component</h1>
         
            <p className='text-left text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum enim exercitationem provident vero placeat asperiores aperiam voluptas praesentium, inventore, corrupti cum odio delectus cupiditate dolorem itaque eaque magnam. Quasi, officia.</p>
</div><div>
<ComposableMap
  projection="geoMercator"
  projectionConfig={{
    scale: 900,
    center: [0, 54], // Center of the map on initial load
  }}
  width={800}
  height={800}
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
      
          {/* Render Markers for each country */}
          {uniqueCountryData.map((countryData) => {
            console.log("Rendering Marker for:", countryData.country);
            const marker = markers.find(
              (marker) => marker.text === countryData.country
            );

            if (marker) {
              return (
                <Marker
                  key={countryData.country}
                  coordinates={marker.coordinates}
                >
                  <circle r={countryData.count.toString()} fill={marker.fill} />
                  <text
                    textAnchor="middle"
                    y={-15}
                    style={{ fontFamily: "Roboto, sans-serif", fill: "#000" }}
                  >
                    {marker.text}
                  </text>
                </Marker>
              );
            }
            return null;
          })}
      
    </ComposableMap>
        </div>
        </div>
    )   

;}

export default TravelMap