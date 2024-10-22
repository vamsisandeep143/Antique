import React from 'react';
import Canadamap from "../Assets/Canadeflag.jpg";
import { ComposableMap, Geographies, Geography, Annotation,Marker  } from 'react-simple-maps';
import data from './Canada.json';
import styled from 'styled-components';
import { geoConicEqualArea, geoCentroid } from 'd3-geo';


// Styled components
const StyledH3 = styled.h3`
  padding: 10px;
  font-family:"EB Garamond", serif;
  font-style:normal;
  font-weight:500;
`;

const StyledH5 = styled.h5`
  padding: 10px;
  font-family:"EB Garamond", serif;
  font-style:normal;
  font-weight:400;

`

const StyledImage = styled.img`
width:200px;
height:200px;
`;

const Styleddiv = styled.div`
display:flex;
flex-direction:row;
align-items:center;
`;

const markers = [
 { name: "Burlington", coordinates: [-79.7990, 43.3255] },
];

export const InteractiveMap = () => {
  // Define the projection using d3-geo's geoConicEqualArea
  const projection = geoConicEqualArea()
    .center([-106.3468, 56.1304])  // Center on Canada (longitude, latitude)
    .parallels([49, 77])           // Standard parallels for Canada
    .scale(800)                    // Adjust the scale for your map
    .translate([400, 200]);        // Translate to the center

  return (
    <div className='container'>
      <StyledH3>
        Currently, we are located at the below location. We will be expanding soon...
      </StyledH3>
      <StyledH5>As we continue to grow, we are excited to announce that we will soon be expanding to bring our unique offerings to even more antique enthusiasts. Stay tuned for more updates as we embark on this new chapter!</StyledH5>

     <Styleddiv>
      <StyledImage src={Canadamap} alt="canadaflag"></StyledImage>
      <ComposableMap projection={projection}>
        <Geographies geography={data}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const centroid = geoCentroid(geo);
              return (
                <React.Fragment key={geo.rsmKey}>
                  {/* Draw the map */}
                  <Geography
                    geography={geo}
                    style={{
                      default: { fill: "#3f88c5" },  // Blue color
                      hover: { fill: "#1c5d99" },    // Darker blue on hover
                      pressed: { fill: "#1c5d99" }   // Same color when clicked
                    }}
                  />
                  {/* Add the province name label at the centroid */}
                  <Annotation
                    subject={centroid}
                    dx={-10}
                    dy={-10}
                    connectorProps={{
                      stroke: "#3f88c5",  // Optional connector stroke
                      strokeWidth: 1,
                      strokeLinecap: "round",
                    }}
                  >
                    <text
                      x="4"
                      fontSize={10}
                      alignmentBaseline="middle"
                      fill="#000"  // Color for text
                    >
                      {geo.properties.NAME}  {/* Display the province name */}
                    </text>
                  </Annotation>
                </React.Fragment>
              );
            })
          }
        </Geographies>
        {markers.map(({ name, coordinates }) => (
          <Marker key={name} coordinates={coordinates}>
            <circle r={6} fill="#FF5722" stroke="#fff" strokeWidth={2} />
            <text
              textAnchor="middle"
              y={-10}
              style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: "10px" }}
            >
              {name}
            </text>
          </Marker>
        ))}
      </ComposableMap>
      </Styleddiv>
    </div>
  );
};
