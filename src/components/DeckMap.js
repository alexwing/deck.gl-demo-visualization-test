import React, { Component } from 'react';
import { CartoSQLLayer, setDefaultCredentials } from '@deck.gl/carto';

import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';


export default class DeckMap extends Component {

  render() {
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

    const { lineWidth, onChangelineWidth } = this.props;

    const layer = new CartoSQLLayer({
      data: `SELECT * FROM public.ne_50m_admin_0_countries ${getContinentCondition(continent)}`,
      pointRadiusMinPixels: 6,
      getLineColor: [0, 77, 90],
      getFillColor: (object) => {
        if (object.properties.pop_est < 1000000) {
          return [0, 50,50];
        } else if (object.properties.pop_est >= 20000000) {
          return [0, 255, 255];
        } else if (object.properties.pop_est >= 4000000) {
          return [0, 200, 200];
        } else if (object.properties.pop_est >= 1000000) {
          return [0, 100, 100];
        }
      },

      opacity: 0.5,
      lineWidthMinPixels: this.props.lineWidth,
      updateTriggers: {
        lineWidthMinPixels: this.props.lineWidth
      }
      , getTooltip: ({ object }) => object && `Flight ${object.name}`
    });

    function get_colour(d) {
      if (d < 1000000) {
        return [0, 128, 255]
      } else if (d => 10000000) {
        return [255, 100, 128]
      } else if (d => 100000000) {
        return [128, 128, 128]
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