import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import { TiZoomOutline } from "react-icons/ti";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

function DettaglioRicetta({ fotoRicetta }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Vedi ricetta Medica
    </Tooltip>
  );

  return (
    <>
      <OverlayTrigger
        placement="left"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <Button variant="warning" onClick={handleShow} size="md">
          <TiZoomOutline />
        </Button>
      </OverlayTrigger>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Dettaglio Ricetta </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image
            src={fotoRicetta}
            alt="Ricetta Medica"
            className="w-100 image"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DettaglioRicetta;
