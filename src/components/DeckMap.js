import React, { useState, useEffect } from "react";
import { StaticMap } from "react-map-gl";
import { DataFilterExtension } from "@deck.gl/extensions";
import DeckGL from "@deck.gl/react";
import { LightenDarkenColor, colorScale, hashString } from "./Utils";
import { GeoJsonLayer } from "@deck.gl/layers";

import mapVancouver from "../db/vancouver-blocks.geojson";
import mapWoldPop from "../db/world-population.geojson";

const DeckMap = ({
  onHoverInfo,
  viewState,
  colorStroke,
  color,
  colorHeight,
  continent,
  lineWidth,
}) => {
  const regionLength = (properties) => {
    if (!properties.name) {
      return 0;
    }
    return (1 / properties.name.length) * 10;
  };

  const populationLayer = new GeoJsonLayer({
    id: "map-vancouver",
    data: mapVancouver,
    opacity: 0.8,
    stroked: false,
    filled: true,
    extruded: true,
    wireframe: true,
    getElevation: (f) => Math.sqrt(f.properties.valuePerSqm) * 10,
    getFillColor: (f) => colorScale(f.properties.growth),
    pickable: true,
  });

  const worldLayer = new GeoJsonLayer({
    id: "world-borders",
    data: mapWoldPop,
    pointRadiusMinPixels: 6,
    getLineColor: colorStroke,
    /** Begin of extruded by population 
       extruded: true,
       getElevation: (f) => Math.sqrt(f.properties.pop_est) * 20,
    End of extruded */
    /** Begin of the filter by continent calculated by hash */
    extensions: [new DataFilterExtension({ filterSize: 1 })],
    getFilterValue: (f) =>
      hashString(continent === "All" ? "All" : f.properties.continent),
    filterRange: [hashString(continent), hashString(continent)],
    /** End of the filter */
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
      //filter to selected continent hash [initial value, final value]
      getFilterValue: (f) =>
        hashString(continent === "All" ? "All" : f.properties.continent),
    },
    onClick: (info) => {
      alert(info.object.properties.name);
    },
    onHover: (info) => {
      onHoverInfo(info);
    },
  });

  const layers = [populationLayer, worldLayer];

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
