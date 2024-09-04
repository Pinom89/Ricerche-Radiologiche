import React from "react";
import Spinner from "react-bootstrap/Spinner";
import { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import fetchWithAuth from "../../../services/fetchWithAuth.js";
import DettaglioPrenotazione from "./dettaglioPrenotazione/DettaglioPrenotazione.jsx";
import formatDate from "../../../services/formatdate.js";

export default function PrenotazioniTotal() {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Pagina corrente
  const [totalPages, setTotalPages] = useState(1); // Numero totale di pagine
  const [limit, setLimit] = useState(10); // Numero di utenti per pagina
  const [searchParams, setSearchParams] = useState({
    _id: "",
    data: "",
    nome: "",
    cognome: "",
    codiceFiscale: "",
    esame: "",
    numRicetta: "",
    codEsenzione: "",
    email: "",
    stato: "",
  });

  const [sortField, setSortField] = useState("data");
  const [sortOrder, setSortOrder] = useState("asc");

  const esami = [
    "Raggi",
    "Panoramica dentale",
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

  const DetailsSchema = [
    "data",
    "numRicetta",
    "codEsenzione",
    "email",
    "stato",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "data") {
      //   // Converti la data dal formato YYYY-MM-DD a UTC
      //   const utcDate = new Date(value + 'T00:00:00Z').toISOString();
      setSearchParams((prev) => ({ ...prev, [name]: formatDate(value, "it") }));
    } else {
      setSearchParams((prev) => ({ ...prev, [name]: value }));
    }
  };

  // funzione per ordinare i risultati
  const handleSort = (field) => {
    console.log(`Ordinamento per: ${field}`);
    if (field === sortField) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    // Chiamata a fetchprenotazioni() spostata all'interno di un useEffect
    setIsOrderingChanged(true);
  };

  // Aggiungo uno  stato per tenere traccia del fatto che l'ordinamento è cambiato
  const [isOrderingChanged, setIsOrderingChanged] = useState(false);

  // funzione per confermare i dati inseriti nella SearchPrenotazioni
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Resetta la pagina corrente quando si effettua una nuova ricerca
    fetchprenotazioni();
  };

  // imposto filtri sulla base dei parametri acquisiti dal form SearchPrenotazioni

  const filteredPrenotazioni = prenotazioni.filter((prenotazione) => {
    return Object.entries(searchParams).every(([key, value]) => {
      if (!value) return true; // Ignora i campi vuoti
      const prenotazioneValue = prenotazione[key]?.toString().toLowerCase();
      return prenotazioneValue?.includes(value.toLowerCase());
    });
  });

  const fetchprenotazioni = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        ...searchParams,
        page: currentPage,
        limit,
        sort: sortField,
        sortDirection: sortOrder, //  === "asc" ? "asc" : "desc",
      });

      // Se c'è una data di ricerca, assicurati che sia nel formato corretto
      if (searchParams.data) {
        params.set("data", searchParams.data);
      }

      const url = `${API_URL}/prenotazioni?${params.toString()}`;
      const data = await fetchWithAuth(url);
      setPrenotazioni(data.prenotazioni);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Errore nel recupero delle prenotazioni", error);
    } finally {
      setTimeout(() => setLoading(false), 1500);
    }
  }, [API_URL, currentPage, limit, searchParams, sortField, sortOrder]);
  const handlePrenotazioneUpdate = () => {
    fetchprenotazioni();
  };

  // Aggiorna l'useEffect per chiamare fetchprenotazioni() quando l'ordinamento cambia
  useEffect(() => {
    if (isOrderingChanged) {
      fetchprenotazioni();
      setIsOrderingChanged(false);
    }
  }, [
    currentPage,
    limit,
    sortField,
    sortOrder,
    isOrderingChanged,
    fetchprenotazioni,
  ]);

  useEffect(() => {
    fetchprenotazioni();
  }, [currentPage, limit, sortField, sortOrder, fetchprenotazioni]);

  // imposto spinner al caricamento
  if (loading)
    return (
      <div className="text-center">
        <Spinner
          animation="border"
          variant="success"
          className="my-5 text-center"
        />
      </div>
    );
  // mostro SearchPrenotazioni e mappo la variabile prenotazioni
  return (
    <Container fluid className="my-5 dimensione">
      <Row className="mb-4">
        <Col>
          <h2 className="text-center">Ricerca Avanzata</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mb-5">
        <Col xs={12} md={10} lg={8}>
          <Form onSubmit={handleSearch} className="d-flex flex-column gap-3">
            <Row>
              <Col xs={12} sm={6} className="mb-3">
                <Form.Control
                  name="_id"
                  placeholder="Id Prenotazione"
                  onChange={handleInputChange}
                />
              </Col>
              <Col xs={12} sm={6} className="mb-3">
                <Form.Select name="esame" onChange={handleInputChange}>
                  <option value="">Seleziona Esame</option>
                  {esami.map((esame) => (
                    <option key={esame} value={esame}>
                      {esame}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={12} sm={6} className="mb-3">
                <Form.Control
                  name="numRicetta"
                  type="number"
                  placeholder="Numero Ricetta"
                  onChange={handleInputChange}
                />
              </Col>
              <Col xs={12} sm={6} className="mb-3">
                <Form.Control
                  name="codEsenzione"
                  placeholder="Codice Esenzione"
                  onChange={handleInputChange}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={12} sm={6} className="mb-3">
                <Form.Control
                  name="data"
                  type="date"
                  onChange={handleInputChange}
                />
              </Col>
              <Col xs={12} sm={6} className="mb-3">
                <Form.Control
                  name="codiceFiscale"
                  placeholder="Codice Fiscale"
                  onChange={handleInputChange}
                />
              </Col>
              <Col xs={12} sm={6} className="mb-3">
                <Form.Select name="stato" onChange={handleInputChange}>
                  <option value="">Seleziona Stato</option>
                  {stati.map((stato) => (
                    <option key={stato} value={stato}>
                      {stato}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            <Row>
              <Col xs={12} sm={6} className="mb-3">
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                />
              </Col>
              <Col xs={12} sm={6} className="mb-3">
                <Form.Select name="stato" onChange={handleInputChange}>
                  <option value="">Seleziona Stato</option>
                  {stati.map((stato) => (
                    <option key={stato} value={stato}>
                      {stato}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            <Row>
              <Col xs={12} sm={6} className="mb-3">
                <Form.Control
                  name="nome"
                  placeholder="Nome"
                  onChange={handleInputChange}
                />
              </Col>
              <Col xs={12} sm={6} className="mb-3">
                <Form.Control
                  name="cognome"
                  placeholder="Cognome"
                  onChange={handleInputChange}
                />
              </Col>
            </Row>

            <Row className="mt-4">
              <Col>
                <div className="d-flex flex-wrap justify-content-center align-items-center gap-2">
                  <span className="me-2 mb-2">Ordina per:</span>
                  {DetailsSchema.map((field) => (
                    <Button
                      variant="outline-dark"
                      key={field}
                      className="mb-2"
                      onClick={(event) => {
                        event.preventDefault();
                        console.log(`Ordinamento per: ${field}`);
                        handleSort(field);
                      }}
                    >
                      {field}{" "}
                      {field === sortField
                        ? sortOrder === "asc"
                          ? "▲"
                          : "▼"
                        : ""}
                    </Button>
                  ))}
                </div>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead className=" color-tr">
                <tr style={{ fontSize: 14 }}>
                  <th
                    style={{ backgroundColor: "#08624A", color: "#fff" }}
                    className="d-none d-lg-table-cell text-center"
                  >
                    Id Cliente
                  </th>
                  <th
                    style={{ backgroundColor: "#08624A", color: "#fff" }}
                    className="text-center"
                  >
                    Data Prenotazione
                  </th>
                  <th
                    style={{ backgroundColor: "#08624A", color: "#fff" }}
                    className="text-center"
                  >
                    Nome
                  </th>
                  <th
                    style={{ backgroundColor: "#08624A", color: "#fff" }}
                    className="text-center"
                  >
                    Cognome
                  </th>
                  <th
                    style={{ backgroundColor: "#08624A", color: "#fff" }}
                    className="text-center"
                  >
                    Codice Fiscale
                  </th>
                  <th
                    style={{ backgroundColor: "#08624A", color: "#fff" }}
                    className="text-center"
                  >
                    Esame
                  </th>
                  <th
                    style={{ backgroundColor: "#08624A", color: "#fff" }}
                    className="text-center"
                  >
                    N. Ricetta
                  </th>
                  <th
                    style={{ backgroundColor: "#08624A", color: "#fff" }}
                    className="text-center"
                  >
                    Esenzione
                  </th>
                  <th
                    style={{ backgroundColor: "#08624A", color: "#fff" }}
                    className="d-none d-lg-table-cell text-center"
                  >
                    Email
                  </th>
                  <th
                    style={{ backgroundColor: "#08624A", color: "#fff" }}
                    className="text-center"
                  >
                    Stato
                  </th>
                  <th style={{ backgroundColor: "#08624A", color: "#fff" }}>
                    Dettaglio
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPrenotazioni.map((prenotazione) => (
                  <DettaglioPrenotazione
                    prenotazione={prenotazione}
                    handlePrenotazioneUpdate={handlePrenotazioneUpdate}
                    setPrenotazioni={setPrenotazioni}
                    key={prenotazione._id}
                    xs={12}
                    style={{
                      marginBottom: 50,
                    }}
                  />
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      {/* PAGINAZIONE */}
      <Row className="mt-5">
        <Col
          xs={12}
          className="d-flex flex-column flex-md-row justify-content-center align-items-center"
        >
          <div className="d-flex mb-3 mb-md-0">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              variant="dark"
              className="me-2"
            >
              Precedente
            </Button>
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              variant="dark"
            >
              Successiva
            </Button>
          </div>

          <div className="d-flex align-items-center mx-md-3 my-3 my-md-0">
            <span>
              Pagina <strong>{currentPage}</strong> di{" "}
              <strong>{totalPages}</strong>
            </span>
          </div>

          <Form.Select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="w-auto"
          >
            <option value={10}>10 per pagina</option>
            <option value={20}>20 per pagina</option>
            <option value={50}>50 per pagina</option>
          </Form.Select>
        </Col>
      </Row>
    </Container>
  );
}
