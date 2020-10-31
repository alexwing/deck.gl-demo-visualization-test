import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React, { Component } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import MenuTop from './components/MenuTop';
import ToolsPanel from './components/ToolsPanel';
import DeckMap from './components/DeckMap';

class Main extends Component {
  state = {
    lineWidth: 2
  }
  onChangelineWidthHandler = (val) => {
    this.setState({ lineWidth: val.target.value })
  }

  render() {
    return (
      <div>
        <DeckMap lineWidth={this.state.lineWidth} />
        <MenuTop name="@deck.gl/carto Demo" />
        <Container fluid style={{ paddingTop: 15 + 'px' }}>
          <Row>
            <Col xs={12} md={6} xl={3}>
              <ToolsPanel name="Tools" 
                lineWidth={this.state.lineWidth} onChangelineWidth={this.onChangelineWidthHandler}
              />
            </Col> 
          </Row>
        </Container>
      </div>
    );
  }
}

export default Main;