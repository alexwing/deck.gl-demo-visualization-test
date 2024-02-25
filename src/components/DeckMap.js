import React, { useState, useEffect } from "react";
import { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { LightenDarkenColor, colorScale } from "./Utils.js";
import { GeoJsonLayer } from "@deck.gl/layers";
import json from "../db/vancouver-blocks.json";
import jsonWorld from "../db/world_borders.geojson";

const DeckMap = ({ onHoverInfo, onDataLoaded, viewState, colorStroke, color, colorHeight, lineWidth }) => {
  const getContinentCondition = (continent) => {
    return continent !== "All" ? `WHERE continent='${continent}'` : "";
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
      getLineColor: [255, 255, 255],
      pickable: true,
    }),
    new GeoJsonLayer({
      id: "world-borders",
      data: jsonWorld,
      pointRadiusMinPixels: 6,
      getLineColor: colorStroke,
      getFillColor: (object) =>
        LightenDarkenColor(
          color,
          object.properties.mapcolor / (colorHeight / 10)
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
            object.properties.mapcolor / (colorHeight / 10)
          ),
      },
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