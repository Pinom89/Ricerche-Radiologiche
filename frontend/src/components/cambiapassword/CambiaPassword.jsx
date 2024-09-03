import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import "./cambiaPassword.css"
import fetchWithAuth from '../../services/fetchWithAuth.js';

export default function Forgotpassword() {
    const navigate = useNavigate();
   
    const API_URL = "http://localhost:5000" || process.env.REACT_APP_API_URL;
  
    const [reset, setReset] = useState({
      currentPassword: "",
      newPassword: ""

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
        currentPassword: "",
        newPassword: ""
      });
    };
  
    const handleResetSubmit = async (e) => {
      e.preventDefault();
      try {
        await fetchWithAuth(`${API_URL}/auth/change-password`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reset),
        });
        //     console.log(reset);
        // if (!response.ok) {
        //   const errorData = await response.json().catch(() => ({}));
        //   console.error("Dettagli errore:", errorData);
        //   throw new Error(
        //     `Errore nelle password: ${
        //       errorData.message || response.statusText
        //     }`
        //   );
        
        alert("Password cambiata con successo");

        setTimeout(() => {
          navigate("/");
          //  console.log('Dati di login inviati:', login);
        }, 1500);
      } catch (error) {
        console.error("Errore ", error);
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
          <Row>
            <Col>
              <Form onSubmit={handleResetSubmit}>
                
                <InputGroup className="mb-3 mt-5">
                  <Form.Control
                    placeholder="Vecchia 
                    password"
                    name="currentPassword"
                   
                    aria-describedby="basic-addon1"
                    type="password"
                    value={reset.currentPassword}
                    onChange={handleInputChange}
                  />
                </InputGroup>
          
         
                <InputGroup className="mb-3 mt-5">
                  <Form.Control
                    placeholder="Nuova password"
                    name="newPassword"
                    
                    aria-describedby="basic-addon1"
                    type="password"
                    value={reset.newPassword}
                    onChange={handleInputChange}
                  />
                </InputGroup>
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <Button variant="dark" type="submit" className="me-2n">
                    Modifica password
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
  