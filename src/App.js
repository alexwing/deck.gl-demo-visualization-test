import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React, { Component } from "react";
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

class Main extends Component {

  state = {
    lineWidth: 2,
    colorHeight: 14,
    color: [255, 0, 0],
    colorStroke: [0, 0, 0],
    continent: "All",
    info: null,
    viewState: VIEW_STATES[0],
    continents: [],
    height: window.innerHeight
  }
  componentDidMount() {
    Querydb("SELECT continent, SUM(pop_est) as population, (SUM(pop_est)* 100 / (SELECT SUM(pop_est) FROM public.ne_50m_admin_0_countries)) as percent,  COUNT(*) as Countries FROM public.ne_50m_admin_0_countries GROUP BY continent ORDER BY SUM(pop_est) DESC").then(response =>
      this.setState({ continents: response.rows})
    )
  }
  componentDidUpdate() {
    if (this.state.height !== window.innerHeight)
      this.setState({ height: window.innerHeight })
  }


  onChangelineWidthHandler = (val) => {
    this.setState({ lineWidth: val.target.value })
  }
  onChangeColorHandler = (color, event) => {
    this.setState({ color: hexToRgb(color.hex) });

  };
  onChangeColorStrokeHandler = (color, event) => {
    this.setState({ colorStroke: hexToRgb(color.hex) });

  };
  
  onChangeColorHeightHandler = (val) => {
    this.setState({ colorHeight: val.target.value })
  }
  onChangeContinentHandler = (val) => {
    this.setState({ continent: val.target.value })
  }
  
  onChangeViewHandler = (val) => {

    if (this.state.viewState === VIEW_STATES[0]) {
      this.setState({ viewState: VIEW_STATES[1] });
    } else {
      this.setState({ viewState: VIEW_STATES[0] });
    }

  }
  onDataLoadedHandler = () => {
    // console.log(this.state.continents.toString());
  }
  onHoverInfoHandler = (info) => {
    if (!info.object) {
      this.setState({ info: null })
      return;
    }
    else {
      this.setState({ info: info.object })
    }
  }

  render() {
    return (
      <div>
        <DeckMap lineWidth={this.state.lineWidth}
          color={this.state.color}
          colorStroke={this.state.colorStroke}
          colorHeight= {this.state.colorHeight}
          continent={this.state.continent}
          onHoverInfo={this.onHoverInfoHandler}
          viewState={this.state.viewState}
          continents={this.state.continents}
          onDataLoaded={this.onDataLoadedHandler}
        />
        <MenuTop name="@deck.gl/carto Demo" />
        <Container fluid style={{ paddingTop: 15 + 'px' }}>
          <Row>
            <Col xs={8} md={4} lg={4} xl={3}>
           
              <ToolsPanel name="Tools"
                lineWidth={this.state.lineWidth} onChangelineWidth={this.onChangelineWidthHandler}
                color={this.state.color} onChangeColor={this.onChangeColorHandler}
                colorStroke={this.state.colorStroke} onChangeColorStroke={this.onChangeColorStrokeHandler}
                colorHeight={this.state.colorHeight} onChangeColorHeight ={this.onChangeColorHeightHandler}
                continent={this.state.continent} onChangeContinent={this.onChangeContinentHandler}
                info={this.state.info}
                onChangeView={this.onChangeViewHandler}
                continents={this.state.continents}
                height={this.state.height}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Main;