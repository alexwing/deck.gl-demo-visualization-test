import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import { GithubPicker } from 'react-color';


class ToolsPanel extends Component {
  render() {
    // Continents to filter by
    const continents = ['All', 'Africa', 'Asia', 'South America', 'North America', 'Europe', 'Oceania'];
    const options = continents.map(c => (
      <option key={c} lineWidth={c}>
        {c}
      </option>
    ));
    const {name, lineWidth,continent, onChangelineWidth, onChangeColor, onChangeColorStroke,onChangeContinent } = this.props;
    return <Accordion defaultActiveKey="0">
    <Card>
    <Accordion.Toggle as={Card.Header} eventKey="0" >
      {name}
    </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
        <Card.Body>
        <Form>
            <Form.Group controlId="formSelect">
              <Form.Label>Continent: </Form.Label>
              <Form.Control as="select" onChange={onChangeContinent} value={continent}>
                {options}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicRange">
              <Form.Label>Stroke Size</Form.Label>
              <Form.Control type="range" min="0" max="4" value={lineWidth} onChange={onChangelineWidth} />
            </Form.Group>
            <Form.Group controlId="formGithubPicker1">
              <Form.Label>Stroke Color: </Form.Label>
              <GithubPicker onChangeComplete={onChangeColorStroke} />
            </Form.Group>
            <Form.Group controlId="formGithubPicker2">
              <Form.Label>Polygon Color: </Form.Label>
              <GithubPicker onChangeComplete={onChangeColor} />
            </Form.Group>
          </Form> 
        </Card.Body>
      </Accordion.Collapse>
    </Card>    
  </Accordion>
  }

}

export default ToolsPanel;