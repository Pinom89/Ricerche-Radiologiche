import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import fetchWithAuth from "../../../../services/fetchWithAuth.js";
import "./editequipe.css" 

function EditEquipe({ specialista, handleEquipeUpdate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";



  const [coverFile, setCoverFile] = useState(null);

  const [editSpecialist, setEditSpecialist] = useState({
    nome: specialista.nome,
    cognome: specialista.cognome,
    dataDiNascita: specialista.dataDiNascita,
    specializzazione: specialista.specializzazione,
    title: specialista.title,
  });

  const handleFileChange = (e) => {
    setCoverFile(e.target.files[0]);
  };

  const modificaEquipe = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Aggiungi i campi del blog al FormData
    formData.append("nome", editSpecialist.nome);
    formData.append("cognome", editSpecialist.cognome);
    formData.append("dataDiNascita", editSpecialist.dataDiNascita);
    formData.append("specializzazione", editSpecialist.specializzazione);
    formData.append("title", editSpecialist.title);

    // Aggiungi il file di copertina se presente
    if (coverFile) {
      formData.append("cover", coverFile);
    }

    try {
      const response = await fetchWithAuth(
        `${API_URL}/equipe/${specialista._id}`,
        {
          method: "PATCH",
          body: formData, // Usa formData invece di JSON.stringify(newblog)
        }
      );
      setEditSpecialist(response);
      setEditSpecialist({
        nome: "",
        cognome: "",
        dataDiNascita: "",
        specializzazione: "",
        title: "",
      });
      setCoverFile(null); // Resetta anche il file di copertina
      alert("Medico modificato con successo");
    } catch (err) {
      console.log("Errore nella creazione", err);
    } finally {
      setTimeout(() => {
        handleClose();
        handleEquipeUpdate();
      }, 2000);
    }
  };

  return (
    <div className="text-edit-equipe">
      <Button  variant="dark" 
        onClick={handleShow} 
        className="w-100">
        Modifica
      </Button>

      <Modal show={show} onHide={handleClose} className="text-edit-equipe">
        <Modal.Header closeButton>
          <Modal.Title>Modifica Medico</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="mt-5" onSubmit={modificaEquipe}>
            <Form.Group controlId="specialist-nome" className="mt-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Inserisci nome"
                required
                name="nome"
                value={editSpecialist.nome}
                onChange={(e) =>
                  setEditSpecialist({ ...editSpecialist, nome: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="specialist-cognome" className="mt-3">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Inserisci cognome"
                required
                name="cognome"
                value={editSpecialist.cognome}
                onChange={(e) =>
                  setEditSpecialist({
                    ...editSpecialist,
                    cognome: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="specialist-dataDiNascita" className="mt-3">
              <Form.Label>Data di Nascita</Form.Label>
              <Form.Control
                size="lg"
                type="date"
                required
                name="dataDiNascita"
                value={editSpecialist.dataDiNascita}
                onChange={(e) =>
                  setEditSpecialist({
                    ...editSpecialist,
                    dataDiNascita: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group
              controlId="specialist-specializzazione"
              className="mt-3"
            >
              <Form.Label>Specializzazione</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Inserisci specializzazione"
                required
                name="specializzazione"
                value={editSpecialist.specializzazione}
                onChange={(e) =>
                  setEditSpecialist({
                    ...editSpecialist,
                    specializzazione: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="specialist-title" className="mt-3">
              <Form.Label>Titolo</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Inserisci titolo"
                required
                name="title"
                value={editSpecialist.title}
                onChange={(e) =>
                  setEditSpecialist({
                    ...editSpecialist,
                    title: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="specialist-cover" className="mt-3">
              <Form.Label>Foto</Form.Label>
              <Form.Control
                size="lg"
                type="file"
                name="cover"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Form.Group className="d-flex mt-3 justify-content-end">
              <Button
                onClick={() =>
                  setEditSpecialist({
                    nome: "",
                    cognome: "",
                    dataDiNascita: "",
                    specializzazione: "",
                    title: "",
                  })
                }
                type="reset"
                size="lg"
                variant="outline-dark"
              >
                Reset
              </Button>
              <Button
                type="submit"
                size="lg"
                variant="dark"
                style={{ marginLeft: "1em" }}
              >
                Invia
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      </div>
  );
}

export default EditEquipe;
