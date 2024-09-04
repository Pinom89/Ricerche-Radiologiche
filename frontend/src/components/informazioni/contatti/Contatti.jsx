import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./contatti.css";
import fetchWithAuth from "../../../services/fetchWithAuth";
import { FaPhoneFlip } from "react-icons/fa6";

export default function Contatti() {
  // setto link database standard per effettuare fetch
  const API_URL = process.env.REACT_APP_API_URL ||"http://localhost:5000";

  // creo funzione per acquisire il al cambiamento del di ogni input del form "chiave e valore"
  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;

    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // setto i valori inizialmente vuoti prima di popolare il form
  const [register, setRegister] = useState({
    nome: "",
    cognome: "",
    telefono: "",
    email: "",
    messaggio: "",
    risposta: "",
    stato: "Nuovo",
  });

  // effettuo post dei dati
  // const handleRegisterSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetchWithAuth(`${API_URL}/contatti`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(register),
  //     });
  //     // creo un test interno per verificare il successo della chiamata POST
  //     console.log("Risposta dal server:", response);

  //     await response.json();
  //     console.log("Dati ricevuti:", register);
  //     alert("Messaggio inviato con successo");
  //     setRegister({
  //       nome: "",
  //       cognome: "",
  //       email: "",
  //       telefono: "",
  //       messaggio: "",
  //     });
  //   } catch (error) {
  //     console.error("Errore durante la registrazione:", error);
  //     // } finally {
  //     //   //avviso l'utente del messaggio inviato correttamente;
  //     //   alert("Messaggio inviato");
  //   }
  // };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
       await fetchWithAuth(`${API_URL}/contatti`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(register),
      });

      alert("Messaggio inviato con successo");
      setRegister({
        nome: "",
        cognome: "",
        email: "",
        telefono: "",
        messaggio: "",
      });
    } catch (error) {
      console.error("Errore dettagliato:", error);
      alert(`Errore durante l'invio del messaggio: ${error.message}`);
    }
  };

  //setto stato isVisible a falso e solo quando passerà a vero verrà visualizzata icona del telefono
  const [isVisible, setIsVisible] = useState(false);

  // imposto useEffect per avviare icona solo al caricamento della pagina e dopo il timer
  useEffect(() => {
    // imposto timer a 1.5 secondi
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Container fluid className="prenotazione-esame mb-4 p-0">
        <Row>
          <Col>
            <h2 className=" text-center title_principale_contatti pt-4 pb-4">
              Contatti
            </h2>
          </Col>
        </Row>
      </Container>
      <Container className="mb-4">
        <Row>
          <Col sm={12} md={10}>
            <div className="text_esame py-3 px-2 my-2">
              <p className="text-center">
                Per richieste di prenotazioni esami utilizzare la sezione{" "}
                <Link to="/prenota-esame">PRENOTA ESAME</Link>.
              </p>
            </div>

            <h4 className="h4_referti ps-4 title_referti my-3">Contattaci</h4>
            <Form onSubmit={handleRegisterSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formNome">
                    <Form.Label className="mt-2 title_form_prenotazione">
                      Nome
                    </Form.Label>
                    <Form.Control
                      type="text"
                      required
                      name="nome"
                      onChange={handleRegisterInputChange}
                      value={register.nome}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formCognome">
                    <Form.Label className="mt-2 title_form_prenotazione">
                      Cognome
                    </Form.Label>
                    <Form.Control
                      type="text"
                      required
                      name="cognome"
                      onChange={handleRegisterInputChange}
                      value={register.cognome}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="formTelefono">
                    <Form.Label className="mt-2 title_form_prenotazione">
                      Telefono
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="telefono"
                      onChange={handleRegisterInputChange}
                      value={register.telefono}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formEmail">
                    <Form.Label className="mt-2 title_form_prenotazione">
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      required
                      name="email"
                      onChange={handleRegisterInputChange}
                      value={register.email}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId="formMessaggio">
                    <Form.Label className="mt-2 title_form_prenotazione">
                      Messaggio
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      required
                      name="messaggio"
                      onChange={handleRegisterInputChange}
                      value={register.messaggio}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col>
                  <Button
                    type="submit"
                    size="md"
                    className="btn_prenota_online my-5 mx-2 btn-primary py-2"
                  >
                    Invia mail
                  </Button>
                  <Button
                    className="my-5 mx-2"
                    variant="outline-dark"
                    onClick={() =>
                      setRegister({
                        nome: "",
                        cognome: "",
                        telefono: "",
                        email: "",
                        messaggio: "",
                      })
                    }
                  >
                    Reset
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col sm={12} md={2}>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h6 className="h4_referti text-center">Chiamaci</h6>
              <div
                className={`icon-container ${isVisible ? "fade-in" : ""} my-2`}
              >
                <FaPhoneFlip className="my-2 icon_referti" />
              </div>
              <h4 className="h4_contatti mt-2"> 080 000 0000</h4>
              <h6 className="h6_contatti text-center">
                Dal lunedì al venerdì:
              </h6>
              <p className="text_contatti text-center">
                dalle 08:00 alle 12:00
              </p>
              <p className="mb-2 text_contatti text-center">
                dalle 14:30 alle 18:30
              </p>
              <h6 className="h6_contatti text-center">Sabato:</h6>
              <p className="text_contatti mb-2 text-center">
                dalle 08:00 alle 12:00
              </p>
              <p className="text_contatti text-center">
                oppure compila il modulo per richiedere una prenotazione
              </p>
              <Button
                as={Link}
                to="/prenota-esame"
                className="btn_prenota_online my-5 mx-2 btn-primary py-2"
              >
                Prenota online
              </Button>
              <h4 className="h4_contatti"> Dove Siamo</h4>
              <p className="text_contatti">Ricerche Radiologiche S.r.l.</p>
              <p className="text_contatti">Via Roma 1, 00100 Roma</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
