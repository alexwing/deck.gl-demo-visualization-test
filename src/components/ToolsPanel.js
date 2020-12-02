import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table';
import { GithubPicker } from 'react-color';
import { MDBProgress } from 'mdbreact';


import { LazyRound } from './Utils.js';


class ToolsPanel extends Component {
  render() {

    const { height, name, lineWidth, colorHeight, continent, info, continents, onChangelineWidth, onChangeColor, onChangeColorStroke, onChangeContinent, onChangeView, onChangeColorHeight } = this.props;
    const options = continents.map(c => (
      <option key={c.continent} value={c.continent}>
        {c.continent}
      </option>
    ));

    const Legend = (
      <Row style={{ marginLeft: "-20px", marginRight: "-20px" }}>
        <Col lg={12} style={{ paddingLeft: "0px", paddingRight: "0px" }}>
          <Table striped bordered hover size="sm" className="legend">
            <thead>
              <tr>
                <th style={{ width: "45%" }}>Zone</th>
                <th style={{ width: "10%", textAlign: "Right" }}>Count</th>
                <th style={{ width: "15%", textAlign: "Right" }}>Pop</th>
                <th style={{ width: "15%", textAlign: "Right" }}>Percent</th>
                <th style={{ width: "15%", textAlign: "Center" }}>Chart</th>
              </tr>
            </thead>
            <tbody >
              <tr >
                <td className="table-info" align="left" >{info !== null ? info.properties.name : <i style={{ color: "gray" }}>Mouse info here</i>}</td>
                <td className="table-info" align="Right" >{info !== null ? 1 : 0}</td>
                <td className="table-info" align="right">{info !== null ? LazyRound(Intl.NumberFormat().format(info.properties.pop_est)) : "0"}</td>
                <td className="table-info" align="right">{info !== null ? Intl.NumberFormat('en-IN', { maximumFractionDigits: 1, minimumFractionDigits: 1, }).format(info.properties.percent) + "%" : "0%"}</td>
                <td className="table-info" align="right">
                  <MDBProgress material value={info !== null ? Math.round(info.properties.percent) : 0} height="20px" color="success" />
                </td>
              </tr>
              {continents.map(c => (
                <tr key={c.continent}>
                  <td>{c.continent}</td>
                  <td td align="right">{c !== null ? LazyRound(Intl.NumberFormat().format(c.countries)) : "0"}</td>
                  <td align="right">{c !== null ? LazyRound(Intl.NumberFormat().format(c.population)) : "0"}</td>
                  <td align="right">{c !== null ? Intl.NumberFormat('en-IN', { maximumFractionDigits: 1, minimumFractionDigits: 1, }).format(c.percent) + "%" : "NO DATA"}</td>
                  <td>
                    <MDBProgress material value={c !== null ? Math.round(c.percent) : 0} height="20px" color="success" />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    );

    return <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0" >
          {name}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body style={{ overflowY: "auto", maxHeight: (height - 140) + "px" }}>
            <Form>
              <Row>
                <Col lg={12} xl={4}>
                  <Form.Label>View: </Form.Label>
                  <Button type="button" onClick={onChangeView} style={{ width: "100%" }}>Change</Button>
                </Col>
                <Col lg={12} xl={8}>
                  <Form.Group controlId="formSelect">
                    <Form.Label>Continent: </Form.Label>
                    <Form.Control as="select" onChange={onChangeContinent} value={continent}>
                      <option key="All" value="All">
                        All
                      </option>
                      {options}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} lg={6} >
                  <Form.Group controlId="formBasicRange">
                    <Form.Label>Stroke Size</Form.Label>
                    <Form.Control type="range" min="0" max="4" value={lineWidth} onChange={onChangelineWidth} />
                  </Form.Group>
                </Col>
                <Col xs={12} lg={6}>
                  <Form.Group controlId="formBasicRange2">
                    <Form.Label>Color Height</Form.Label>
                    <Form.Control type="range" min="0" max="100" value={colorHeight} onChange={onChangeColorHeight} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} lg={6}>
                  <Form.Group controlId="formGithubPicker1">
                    <Form.Label>Stroke Color: </Form.Label>
                    <GithubPicker onChangeComplete={onChangeColorStroke} />
                  </Form.Group>
                </Col>
                <Col xs={12} lg={6}>
                  <Form.Group controlId="formGithubPicker2">
                    <Form.Label>Polygon Color: </Form.Label>
                    <GithubPicker onChangeComplete={onChangeColor} />
                  </Form.Group>
                </Col>
              </Row>
              {Legend}
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  }

}

export default ToolsPanel;