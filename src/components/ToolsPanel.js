import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table';
import { GithubPicker } from 'react-color';


class ToolsPanel extends Component {
  render() {

   const { height, name, lineWidth, continent, info, continents, onChangelineWidth, onChangeColor, onChangeColorStroke, onChangeContinent, onChangeView } = this.props;


    const options = continents.map(c => (
      <option key={c.continent} value={c.continent}>
        {c.continent} 
      </option>
    )

    );

    const legend = continents.map(c => (
      <tr>
        <td>{c.continent}</td>
        <td align="right">{c !== null ? Intl.NumberFormat().format(c.population) : "NO DATA"}</td>
      </tr>
    ));
    
    return <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0" >
          {name}     
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body style={{ overflowY: "auto", maxHeight: (height-140) +"px"} }>
            <Form>
              <Button type="button" onClick={onChangeView}>Change View</Button>
              <Form.Group controlId="formSelect">
                <Form.Label>Continent: </Form.Label>
                <Form.Control as="select" onChange={onChangeContinent} value={continent}>
                  <option key="ALL" value="ALL">
                    ALL
                  </option>                  
                  {options}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicRange" >
                <Form.Label>Stroke Size</Form.Label>
                <Form.Control type="range" min="0" max="4" value={lineWidth} onChange={onChangelineWidth} />
              </Form.Group>
              <Form.Group controlId="formGithubPicker1" style={{ float: "left", marginLeft:"20px"} }>
                <Form.Label>Stroke Color: </Form.Label>
                <GithubPicker onChangeComplete={onChangeColorStroke} />
              </Form.Group>
              <Form.Group controlId="formGithubPicker2" style={{ float: "left", marginLeft:"20px"}}>
                <Form.Label>Polygon Color: </Form.Label>
                <GithubPicker onChangeComplete={onChangeColor} />
              </Form.Group>
              <Table striped bordered size="sm" >
              <thead>
                  <tr>
                    <th style={{width:"60%"}}>Zone</th>
                    <th style={{textAlign:"Right"}}>Population</th>
                  </tr>
                </thead>
                <tbody >
                  <tr >
                  <td className="table-info" align="left" >{info !== null ? info.properties.name : "NO DATA"}</td>
                    <td className="table-info" align="right">{info !== null ? Intl.NumberFormat().format(info.properties.pop_est) : "NO DATA"}</td>
                  </tr>                  
                {legend}
                </tbody>                
              </Table>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  }

}

export default ToolsPanel;