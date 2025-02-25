import React, { useState, useCallback } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import TravelMapData, { CountryData } from "./travelmapdata";
import markers from "./markers";
import './styles.css';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const TravelMap: React.FC = () => {
  const [uniqueCountryData, setUniqueCountryData] = useState<CountryData[]>([]);

  const handleCountryData = useCallback((data: CountryData[]) => {
    setUniqueCountryData(data);
  }, []);

  return (
    <div className="bg-gray-700 grid grid-cols-2 md:grid-cols-2">
      <div>
        <h1 className="text-2xl text-left text-white py-8 px-4">Explore Alison's Interactive Travel Map</h1>

        <p className="text-left text-white py-1 px-4">
          Welcome to Alison's interactive travel map! This map allows you to embark on a virtual journey through 
          European countries and discover the places where she traveled to and has captured memories.
        </p>
        <p className="text-left text-white py-1 px-4"> 
          Alison's travel map lets you visually explore where she has been and the stories she's captured. Whether
          you're planning your next adventure or simply curious about the world, her map provides a unique way to 
          connect with different places and cultures.
        </p>
      </div>
      <div>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 775,
            center: [0, 54], // Center of the map on initial load
          }}
          width={800}
          height={700}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }: any) =>
              geographies.map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#355233"
                  stroke="#3C629E"
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
                  <circle r={countryData.count} fill={marker.fill} />
                  <text
                    textAnchor="start"
                    y={-15}
                    x={5}
                    style={{ fontFamily: "Roboto, sans-serif", fill: "#fff", fontWeight: 'bold' }}
                  >
                    {marker.text}
                  </text>
                  <text x={5} y={10} style={{ fontFamily: "Roboto, sans-serif", fill: "#A0BCEB", fontWeight: 'lighter' }}>
                    Photos: {countryData.count}
                  </text>
                </Marker>
              );
            }
            return null;
          })}
        </ComposableMap>
        <TravelMapData onCountryData={handleCountryData} />
      </div>
    </div>
  );
};

export default TravelMap;
