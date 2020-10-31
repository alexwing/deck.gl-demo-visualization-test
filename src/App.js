import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React, { Component } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import MenuTop from './components/MenuTop';
import ToolsPanel from './components/ToolsPanel';
import DeckMap from './components/DeckMap';

import {hexToRgb} from './components/Utils.js';


class Main extends Component {
  state = {
    lineWidth: 2,
    color: [255, 0, 0],
    colorStroke: [0, 0, 0]
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


  

  render() {
    return (
      <div>
        <DeckMap lineWidth={this.state.lineWidth}
                 color={this.state.color} 
                 colorStroke={this.state.colorStroke} 
        />
        <MenuTop name="@deck.gl/carto Demo" />
        <Container fluid style={{ paddingTop: 15 + 'px' }}>
          <Row>
            <Col xs={8} md={3} xl={2}>
              <ToolsPanel name="Tools" 
                lineWidth={this.state.lineWidth} onChangelineWidth={this.onChangelineWidthHandler}
                color={this.state.color} onChangeColor={this.onChangeColorHandler}
                colorStroke={this.state.colorStroke} onChangeColorStroke={this.onChangeColorStrokeHandler}
              />
            </Col> 
          </Row>
        </Container>
      </div>
    );
  }
}

export default Main;