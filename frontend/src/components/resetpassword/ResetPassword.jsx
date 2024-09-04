import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./resetpassword.css";

export default function ResetPassword() {
  const navigate = useNavigate();
  const{id, token} = useParams();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000" 

  const [reset, setReset] = useState({
    password:""
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
      password: "",
    });
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/reset-password/${id}/${token}`, {
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
          `Errore nel reset della password: ${
            errorData.message || response.statusText
          }`
        );
      }

      await response.json();

      alert("Cambio password effettuato");
      setTimeout(() => {
        navigate("/login");
        //  console.log('Dati di login inviati:', login);
      }, 1500);
    } catch (error) {
      console.error("Errore nella chiamata API di reset password:", error);
      alert("Password non valida. Riprova.");
    }
  };

  return (
    <>
      <Container fluid className="prenotazione-esame mb-4 p-0">
        <Row>
          <Col>
            <h2 className=" text-center title_principale_login pt-4 pb-4">
              Reset password
            </h2>
          </Col>
        </Row>
      </Container>
      <Container className="my-5 p-0">
        <Row className="d-flex flex-column justify-content-center align-items-center">
          <Col sm={6} className=" bg-light p-5 ">
            <Form onSubmit={handleResetSubmit}>
              <Form.Label className="text-center">Inserisci nuova password</Form.Label>
              <InputGroup >
                <Form.Control
                  placeholder="Password"
                  name="password"
                  aria-label="Inserisci nuova password"
                  aria-describedby="basic-addon1"
                  type="password"
                  value={reset.password}
                  onChange={handleInputChange}
                />
              </InputGroup>
              <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
                <Button variant="dark" type="submit" className="me-2n">
                  Conferma modifica
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
