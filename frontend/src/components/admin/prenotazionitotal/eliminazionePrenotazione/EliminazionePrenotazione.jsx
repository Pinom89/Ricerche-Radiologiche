import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdDelete } from "react-icons/md";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import fetchWithAuth from "../../../../services/fetchWithAuth";

function EliminaPrenotazione({id, handlePrenotazioneUpdate}) {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
   
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
 

  const renderTooltip = (props) => (

    <Tooltip id="button-tooltip" {...props}>
      Elimina Prenotazione
    </Tooltip>
  );

  const cancellaPrenotazione = async () => {
    try {
      await fetchWithAuth(`${API_URL}/prenotazioni/${id}`, {
        method: "DELETE",
      });

      // setEquipe(equipe.filter((specialista) => specialista._id !== id));
      alert("Prenotazione eliminata");
      await handlePrenotazioneUpdate();
      handleClose();
    } catch (err) {
      console.log("Errore nella cancellazione", err);
      alert("Errore durante l'eliminazione della prenotazione"); // Opzionale: notifica l'utente dell'errore
    }
  };


  return (
    <>
      <OverlayTrigger
        placement="left"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <Button variant="danger" onClick={handleShow}>
          <MdDelete />
        </Button>
      </OverlayTrigger>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler eliminare questa prenotazione?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={cancellaPrenotazione}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EliminaPrenotazione;
