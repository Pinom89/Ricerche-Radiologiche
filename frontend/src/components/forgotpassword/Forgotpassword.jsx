import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import "./forGotPassword.css";

export default function Forgotpassword() {
  const navigate = useNavigate();

  const API_URL = "http://localhost:5000" || process.env.REACT_APP_API_URL;

  const [reset, setReset] = useState({
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReset({
      ...reset,
      [name]: value,
    });
  };

  const handleReset = () => {
    setReset({
      email: "",
    });
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reset),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Dettagli errore:", errorData);
        throw new Error(
          `Errore nella mail: ${errorData.message || response.statusText}`
        );
      }

      await response.json();

      alert("Controlla la tua email per il reset della password");
      setTimeout(() => {
        navigate("/");
        //  console.log('Dati di login inviati:', login);
      }, 1500);
    } catch (error) {
      console.error("Errore nella chiamata API di reset password:", error);
      alert("Email non valida. Riprova.");
    }
  };

  return (
    <>
      <Container fluid className="prenotazione-esame mb-4 p-0">
        <Row>
          <Col>
            <h2 className=" text-center title_principale_login pt-4 pb-4">
              Password dimenticata?
            </h2>
          </Col>
        </Row>
      </Container>
      <Container className="my-5 p-0 font">
        <Row className="d-flex flex-column justify-content-center align-items-center ">
          <Col sm={6} className=" bg-light p-5 ">
            <Form onSubmit={handleResetSubmit} >
              <p className="text-center">Inserisci la tua mail</p>
              <InputGroup className="my-2 ">
                <Form.Control
                  className="email-forgot"
                  placeholder="Email"
                  name="email"
                  aria-label="Inserisci la tua email"
                  aria-describedby="basic-addon1"
                  type="email"
                  value={reset.email}
                  onChange={handleInputChange}
                />
              </InputGroup>
              <div className="d-flex justify-content-center align-items-center gap-2">
                <Button variant="dark" type="submit" className="me-2n">
                  Invia email
                </Button>
                <Button
                  variant="outline-dark"
                  onClick={handleReset}
                  type="button"
                >
                  Resetta
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
