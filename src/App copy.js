import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import MenuTop from './components/MenuTop';
import ToolsPanel from './components/ToolsPanel';

import { CartoSQLLayer, setDefaultCredentials } from '@deck.gl/carto';
import React, { useState } from 'react';
//import {render} from 'react-dom';
import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';

/*
import {brightnessContrast} from '@luma.gl/shadertools/modules/adjust-filters/brightnesscontrast';
import {PostProcessEffect} from '@deck.gl/core';


const postProcessEffect = new PostProcessEffect(brightnessContrast, {
  brightness: 1.0,
  contrast: 1.0
});

*/
const INITIAL_VIEW_STATE = {
  longitude: 0,
  latitude: 0,
  zoom: 2,
  //pitch: 50,
  bearing: 0
};

setDefaultCredentials({
  username: 'public',
  apiKey: 'default_public'
});




export default function App() {
  
  const [continent, setContinent] = useState('All');
  var lineWidthMinPixels = 2;
  const layer = new CartoSQLLayer({
    data: `SELECT * FROM public.ne_50m_admin_0_countries ${getContinentCondition(continent)}`,
    pointRadiusMinPixels: 6,
    getLineColor: [0, 77, 90],
    getFillColor: [0, 77, 90],
    opacity: 0.8,
    lineWidthMinPixels: lineWidthMinPixels,
    updateTriggers: {
      lineWidthMinPixels: ToolsPanel.lineWidthMinPixels
    }
    , getTooltip: ({object}) => object && `Flight ${object.name}`
  });
// Build SQL where condition for the selected continent
function getContinentCondition(continent) {
  //return continent !== 'All' ? `WHERE continent='${continent}'` : '';
  return continent !== 'All' ? `WHERE pop_est>40000000 and continent='${continent}'` : '';
}
  return (
    <div>
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
      <MenuTop name={lineWidthMinPixels} name2="@deck.gl/carto Demo " />
      <Container fluid style={{paddingTop: 15 + 'px'}}>
        <Row>
          <Col xs={3}>
          <ToolsPanel name="Tools" lineWidthMinPixels={lineWidthMinPixels}  
          onChangeValue={lineWidthMinPixels}
          />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

/* global document */
//render(<App />, document.body.appendChild(document.createElement('div')));

