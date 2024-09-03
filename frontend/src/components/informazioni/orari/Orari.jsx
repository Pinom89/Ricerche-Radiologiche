import React from "react";
import "./orari.css";
import { Container, Row, Col } from "react-bootstrap";
import { FaPhoneFlip } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { TiDocumentText } from "react-icons/ti";

export default function Orari() {

    return (
      <>
        <Container fluid className="prenotazione-esame mb-4 p-0">
          <Row>
            <Col>
              <h2 className=" text-center title_principale_orari pt-4 pb-4">
                Orari
              </h2>
            </Col>
          </Row>
        </Container>
        <Container className="mb-4">
          <Row className="ms-3">
            <Col sm={12}>
              <h4 className="h4_orari ps-4 text-center mb-5">
                Orari di apertura
              </h4>
              <p className="text_orari text-center">
                dal lunedì al venerdì dalle ore 8:00 alle 19:00
              </p>
              <p className="text_orari text-center mb-5">
                il sabato dalle ore 8:00 alle 13:00
              </p>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={4}>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <span className="icon_orari mb-3">
                  <FaPhoneFlip />
                </span>
                <h4 className="h4_orari ps-4 text-center mb-4">
                  Prenotazioni telefoniche
                </h4>
                <p className="text_orari text-center">
                  dal lunedì al venerdì dalle ore 8:00 alle 12:00 e dalle ore
                  14:30 alle 18:30
                </p>
                <p className="text_orari text-center">
                  il sabato dalle ore 8:00 alle 12:00
                </p>
              </div>
            </Col>
            <Col sm={12} md={4}>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <span className="icon_orari mb-3">
                  <IoMdPerson />
                </span>
                <h4 className="h4_orari ps-4 text-center mb-4">
                  Prenotazioni di persona
                </h4>
                <p className="text_orari text-center mb-4">
                  dal lunedì al venerdì dalle ore 8:30 alle 19:00
                </p>
                <p className="text_orari text-center mt-2">
                  il sabato dalle ore 8:30 alle 12:30
                </p>
              </div>
            </Col>
            <Col sm={12} md={4}>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <span className="icon_orari mb-3">
                  <TiDocumentText />
                </span>
                <h4 className="h4_orari ps-4 text-center mb-4">
                  Ritiro referti
                </h4>
                <p className="text_orari text-center">
                  dal lunedì al venerdì dalle ore 11:00 alle 13:00 e dalle ore
                  18:00 alle 19:00
                </p>
                <p className="text_orari text-center">
                  il sabato dalle ore 11:00 alle 13:00
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </> 
    );
  } 


