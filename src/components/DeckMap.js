import React, { Component } from "react";
// import { CartoLayer } from '@deck.gl/carto';

import { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { LightenDarkenColor, colorScale } from "./Utils.js";
import { GeoJsonLayer } from "@deck.gl/layers";

//import json from '../db/cartodb-query.json';
import json from "../db/vancouver-blocks.json";
// world_borders.geojs
import jsonWorld from "../db/world_borders.geojson";

export default class DeckMap extends Component {
  render() {
    const { onHoverInfo, onDataLoaded, viewState } = this.props;
    function getContinentCondition(continent) {
      return continent !== "All" ? `WHERE continent='${continent}'` : "";
    }
    const layers = [
      new GeoJsonLayer({
        id: "geojson",
        data: json,
        opacity: 0.8,
        stroked: false,
        filled: true,
        extruded: true,
        wireframe: true,
        getElevation: (f) => Math.sqrt(f.properties.valuePerSqm) * 10,
        getFillColor: (f) => colorScale(f.properties.growth),
        getLineColor: [255, 255, 255],
        pickable: true,
      }),
      new GeoJsonLayer({
        id: "world-borders",
        data: jsonWorld,
        pointRadiusMinPixels: 6,
        getLineColor: this.props.colorStroke,
        getFillColor: (object) =>
          LightenDarkenColor(
            this.props.color,
            object.properties.mapcolor / (this.props.colorHeight / 10)
          ),
        opacity: 1,
        pickable: true,
        lineWidthMinPixels: this.props.lineWidth,
        updateTriggers: {
          lineWidthMinPixels: this.props.lineWidth,
          getLineColor: this.props.colorStroke,
          getFillColor: (object) =>
            LightenDarkenColor(
              this.props.color,
              object.properties.mapcolor / (this.props.colorHeight / 10)
            ),
        },
        //onClick: (info: PieceEvent) => onClickMap(info),
        // onHover: (info: PieceEvent) => onHoverMap(info),
        onHoverInfo: onHoverInfo,
      }),
    ];
    return (
      <div>
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
    );
  }
}
