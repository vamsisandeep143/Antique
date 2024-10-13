import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import data from './Canada.json';


export const InteractiveMap = () => {
return(
<div>
<ComposableMap projection="geoAlbers">
        <Geographies geography={data}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
      </ComposableMap>






</div>






)







}