import React, { useEffect, useState } from "react";
import Map, { ViewState } from "react-map-gl";
import { DataFilterExtension } from "@deck.gl/extensions";
import DeckGL from "@deck.gl/react";
import {
  AlphaColor,
  LightenDarkenColor,
  colorScale,
  hashString,
} from "./Utils";
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
  populationLimit,
}) => {
  const regionLength = (properties) => {
    if (!properties.name) {
      return 0;
    }
    // percentage of population with respect to the total population
    const pop = properties.pop_est;
    const total = 500000000;
    const percent = (pop / total) * 100;
    // percentage of the color and colorHeight with respect to the total percentage
    const colorPercent = (colorHeight / 100) * percent;
    return colorPercent;
  };
  const [mapStyle, setMapStyle] = useState("");
  const [selected, setSelected] = useState(null as any);

  useEffect(() => {
    setMapStyle(
      "https://basemaps.cartocdn.com/gl/voyager-nolabels-gl-style/style.json"
    );
  }, []);

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

  const getSelectedColor = (object: any) => {
    if (
      selected !== null &&
      selected?.properties?.name === object?.properties?.name
    ) {
      return [255, 255, 0];
    }
    return LightenDarkenColor(color, regionLength(object?.properties));
  };

  const getAlpha = (object: any) => {
    if (continent === "All") {
      return 255;
    }
    if (continent === object?.properties?.continent) {
      return 255;
    }
    return 20;
  };

  const worldLayer = new GeoJsonLayer({
    id: "world-borders",
    data: mapWoldPop,
    pointRadiusMinPixels: 6,
    getLineColor: colorStroke,
    /** Begin of extruded by population 
       extruded: true,
       getElevation: (f) => Math.sqrt(f.properties.pop_est) * 20,
    End of extruded */
    /** Begin of the filter by continent calculated by hash 
    extensions: [new DataFilterExtension({ filterSize: 1 })],
    getFilterValue: (f) =>
      hashString(continent === "All" ? "All" : f.properties.continent),
    filterRange: [hashString(continent), hashString(continent)],
    /** End of the filter */
    /** With population limit */
    extensions: [new DataFilterExtension({ filterSize: 1 })],
    getFilterValue: (f) => parseInt(f.properties.pop_est),
    filterRange: [0, populationLimit],
    getFillColor: (object) =>
      AlphaColor({
        col: getSelectedColor(object),
        alpha: getAlpha(object),
      }),
    opacity: 1,
    pickable: true,
    lineWidthMinPixels: lineWidth,
    updateTriggers: {
      lineWidthMinPixels: lineWidth,
      getLineColor: colorStroke,
      getFillColor: (object) =>
        AlphaColor({
          col: getSelectedColor(object),
          alpha: getAlpha(object),
        }),
      /* filter to selected continent hash [initial value, final value]
      getFilterValue: (f) =>
        hashString(continent === "All" ? "All" : f.properties.continent),
      */
      /* filter to population limit */
      getFilterValue: (f) => parseInt(f.properties.pop_est),
      filterRange: [0, populationLimit],
    },
    onClick: (info) => {
      if (info.object === selected) {
        setSelected(null);
      } else {
        setSelected(info.object);
      }
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
        <Map mapStyle={mapStyle} />
      </DeckGL>
    </div>
  );
};

export default DeckMap;
