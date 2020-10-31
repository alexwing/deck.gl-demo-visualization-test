import React, { Component } from 'react';
import { CartoSQLLayer, setDefaultCredentials } from '@deck.gl/carto';

import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';


export default class DeckMap extends Component {

  render() {
    const { lineWidth , onChangelineWidth, onChangeColor } = this.props;
    const continent = 'All';
    const INITIAL_VIEW_STATE = {
      longitude: 0,
      latitude: 0,
      zoom: 2,
      //pitch: 50,
      bearing: 0
    };

    function getContinentCondition(continent) {
      //return continent !== 'All' ? `WHERE continent='${continent}'` : '';
      return continent !== 'All' ? `WHERE pop_est>40000000 and continent='${continent}'` : '';
    }


    const layer = new CartoSQLLayer({
      data: `SELECT * FROM public.ne_50m_admin_0_countries ${getContinentCondition(continent)}`,
      pointRadiusMinPixels: 6,
      getLineColor: [0, 77, 90],
      getFillColor: (object) => get_colour(object,this.props.color),
      opacity: 0.8,
      lineWidthMinPixels: this.props.lineWidth,
      updateTriggers: {
        lineWidthMinPixels: this.props.lineWidth,
        getFillColor: (object) => get_colour(object,this.props.color),
      }
    });

    function LightenDarkenColor(col,amt) {
      var usePound = false;
      if ( col[0] == "#" ) {
          col = col.slice(1);
          usePound = true;
      }
  
  
      var r = col[0]  * amt;
      var g = col[1]  * amt;
      var b = col[2]  * amt;
  
      if ( r > 255 ) r = 255;
      else if  (r < 0) r = 0;
  

      if ( b > 255 ) b = 255;
      else if  (b < 0) b = 0;

      if ( g > 255 ) g = 255;
      else if  ( g < 0 ) g = 0;
  
      //return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
      return[r,g,b];
  }

    function get_colour(object,color) {
      
      if (object.properties.pop_est < 1000000) {
        return LightenDarkenColor(color,0);
      } else if (object.properties.pop_est >= 20000000) {
        return LightenDarkenColor(color,0.8);
      } else if (object.properties.pop_est >= 4000000) {
        return LightenDarkenColor(color,0.4);
      } else if (object.properties.pop_est >= 1000000) {
        return LightenDarkenColor(color,0.2);
      }
    }
    return <div>
      <DeckGL
        width="100%"
        height="100%"
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        //   effects= {postProcessEffect}
        layers={[layer]}
      >
        <StaticMap
          reuseMaps
          mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
          preventStyleDiffing
        />
      </DeckGL>
    </div>
  }

}