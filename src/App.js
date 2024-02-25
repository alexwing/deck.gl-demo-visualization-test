import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import MenuTop from "./components/MenuTop";
import ToolsPanel from "./components/ToolsPanel";
import DeckMap from "./components/DeckMap";

import { hexToRgb } from "./components/Utils.js";

const VIEW_STATES = [
  {
    longitude: 0,
    latitude: 0,
    zoom: 2,
    //pitch: 50,
    bearing: 0,
  },
  {
    latitude: 49.254,
    longitude: -123.13,
    zoom: 11,
    maxZoom: 16,
    pitch: 45,
  },
];

const Main = () => {
  const [lineWidth, setLineWidth] = useState(2);
  const [colorHeight, setColorHeight] = useState(14);
  const [color, setColor] = useState([255, 0, 0]);
  const [colorStroke, setColorStroke] = useState([0, 0, 0]);
  const [height, setHeight] = useState(window.innerHeight);
  const [info, setInfo] = useState(null);
  const [continents, setContinents] = useState([]);
  const [continent, setContinent] = useState("All");
  const [viewState, setViewState] = useState(VIEW_STATES[0]);

  useEffect(() => {
    const continentData = [
      {
        continent: "Asia",
        population: 4098867140,
        percent: 60.32747856761938,
        countries: 53,
      },
      {
        continent: "Africa",
        population: 994676469,
        percent: 14.639733691224942,
        countries: 54,
      },
      {
        continent: "Europe",
        population: 729031916,
        percent: 10.729954347239588,
        countries: 50,
      },
      {
        continent: "North America",
        population: 540816656,
        percent: 7.959785987074366,
        countries: 38,
      },
      {
        continent: "South America",
        population: 394355478,
        percent: 5.804157791527806,
        countries: 13,
      },
      {
        continent: "Oceania",
        population: 34830526,
        percent: 0.5126386728319059,
        countries: 24,
      },
      {
        continent: "Antarctica",
        population: 3802,
        percent: 0.00005595816250684546,
        countries: 1,
      },
    ];
    setContinents(continentData);
  }, []);

  useEffect(() => {
    if (height !== window.innerHeight) {
      setHeight(window.innerHeight);
    }
  }, [height]);

  const onChangelineWidthHandler = (val) => {
    setLineWidth(val.target.value);
  };

  const onChangeColorHandler = (color, event) => {
    setColor(hexToRgb(color.hex));
  };

  const onChangeColorStrokeHandler = (color, event) => {
    setColorStroke(hexToRgb(color.hex));
  };

  const onChangeColorHeightHandler = (val) => {
    setColorHeight(val.target.value);
  };

  const onClickContinentHandler = (val) => {
    if (continent !== val.target.parentNode.id) {
      setContinent(val.target.parentNode.id);
    } else {
      setContinent("All");
    }
  };

  const onSelectMapHandler = (val) => {
    console.log(val.target.id);

    switch (val.target.id) {
      case "GsonLayer":
        setViewState(VIEW_STATES[1]);
        setContinent("NONE");
        break;
      default:
        setViewState(VIEW_STATES[0]);
        setContinent("All");
        break;
    }
  };

  const onHoverInfoHandler = (infoValue) => {
    if (!infoValue.object) {
      setInfo(null);
    } else {
      setInfo(infoValue.object);
    }
  };

  return (
    <div>
      <DeckMap
        lineWidth={lineWidth}
        color={color}
        colorStroke={colorStroke}
        colorHeight={colorHeight}
        continent={continent}
        onHoverInfo={onHoverInfoHandler}
        viewState={viewState}
        continents={continents}
      />
      <MenuTop name="@deck.gl - DEMO" onSelectMap={onSelectMapHandler} />
      <Container fluid style={{ paddingTop: 15 + "px" }}>
        <Row>
          <Col xs={8} md={4} lg={4} xl={3}>
            <ToolsPanel
              name="Tools"
              lineWidth={lineWidth}
              onChangelineWidth={onChangelineWidthHandler}
              color={color}
              onChangeColor={onChangeColorHandler}
              colorStroke={colorStroke}
              onChangeColorStroke={onChangeColorStrokeHandler}
              colorHeight={colorHeight}
              onChangeColorHeight={onChangeColorHeightHandler}
              continent={continent}
              onClickContinent={onClickContinentHandler}
              info={info}
              continents={continents}
              height={height}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Main;
