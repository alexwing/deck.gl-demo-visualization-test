import React, { Component } from 'react';
import { CartoSQLLayer } from '@deck.gl/carto';

import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {LightenDarkenColor} from './Utils.js';
import {GeoJsonLayer} from '@deck.gl/layers';


import json from '../db/cartodb-query.json';


export default class DeckMap extends Component {

  render() {
    const INITIAL_VIEW_STATE = {
      longitude: 0,
      latitude: 0,
      zoom: 2,
      pitch: 50,
      bearing: 0
    };

    function getContinentCondition(continent) {
      return continent !== 'All' ? `WHERE continent='${continent}'` : '';
    }

    const layer = new GeoJsonLayer({
      id: 'geojson-layer',
      json,
      pickable: true,
      stroked: false,
      filled: true,
      extruded: true,
      lineWidthScale: 20,
      lineWidthMinPixels: 2,
      getFillColor: [160, 160, 180, 200],
      getLineColor: [160, 160, 180, 200],
      getRadius: 100,
      getLineWidth: 1,
      getElevation: 30
    });
    const layer2 = new CartoSQLLayer({
      data: `SELECT * FROM public.ne_50m_admin_0_countries ${getContinentCondition(this.props.continent)}`,
      pointRadiusMinPixels: 6,
      getLineColor: (object) => get_colour(object,this.props.colorStroke),
      getFillColor: (object) => get_colour(object,this.props.color),
      opacity: 0.8,
      lineWidthMinPixels: this.props.lineWidth,
      updateTriggers: {
        lineWidthMinPixels: this.props.lineWidth,
        getFillColor: (object) => get_colour(object,this.props.color),
        getLineColor: (object) => get_colour(object,this.props.colorStroke),
      }
    });


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
        layers={[layer2]}
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