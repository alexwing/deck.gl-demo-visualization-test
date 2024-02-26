import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import { GithubPicker } from 'react-color';
import { MDBProgress } from 'mdbreact';

import { LazyRound } from './Utils';

const ToolsPanel = (props) => {
  const {
    height,
    name,
    lineWidth,
    colorHeight,
    continent,
    info,
    continents,
    onChangelineWidth,
    onChangeColor,
    onChangeColorStroke,
    onClickContinent,
    onChangeColorHeight,
  } = props;

  const Legend = (
    <Row style={{ marginLeft: "-20px", marginRight: "-20px" }}>
      <Col lg={12} className='tablePop'>
        <Table striped bordered hover size="sm" className="legend">
          <thead>
            <tr>
              <th style={{ width: "45%" }}>Zone</th>
              <th style={{ width: "10%", textAlign: "right" }}>Count</th>
              <th style={{ width: "15%", textAlign: "right" }}>Pop</th>
              <th style={{ width: "15%", textAlign: "right" }}>Percent</th>
              <th style={{ width: "15%", textAlign: "center" }}>Chart</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="table-info" align="left">
                {info !== null ? (
                  info.properties.name
                ) : (
                  <i style={{ color: "gray" }}>info here</i>
                )}
              </td>
              <td className="table-info" align="right">
                {info !== null ? 1 : 0}
              </td>
              <td className="table-info" align="right">
                {info !== null
                  ? LazyRound(
                      Intl.NumberFormat().format(info.properties.pop_est)
                    )
                  : "0"}
              </td>
              <td className="table-info" align="right">
                {info !== null
                  ? Intl.NumberFormat("en-IN", {
                      maximumFractionDigits: 1,
                      minimumFractionDigits: 1,
                    }).format(info.properties.percent) + "%"
                  : "0%"}
              </td>
              <td className="table-info" align="right">
                <MDBProgress
                  material
                  value={
                    info !== null ? Math.round(info.properties.percent) : 0
                  }
                  height="20px"
                  color="success"
                />
              </td>
            </tr>
            {continents.map((c) => (
              <tr
                key={c.continent + c.percent}
                onClick={onClickContinent}
                id={c.continent}
                className={c.continent === continent ? "table-primary" : ""}
              >
                <td>{c.continent}</td>
                <td align="right">
                  {c !== null
                    ? LazyRound(Intl.NumberFormat().format(c.countries))
                    : "0"}
                </td>
                <td align="right">
                  {c !== null
                    ? LazyRound(Intl.NumberFormat().format(c.population))
                    : "0"}
                </td>
                <td align="right">
                  {c !== null
                    ? Intl.NumberFormat("en-IN", {
                        maximumFractionDigits: 1,
                        minimumFractionDigits: 1,
                      }).format(c.percent) + "%"
                    : "NO DATA"}
                </td>
                <td>
                  <MDBProgress
                    material
                    value={c !== null ? Math.round(c.percent) : 0}
                    height="20px"
                    color="success"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );

  return (
    <Accordion defaultActiveKey="0" className="toolsPanelContainer">
      <Accordion.Item eventKey="0">
        <Accordion.Header>{name}</Accordion.Header>
      </Accordion.Item>
      <Accordion.Collapse eventKey="0">
        <Card>
          <Card.Body>
            <Form>
              <Row>
                <Col xs={12} lg={6}>
                  <Form.Group controlId="formBasicRange">
                    <Form.Label>Stroke Size</Form.Label>
                    <Form.Control
                      type="range"
                      min="0"
                      max="4"
                      value={lineWidth}
                      onChange={onChangelineWidth}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} lg={6}>
                  <Form.Group controlId="formBasicRange2">
                    <Form.Label>Color Height</Form.Label>
                    <Form.Control
                      type="range"
                      min="0"
                      max="50"
                      value={colorHeight}
                      onChange={onChangeColorHeight}
                    />
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
        </Card>
      </Accordion.Collapse>
    </Accordion>
  );
};

export default ToolsPanel;