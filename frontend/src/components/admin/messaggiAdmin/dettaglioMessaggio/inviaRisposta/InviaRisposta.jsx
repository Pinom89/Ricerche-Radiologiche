import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Modal, Form, Button } from "react-bootstrap";
import "./inviaRisposta.css";
import fetchWithAuth from "../../../../../services/fetchWithAuth.js";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

export default function InviaRisposta({ messaggio, handleMessageUpdate }) {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Modifica
    </Tooltip>
  );

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // funzione di apertura e chiusura del modal

  const [show, setShow] = useState(false);

  const [editMessage, setEditMessage] = useState({
    messaggio: messaggio.messaggio,
    risposta: messaggio.risposta,
    stato: messaggio.stato,
  });

  const handleClose = () => {
    //resetForm();
    setShow(false);
    console.log(editMessage);
  };

  const handleShow = () => {
    setShow(true);
    console.log(messaggio);
  };

  const modificaMessage = async (e) => {
    e.preventDefault();
    try {
      const updatedMessage = await fetchWithAuth(
        `${API_URL}/contatti/${messaggio._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...editMessage,
            stato: "Risposta inviata",
          }),
        }
      );

      //  console.log("Messaggio modificato:", updatedMessage );
      setEditMessage(updatedMessage);
      alert("Messaggio inviato con successo");
      await handleMessageUpdate();
      handleClose();
    } catch (err) {
      console.error("Errore nella modifica", err);
      alert("Si è verificato un errore durante la modifica del messaggio");
    }
  };

  return (
    <>
      <OverlayTrigger
        placement="left"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <Button variant="dark" onClick={handleShow} className="text-center">
          <FaEdit />
        </Button>
      </OverlayTrigger>

      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Invia Risposta a: {messaggio.nome + " " + messaggio.cognome}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="mt-5" onSubmit={modificaMessage}>
            <Form.Group controlId="messaggio-contatto" className="mt-3">
              <Form.Label>Messaggio</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder={editMessage.messaggio}
                name="messaggio"
                value={editMessage.messaggio}
                onChange={(e) =>
                  setEditMessage({
                    ...editMessage,
                    messaggio: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="messaggio-risposta" className="mt-3">
              <Form.Label>Risposta</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                as="textarea"
                name="riposta"
                value={editMessage.risposta}
                onChange={(e) =>
                  setEditMessage({
                    ...editMessage,
                    risposta: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="d-flex mt-3 justify-content-end">
              <Button type="submit" size="lg" variant="dark">
                Invia Messaggio
              </Button>
              <Button
                size="lg"
                variant="danger"
                className="ms-3"
                onClick={handleClose}
              >
                Reset
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
