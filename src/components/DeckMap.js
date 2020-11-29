import React, { Component } from 'react';
import { CartoSQLLayer } from '@deck.gl/carto';

import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {LightenDarkenColor,colorScale} from './Utils.js';
import {GeoJsonLayer} from '@deck.gl/layers';


//import json from '../db/cartodb-query.json';
import json from '../db/vancouver-blocks.json';


export default class DeckMap extends Component {

  render() {
    const {onHoverInfo,onDataLoaded,viewState } = this.props;
    function getContinentCondition(continent) {
      return continent !== 'All' ? `WHERE continent='${continent}'` : '';
    }
    const layers = [ new GeoJsonLayer({
      data: json,
      opacity: 0.8,
      stroked: false,
      filled: true,
      extruded: true,
      wireframe: true,
      getElevation: f => Math.sqrt(f.properties.valuePerSqm) * 10,
      getFillColor: f => colorScale(f.properties.growth),
      getLineColor: [255, 255, 255],

      pickable: true,


    }),
    new CartoSQLLayer({
      data: `SELECT * FROM public.ne_50m_admin_0_countries ${getContinentCondition(this.props.continent)}`,
      pointRadiusMinPixels: 6,
      getLineColor: (object) => get_colour(object,this.props.colorStroke),
      getFillColor: (object) => get_colour(object,this.props.color),
      opacity: 0.8,
      pickable: true,
      lineWidthMinPixels: this.props.lineWidth,
      updateTriggers: {
        lineWidthMinPixels: this.props.lineWidth,
        getFillColor: (object) => get_colour(object,this.props.color),
        getLineColor: (object) => get_colour(object,this.props.colorStroke),

      },
      onHover: info => onHoverInfo(info),
      onDataLoad: onDataLoaded()

    })
  
  ];


  
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
        initialViewState={viewState}
        controller={true}
        //   effects= {postProcessEffect}
        layers={[layers]}
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