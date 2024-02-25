import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React, { useState, useEffect } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import MenuTop from './components/MenuTop';
import ToolsPanel from './components/ToolsPanel';
import DeckMap from './components/DeckMap';

import { hexToRgb, Querydb } from './components/Utils.js';

const VIEW_STATES = [
  {
    longitude: 0,
    latitude: 0,
    zoom: 2,
    //pitch: 50,
    bearing: 0
  },
  {
    latitude: 49.254,
    longitude: -123.13,
    zoom: 11,
    maxZoom: 16,
    pitch: 45
  }
];

const Main = () => {
  const [state, setState] = useState({
    lineWidth: 2,
    colorHeight: 14,
    color: [255, 0, 0],
    colorStroke: [0, 0, 0],
    continent: "All",
    info: null,
    viewState: VIEW_STATES[0],
    continents: [],
    height: window.innerHeight
  });

  useEffect(() => {
    Querydb("SELECT continent, SUM(pop_est) as population, (SUM(pop_est)* 100 / (SELECT SUM(pop_est) FROM public.ne_50m_admin_0_countries)) as percent,  COUNT(*) as Countries FROM public.ne_50m_admin_0_countries GROUP BY continent ORDER BY SUM(pop_est) DESC").then(response =>
      setState(prevState => ({ ...prevState, continents: response.rows }))
    )
  }, []);

  useEffect(() => {
    if (state.height !== window.innerHeight)
      setState(prevState => ({ ...prevState, height: window.innerHeight }))
  }, [state.height]);

  const onChangelineWidthHandler = (val) => {
    setState(prevState => ({ ...prevState, lineWidth: val.target.value }));
  }

  const onChangeColorHandler = (color, event) => {
    setState(prevState => ({ ...prevState, color: hexToRgb(color.hex) }));
  };

  const onChangeColorStrokeHandler = (color, event) => {
    setState(prevState => ({ ...prevState, colorStroke: hexToRgb(color.hex) }));
  };

  const onChangeColorHeightHandler = (val) => {
    setState(prevState => ({ ...prevState, colorHeight: val.target.value }));
  }

  const onClickContinentHandler = (val) => {
    if (state.continent !== val.target.parentNode.id) {
      setState(prevState => ({ ...prevState, continent: val.target.parentNode.id }));
    } else {
      setState(prevState => ({ ...prevState, continent: "All" }));
    }
  }

  const onSelectMapHandler = (val) => {
    console.log(val.target.id);

    switch (val.target.id) {
      case "GsonLayer":
        setState(prevState => ({ ...prevState, viewState: VIEW_STATES[1], continent: "NONE" }));
        break;
      default:
        setState(prevState => ({ ...prevState, viewState: VIEW_STATES[0], continent: "All" }));
        break;
    }
  }

  const onDataLoadedHandler = () => {
    console.log(state.continents.toString());
  }

  const onHoverInfoHandler = (info) => {
    console.log(" info: ", info);
    if (!info.name) {
      setState(prevState => ({ ...prevState, info: null }));
      return;
    }
    else {
      setState(prevState => ({ ...prevState, info: info.name }));
    }
  }

  return (
    <div>
      <DeckMap lineWidth={state.lineWidth}
        color={state.color}
        colorStroke={state.colorStroke}
        colorHeight={state.colorHeight}
        continent={state.continent}
        onHoverInfo={onHoverInfoHandler}
        viewState={state.viewState}
        continents={state.continents}
        onDataLoaded={onDataLoadedHandler}
      />
      <MenuTop name="@deck.gl/carto Demo" onSelectMap={onSelectMapHandler} />
      <Container fluid style={{ paddingTop: 15 + 'px' }}>
        <Row>
          <Col xs={8} md={4} lg={4} xl={3}>

            <ToolsPanel name="Tools"
              lineWidth={state.lineWidth} onChangelineWidth={onChangelineWidthHandler}
              color={state.color} onChangeColor={onChangeColorHandler}
              colorStroke={state.colorStroke} onChangeColorStroke={onChangeColorStrokeHandler}
              colorHeight={state.colorHeight} onChangeColorHeight={onChangeColorHeightHandler}
              continent={state.continent} onClickContinent={onClickContinentHandler}
              info={state.info}
              continents={state.continents}
              height={state.height}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Main;