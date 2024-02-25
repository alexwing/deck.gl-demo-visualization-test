import React, { useState, useEffect } from "react";
import { StaticMap } from "react-map-gl";
import { DataFilterExtension } from "@deck.gl/extensions";
import DeckGL from "@deck.gl/react";
import { LightenDarkenColor, colorScale } from "./Utils.js";
import { GeoJsonLayer } from "@deck.gl/layers";
import json from "../db/vancouver-blocks.json";
import jsonWorld from "../db/world-population.geojson";

const DeckMap = ({
  onHoverInfo,
  viewState,
  colorStroke,
  color,
  colorHeight,
  lineWidth,
}) => {

  const regionLength = (properties) => {
    //string length
    if (!properties.name) {
      return 0;
    }
    //console.log(properties);
    return (1 / properties.name.length) * 10;
  };

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
      //hide by property name length == 10
      pickable: true,
    }),
    new GeoJsonLayer({
      id: "world-borders",
      data: jsonWorld,
      pointRadiusMinPixels: 6,
      getLineColor: colorStroke,
      extensions: [new DataFilterExtension({filterSize: 1})],
      getFilterValue: f => f.properties.name.length,
      filterRange: [3, colorHeight *3],
      getFillColor: (object) =>
        LightenDarkenColor(
          color,
          regionLength(object.properties) / (colorHeight / 10)
        ),
      opacity: 1,
      pickable: true,
      lineWidthMinPixels: lineWidth,
      updateTriggers: {
        lineWidthMinPixels: lineWidth,
        getLineColor: colorStroke,
        getFillColor: (object) =>
          LightenDarkenColor(
            color,
            regionLength(object.properties) / (colorHeight / 10)
          ),
      },
      onClick: (info) => {
        alert(info.object.properties.name);
      },
      onHover: (info) => {
        onHoverInfo(info);
      },
    }),
  ];

  return (
    <div>
      <DeckGL
        width="100%"
        height="100%"
        initialViewState={viewState}
        controller={true}
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
};

export default DeckMap;
