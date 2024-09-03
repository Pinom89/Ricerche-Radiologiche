import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../modules/AuthContext";
import fetchWithAuth from "../../services/fetchWithAuth";
import { Container, Card, Row, Col } from "react-bootstrap";
import formatDate from "../../services/formatdate.js";

export default function MiePrenotazioni() {
  const { pazienteLogin } = useContext(AuthContext);
  // creo stato per memorizzare prenotazioni
  const [prenotazioni, setPrenotazioni] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // funzione per richiamare prenotazioni

  useEffect(() => {
    const fetchPrenotazioni = async () => {
      try {
        const prenotazioni = await fetchWithAuth(
          `${API_URL}/prenotazioni/${pazienteLogin._id}/mie-prenotazioni`
        );
        setPrenotazioni(prenotazioni);
      } catch (error) {
        console.error("Errore nel recupero delle prenotazioni:", error);
      }
    };

    fetchPrenotazioni();
  }, [pazienteLogin._id, API_URL]);

  return (
    <Container>
      <h1 className="mb-4 text-center">Le mie prenotazioni</h1>
      <Row className="my-5">
        {prenotazioni.map((prenotazione) => (
          <Col sm={6} md={4} key={prenotazione._id}>
            <Card
              style={{ width: "25rem" }}
              className="d-flex justify-content-center align-items-center"
            >
              <Card.Img variant="top" src={prenotazione.ricetta} />
              <Card.Body>
                <Card.Title>Esame: {prenotazione.esame}</Card.Title>
                <div>
                  <p> Dati prenotazione:</p>
                  <ul>
                    <li>
                      Data dell'esame: {formatDate(prenotazione.data, "it")}
                    </li>
                    <li>Numero ricetta: {prenotazione.numRicetta}</li>
                    <li>Email della registrazione: {prenotazione.email}</li>
                    <li>
                      Codice esenzione:{" "}
                      {prenotazione.codEsenzione
                        ? prenotazione.codEsezione
                        : "nessuna esenzione"}
                    </li>
                    <li>
                      Stato della prenotazione:{" "}
                      <strong> {prenotazione.stato} </strong>
                    </li>
                    <li>
                      Data creazione: {formatDate(prenotazione.createdAt, "it")}
                    </li>
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
