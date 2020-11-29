import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React, { Component } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import MenuTop from './components/MenuTop';
import ToolsPanel from './components/ToolsPanel';
import DeckMap from './components/DeckMap';

import { hexToRgb } from './components/Utils.js';

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
    color: [255, 0, 0],
    colorStroke: [0, 0, 0],
    continent: "All",
    info: null,
    viewState:VIEW_STATES[0],
    continents:[],
  }

  componentDidMount() {
    this.GetContinents();
  }


  GetContinents() {
    const sql = "SELECT continent, SUM(pop_est) as population FROM public.ne_50m_admin_0_countries GROUP BY continent ORDER BY SUM(pop_est) DESC";

    const { page } = this.state;
    fetch(
      'https://public.carto.com/api/v2/sql?q='+sql,
      {
        method: "GET",
        headers: new Headers({
          Accept: "application/json"
        })
      }
    )
      .then(res => res.json())
      .then(response =>
        this.setState({ continents: response.rows, isLoading: false })
      )  
      .catch(error => console.log(error));
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
  onChangeContinentHandler = (val) => {
    this.setState({ continent: val.target.value })
  }
  onChangeViewHandler = (val) => {

    if ( this.state.viewState === VIEW_STATES[0]){
      this.setState({ viewState: VIEW_STATES[1]});      
    }else{
      this.setState({ viewState: VIEW_STATES[0]});   
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
          continent={this.state.continent}
          onHoverInfo={this.onHoverInfoHandler}
          viewState = {this.state.viewState}
          continents={this.state.continents}
          onDataLoaded = {this.onDataLoadedHandler}
        />
        <MenuTop name="@deck.gl/carto Demo" />
        <Container fluid style={{ paddingTop: 15 + 'px' }}>
          <Row>
            <Col xs={8} md={4} lg={4} xl={3}>
              <ToolsPanel name="Tools"
                lineWidth={this.state.lineWidth} onChangelineWidth={this.onChangelineWidthHandler}
                color={this.state.color} onChangeColor={this.onChangeColorHandler}
                colorStroke={this.state.colorStroke} onChangeColorStroke={this.onChangeColorStrokeHandler}
                continent={this.state.continent} onChangeContinent={this.onChangeContinentHandler}
                info={this.state.info}
                onChangeView={this.onChangeViewHandler}
                continents={this.state.continents}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Main;