import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import MenuTop from "./components/MenuTop";
import ToolsPanel from "./components/ToolsPanel";
import DeckMap from "./components/DeckMap";

import { hexToRgb } from "./components/Utils";
import infoData from "./db/info.json";

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
  const [info, setInfo] = useState(null);
  const [continents, setContinents] = useState(infoData);
  const [continent, setContinent] = useState("All");
  const [viewState, setViewState] = useState(VIEW_STATES[0]);

  useEffect(() => {
    setContinents(infoData);
  }, []);

  const onChangelineWidthHandler = (val) => {
    setLineWidth(val.target.value);
  };

  const onChangeColorHandler = (color, event) => {
    setColor(hexToRgb(color.hex) as any);
  };

  const onChangeColorStrokeHandler = (color, event) => {
    setColorStroke(hexToRgb(color.hex) as any);
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
        setContinent("All");
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
      />
      <MenuTop name="@deck.gl - DEMO" onSelectMap={onSelectMapHandler} />
      <Container fluid style={{ paddingTop: 15 + "px" }}>
        <Row>
          <Col xs={8} md={4} lg={4} xl={4}>
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
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Main;
