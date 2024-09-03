import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import Counter1 from "./counter/Counter1";
import Counter2 from "./counter/Counter2";
import Counter3 from "./counter/Counter3";
import Counter4 from "./counter/Counter4";
import Ge from "../../../image/partners/ge.png";
import Bracco from "../../../image/partners/bracco.png";
import Philips from "../../../image/partners/philips.png";
import Agfa from "../../../image/partners/agfa.png";
import Sirona from "../../../image/partners/sirona.png";
import NewTom from "../../../image/partners/newtom.png";
import Xeros from "../../../image/partners/xerox.png";
import Bayer from "../../../image/partners/bayer.png";
import "./finalPage.css";

export default function FinalPage() {
  return (
    <Container fluid data-testid="mock-finalpage">
      <Row>
        <Col sm={12} className="my-4">
          <h2 className="text-center h2_final my-3">
            L'orgoglio dei nostri risultati
          </h2>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={6} lg={3} className="m-0 p-0">
          <Counter1 />
        </Col>
        <Col sm={12} md={6} lg={3} className="m-0 p-0">
          <Counter2 />
        </Col>
        <Col sm={12} md={6} lg={3} className="m-0 p-0">
          <Counter3 />
        </Col>
        <Col sm={12} md={6} lg={3} className="m-0 p-0">
          <Counter4 />
        </Col>
      </Row>
      <Row className="my-4">
        <Col sm={12}>
          <h2 className="text-center h2_final my-3">I nostri partners</h2>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center ">
        <Col xs={6} sm={4} md={3} lg={2} className="mb-3 text-center">
          <Image src={Ge} fluid className="slide-in-fwd-center" />
        </Col>
        <Col xs={6} sm={4} md={3} lg={2} className="mb-3 text-center">
          <Image src={Bracco} fluid className="slide-in-fwd-center"/>
        </Col>
        <Col xs={6} sm={4} md={3} lg={2} className="mb-3 text-center">
          <Image src={Philips} fluid className="slide-in-fwd-center"/>
        </Col>
        <Col xs={6} sm={4} md={3} lg={2} className="mb-3 text-center">
          <Image src={Agfa} fluid className="slide-in-fwd-center"/>
        </Col>
        <Col xs={6} sm={4} md={3} lg={2} className="mb-3 text-center">
          <Image src={Sirona} fluid className="slide-in-fwd-center"/>
        </Col>
        <Col xs={6} sm={4} md={3} lg={2} className="mb-3 text-center">
          <Image src={NewTom} fluid className="slide-in-fwd-center"/>
        </Col>
        <Col xs={6} sm={4} md={3} lg={2} className="mb-3 text-center">
          <Image src={Xeros} fluid className="slide-in-fwd-center"/>
        </Col>
        <Col xs={6} sm={4} md={3} lg={2} className="mb-3 text-center">
          <Image src={Bayer} fluid className="slide-in-fwd-center"/>
        </Col>
      </Row>
    </Container>
  );
}
