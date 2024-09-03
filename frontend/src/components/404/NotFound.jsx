import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  CardBody,
  Container,
  Row,
  Col,
  Image
} from "react-bootstrap";
import "./notFound.css";

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(timer);
      navigate("/");
    }

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <>
      <Container fluid className="title_principale_404 mb-4 p-0">
        <Row>
          <Col>
            <h2 className=" text-center title_principale_404 pt-4 pb-4">
              Pagina non trovata - 404
            </h2>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="d-flex flex-column justify-content-center align-items-center">
          <Col md={6} className="text-center">
            <div className="image-404">
                 <Image width={500} height={375} alt="immagine 404 - pagina non trovata" src="https://assets.lummi.ai/assets/QmPFqv1NvwQ196NbCg7CHFXmSrmWESCHgU7TDgAQUWkhEm?auto=format&w=1500"  />
            </div>
          </Col>
          <Col md={6}>
            <Card className="my-3">
             
              <CardBody width={500} height={375} className="text-center">
                <p className="text_404">La pagina che hai cercato non esiste</p>
                <p className="text_404">Reindirizzamento alla Home Page tra {countdown} secondi...</p>
                <Button onClick={() => navigate("/")}>Torna in Home</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NotFound;
