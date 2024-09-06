import React, { useState, useContext } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FaPhoneVolume } from "react-icons/fa6";
import { useNavigate, Link } from "react-router-dom";
import "./prenotaesame.css";
import fetchWithAuth from "../../services/fetchWithAuth.js";
import { AuthContext } from "../../modules/AuthContext.js";
import formatDate from "../../services/formatdate.js";

export default function PrenotaEsame() {
  const navigate = useNavigate();
  const { pazienteLogin, isLoggedIn } = useContext(AuthContext);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;

    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [ricettaFile, setRicettaFile] = useState(null);

  const [register, setRegister] = useState({
    cliente: pazienteLogin._id,
    data: "",
    nome: "",
    cognome: "",
    codiceFiscale: "",
    esame: "",
    ricetta: "",
    numRicetta: "",
    codEsenzione: "",
    email: "",
    stato: "Aperto",
  });

  const handleFileChange = (e) => {
    setRicettaFile(e.target.files[0]);
  };
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // Aggiungo i campi della prenotazione al FormData
   //   console.log("Dati inviati:", register); // Stampo la variabile di stato

    formData.append("cliente", register.cliente);
    formData.append("data", formatDate(register.data));
    formData.append("nome", register.nome);
    formData.append("cognome", register.cognome);
    formData.append("codiceFiscale", register.codiceFiscale);
    formData.append("esame", register.esame);
    formData.append("ricetta", register.ricetta);
    formData.append("numRicetta", register.numRicetta);
    formData.append("codEsenzione", register.codEsenzione);
    formData.append("email", register.email);
    formData.append("stato", register.stato);

    if (ricettaFile) {
      formData.append("ricetta", ricettaFile);
    }

    try {
      const result = await fetchWithAuth(`${API_URL}/prenotazioni`, {
        method: "POST",
        body: formData, // Usa formData invece di JSON.stringify
      });
      setRegister(result);
      setRegister({
        cliente: pazienteLogin._id,
        data: "",
        nome: "",
        cognome: "",
        codiceFiscale: "",
        esame: "",
        ricetta: "",
        numRicetta: "",
        codEsenzione: "",
        email: "",
        stato: "Aperto",
      });

      setRicettaFile(null); // Resetta anche il file di copertina
      alert("Prenotazione avvenuta con con successo");
    } catch (error) {
      console.error("Errore nella creazione", error);
    } finally {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <>
      <Container fluid className="prenotazione-esame mb-4 p-0">
        <Row>
          <Col>
            <h2 className="text-center titolo-prenotazione pt-4 pb-4">
              Prenotazione Esame
            </h2>
          </Col>
        </Row>
      </Container>
      <Container className="mt-5">
        <Row className="mt-5">
          <Col sm={12} md={6}>
            <div className="flex-column justify-content-center align-items-center p-4 mx-2 numeriutili">
              <span className="icon-tel text-center">
                <FaPhoneVolume />
              </span>
              <h5 className="text-center mt-3 h5_prenotazione">Numero verde CUP</h5>
              <h5 className="text-center h5_prenotazione_number">800345477</h5>
              <p className="text-center p_prenotazione">
                (per le modalità di prenotazione con il S.S.N.{" "}
                <a
                  href="https://www.sanita.puglia.it/servizialcittadino/#/RicercaPrenotazioneDematerializzata?azienda=regionale"
                  target="_blank"
                  rel="noreferrer"
                >
                  clicca qui{" "}
                </a>
                )
              </p>
            </div>
          </Col>
          <Col sm={12} md={6}>
            <div className="flex-column justify-content-center align-items-center p-4 mx-2 numeriutili">
              <span className="icon-tel text-center">
                <FaPhoneVolume />
              </span>
              <h5 className="text-center mt-3 h5_prenotazione">Centralino</h5>
              <h5 className="text-center h5_prenotazione_number">080 xxxxxx</h5>
              <p className="text-center p_prenotazione">(per prestazioni private)</p>
            </div>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col sm={12} md={6}>
            <h4 className="h4_prenotazione">Come prenotare un esame</h4>
            <p className="p_prenotazione">
              Per prenotare prestazioni sia in Regime Accreditato con il
              Servizio Sanitario Nazionale (S.S.N.) che in Regime Privato o
              Convenzionato con Enti Privati è indispensabile essere muniti di
              impegnativa medica. Il Piano Nazionale di Governo delle liste
              d’attesa stabilisce le priorità e i tempi massimi per l’erogazione
              di esami e visite specialistiche erogati a carico del S.S.N. I
              tempi di attesa per gli esami in convenzione con il S.S.N. sono
              vincolati dai tetti di spesa che la ASL assegna ad ogni struttura
              privata accreditata, indipendenti dalla organizzazione interna e
              diversi da quelli stabiliti per le prestazioni effettuabili
              privatamente (criteri di formazione delle liste di attesa). Al
              momento della prenotazione verrà indicata la prima data utile. In
              caso vengano fornite sedute aggiuntive o si liberino dei posti
              causa disdetta, il personale d’accettazione provvede ad anticipare
              le prenotazioni contattando telefonicamente i pazienti. È
              possibile prenotare esami in Regime Accreditato con il S.S.N.
              presso una farmacia autorizzata (solo per i pazienti della ASL
              BA).
            </p>
          </Col>
          <Col sm={12} md={6} className="text-center">
            {isLoggedIn ? (
              <>
                <h4 className="h4_prenotazione">Prenota il tuo esame a pagamento</h4>
                <Form onSubmit={handleRegisterSubmit}>
                  <Form.Group controlId="formData">
                    <Form.Label className="mt-2 title_form_prenotazione">
                      Data della prenotazione
                    </Form.Label>
                    <Form.Control
                      type="date"
                      required
                      name="data"
                      min={new Date().toISOString().split("T")[0]} // Imposto la data minima di inserimento a oggi
                      onChange={handleRegisterInputChange}
                      value={register.data}
                    />
                  </Form.Group>

                  <Form.Group controlId="formNome">
                    <Form.Label className="mt-2 title_form_prenotazione">Nome</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      name="nome"
                      onChange={handleRegisterInputChange}
                      value={register.nome}
                    />
                  </Form.Group>

                  <Form.Group controlId="formCognome">
                    <Form.Label className="mt-2 title_form_prenotazione">Cognome</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      name="cognome"
                      onChange={handleRegisterInputChange}
                      value={register.cognome}
                    />
                  </Form.Group>

                  <Form.Group controlId="formCodiceFiscale">
                    <Form.Label className="mt-2 title_form_prenotazione">Codice Fiscale</Form.Label>
                    <Form.Control
                      type="text"
                      name="codiceFiscale"
                      onChange={handleRegisterInputChange}
                      value={register.codiceFiscale}
                    />
                  </Form.Group>

                  <Form.Group controlId="formEsame">
                    <Form.Label className="mt-2 title_form_prenotazione">Esame</Form.Label>
                    <Form.Select
                      size="md"
                      type="text"
                      required
                      name="esame"
                      onChange={handleRegisterInputChange}
                      value={register.esame}
                    >
                      <option>Radiografia</option>
                      <option>Visita Senologica</option>
                      <option>Tac</option>
                      <option>Risonanza Magnetica</option>
                      <option>Ecografia/Ecodoppler</option>
                      <option>Diagnostica Dentale</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group controlId="formRicetta">
                    <Form.Label className="mt-2 title_form_prenotazione">Ricetta</Form.Label>
                    <Form.Control
                      type="file"
                      name="ricetta"
                      onChange={handleFileChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formNumRicetta">
                    <Form.Label className="mt-2 title_form_prenotazione">Numero Ricetta</Form.Label>
                    <Form.Control
                      type="number"
                      required
                      name="numRicetta"
                      min="0"
                      onChange={handleRegisterInputChange}
                      value={register.numRicetta}
                    />
                  </Form.Group>

                  <Form.Group controlId="formCodEsenzione">
                    <Form.Label className="mt-2 title_form_prenotazione">Codice Esenzione</Form.Label>
                    <Form.Control
                      type="text"
                      name="codEsenzione"
                      onChange={handleRegisterInputChange}
                      value={register.codEsenzione}
                    />
                  </Form.Group>

                  <Form.Group controlId="formEmail">
                    <Form.Label className="mt-2 title_form_prenotazione">Email</Form.Label>
                    <Form.Control
                      type="email"
                      required
                      name="email"
                      onChange={handleRegisterInputChange}
                      value={register.email}
                    />
                  </Form.Group>

                  <Button variant="success" type="submit" className="btn_prenota_online my-5 mx-2 btn-primary py-2">
                    Prenota esame
                  </Button>
                  <Button
                    className="my-5 mx-2 font py-2"
                    variant="outline-dark"
                    onClick={() =>
                      setRegister({
                        data: "",
                        nome: "",
                        cognome: "",
                        codiceFiscale: "",
                        esame: "",
                        ricetta: "",
                        numRicetta: "",
                        codEsenzione: "",
                        email: "",
                        stato: "Aperto",
                      })
                    }
                  >
                    Reset
                  </Button>
                </Form>
              </>
            ) : (
              <Button
                className="btn_prenota_online my-5 mx-2 btn-primary py-2"
                as={Link}
                to="/login"
              >
                Accedi per prenotare
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
