import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import fetchWithAuth from "../../../../services/fetchWithAuth.js";
import { BiMailSend } from "react-icons/bi";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

export default function ModificaPrenotazione({
  prenotazione,
  handlePrenotazioneUpdate,
}) {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Modifica Prenotazione
    </Tooltip>
  );

  const esami = [
    "Raggi",
    "Diagnostica Dentale",
    "Ecografia/Ecodoppler",
    "Senologia",
    "Tac",
    "Risonanza Magnetica",
  ];
  const stati = [
    "Aperto",
    "Annullato",
    "Confermato",
    "Chiuso",
    "Modificato",
    "Sospeso",
  ];

  const [ricettaFile, setRicettaFile] = useState(null);

  // funzione di apertura e chiusura del modal

  const [show, setShow] = useState(false);

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const [editPrenotazione, setEditPrenotazione] = useState({
    data: formatDateForInput(prenotazione.data),
    nome: prenotazione.nome,
    cognome: prenotazione.cognome,
    codiceFiscale: prenotazione.codiceFiscale,
    esame: prenotazione.esame,
    numRicetta: prenotazione.numRicetta,
    codEsenzione: prenotazione.codEsenzione,
    email: prenotazione.email,
    stato: prenotazione.stato,
  });

  const resetForm = () => {
    setEditPrenotazione({
      data: editPrenotazione.data,
      nome: editPrenotazione.nome,
      cognome: editPrenotazione.cognome,
      codiceFiscale: editPrenotazione.codiceFiscale,
      esame: editPrenotazione.esame,
      numRicetta: editPrenotazione.numRicetta,
      codEsenzione: editPrenotazione.codEsenzione,
      email: editPrenotazione.email,
      stato: editPrenotazione.stato,
    });
    setRicettaFile(null); // Reset anche il file della ricetta
  };

  const handleClose = () => {
    resetForm();
    setShow(false);
    console.log(editPrenotazione);
  };

  const handleShow = () => {
    setShow(true);
    console.log(prenotazione);
  };
  const handleFileChange = (e) => {
    setRicettaFile(e.target.files[0]);
  };

  const modificaPrenotazione = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(editPrenotazione).forEach((key) => {
      if (
        editPrenotazione[key] !== null &&
        editPrenotazione[key] !== undefined
      ) {
        if (key === "data") {
          // Converti la data nel formato DD/MM/YYYY prima di inviarla
          const [year, month, day] = editPrenotazione[key].split("-");
          formData.append(key, `${day}/${month}/${year}`);
        } else {
          formData.append(key, editPrenotazione[key]);
        }
      }
    });

    if (ricettaFile) {
      formData.append("ricetta", ricettaFile);
    }

    try {
      const updatedPrenotazione = await fetchWithAuth(
        `${
          process.env.REACT_APP_API_URL || "http://localhost:5000"
        }/prenotazioni/${prenotazione._id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      console.log("Prenotazione modificata:", updatedPrenotazione);
      setEditPrenotazione(updatedPrenotazione);
      alert("Prenotazione modificata con successo");
      await handlePrenotazioneUpdate();
      handleClose();
    } catch (err) {
      console.error("Errore nella modifica", err);
      alert("Si è verificato un errore durante la modifica della prenotazione");
    }
  };

  return (
    <>
      <OverlayTrigger
        placement="top-start"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <Button variant="dark" onClick={handleShow}>
          <BiMailSend />
        </Button>
      </OverlayTrigger>

      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Prenotazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="mt-5" onSubmit={modificaPrenotazione}>
            <Form.Group controlId="specialist-dataDiNascita" className="mt-3">
              <Form.Label>Data prenotazione</Form.Label>
              <Form.Control
                size="lg"
                type="date"
                name="data"
                value={editPrenotazione.data}
                onChange={(e) =>
                  setEditPrenotazione({
                    ...editPrenotazione,
                    data: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="prenotazione-nome" className="mt-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder={editPrenotazione.nome}
                name="nome"
                value={editPrenotazione.nome}
                onChange={(e) =>
                  setEditPrenotazione({
                    ...editPrenotazione,
                    nome: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="prenotazione-cognome" className="mt-3">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder={editPrenotazione.cognome}
                name="cognome"
                value={editPrenotazione.cognome}
                onChange={(e) =>
                  setEditPrenotazione({
                    ...editPrenotazione,
                    cognome: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="prenotazione-codiceFiscale" className="mt-3">
              <Form.Label>Codice Fiscale</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder={prenotazione.codiceFiscale}
                name="codiceFiscale"
                value={editPrenotazione.codiceFiscale}
                onChange={(e) =>
                  setEditPrenotazione({
                    ...editPrenotazione,
                    codiceFiscale: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="prenotazione-esame" className="mt-3">
              <Form.Label>Esame</Form.Label>
              <Form.Select
                size="lg"
                name="esame"
                value={editPrenotazione.esame}
                onChange={(e) =>
                  setEditPrenotazione({
                    ...editPrenotazione,
                    esame: e.target.value,
                  })
                }
              >
                <option value="">Seleziona Esame</option>
                {esami.map((esame) => (
                  <option key={esame} value={esame}>
                    {esame}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="prenotazione-numRicetta" className="mt-3">
              <Form.Label>Numero Ricetta</Form.Label>
              <Form.Control
                size="lg"
                type="number"
                placeholder={editPrenotazione.numRicetta}
                name="numRicetta"
                value={editPrenotazione.numRicetta}
                onChange={(e) =>
                  setEditPrenotazione({
                    ...editPrenotazione,
                    numRicetta: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="prenotazione-codEsenzione" className="mt-3">
              <Form.Label>Codice Esenzione</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder={editPrenotazione.codEsenzione}
                name="codEsenzione"
                value={editPrenotazione.codEsenzione}
                onChange={(e) =>
                  setEditPrenotazione({
                    ...editPrenotazione,
                    codEsenzione: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="prenotazione-email" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                size="lg"
                type="email"
                placeholder={editPrenotazione.email}
                required
                name="email"
                value={editPrenotazione.email}
                onChange={(e) =>
                  setEditPrenotazione({
                    ...editPrenotazione,
                    email: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="prenotazione-stato" className="mt-3">
              <Form.Label>Stato</Form.Label>
              <Form.Select
                size="lg"
                name="stato"
                required
                value={editPrenotazione.stato}
                onChange={(e) =>
                  setEditPrenotazione({
                    ...editPrenotazione,
                    stato: e.target.value,
                  })
                }
              >
                <option value="">Seleziona Stato</option>
                {stati.map((stato) => (
                  <option key={stato} value={stato}>
                    {stato}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="prenotazione-ricetta" className="mt-3">
              <Form.Label>Ricetta</Form.Label>
              <Form.Control
                size="lg"
                type="file"
                name="ricetta"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Form.Group className="d-flex mt-3 justify-content-end">
              <Button type="submit" size="lg" variant="dark">
                Modifica Prenotazione
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
