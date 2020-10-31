import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

// Continents to filter by
const continents = ['All', 'Africa', 'Asia', 'South America', 'North America', 'Europe', 'Oceania'];
const options = continents.map(c => (
  <option key={c} lineWidth={c}>
    {c}
  </option>
));
// Styles for continent selector
const selectStyles = {
  position: 'absolute',
  zIndex: 1
};



class ToolsPanel extends Component {


    render() {
      const { lineWidth , onChangelineWidth } = this.props;
      return <Card>
      <Card.Header>{this.props.name}</Card.Header>
      <Card.Body>
        <Card.Title>Modify the values to apply the changes to the map .</Card.Title>
        <Form>
          <Form.Group controlId="formBasicRange">
            <Form.Label>Line Width</Form.Label>
            <Form.Control type="range" min="0" max="4" value={lineWidth}  onChange={onChangelineWidth}/>
          </Form.Group>
          <Form.Group controlId="formSelect">
            <Form.Label>Continent: </Form.Label>
            <select style={selectStyles} onChange={e => e.currentTarget.value}>
            {options}
         </select>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>;
    }

}

export default ToolsPanel;