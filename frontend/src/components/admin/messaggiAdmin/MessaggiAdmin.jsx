import React, { useEffect, useState, useCallback } from "react";
import "./messaggiAdmin.css";
import fetchWithAuth from "../../../services/fetchWithAuth.js";
import formatDate from "../../../services/formatdate.js";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
  Spinner,
} from "react-bootstrap";
import DettaglioMessaggio from "./dettaglioMessaggio/DettaglioMessaggio.jsx";

export default function MessaggiAdmin() {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Pagina corrente
  const [totalPages, setTotalPages] = useState(10); // Numero totale di pagine
  const [limit, setLimit] = useState(10); // Numero di utenti per pagina
  const [searchMessage, setSearchMessage] = useState({
    _id: "",
    nome: "",
    cognome: "",
    telefono: "",
    email: "",
    stato: "",
    createdAt: "",
  });

  const [sortField, setSortField] = useState("data");
  const [sortOrder, setSortOrder] = useState("asc");

  const stati = ["Nuovo", "Risposta inviata"];

  const DetailsSchema = ["nome", "cognome", "messaggio", "stato", "createdAt"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "createdAt" && value) {
      // Converti il valore in formato data
      const formattedDate = formatDate(value, "it");

      // Aggiorna lo stato con la data formattata
      setSearchMessage((prev) => ({ ...prev, [name]: formattedDate }));
    } else {
      setSearchMessage((prev) => ({ ...prev, [name]: value }));
    }
  };

  //  console.log(searchMessage.createdAt);

  // funzione per ordinare i risultati
  const handleSort = (field) => {
    console.log(`Ordinamento per: ${field}`);
    if (field === sortField) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    // Chiamata a fetchtotalmessage() spostata all'interno di un useEffect
    setIsOrderingChanged(true);
  };

  // Aggiungo uno  stato per tenere traccia del fatto che l'ordinamento è cambiato
  const [isOrderingChanged, setIsOrderingChanged] = useState(false);

  const fetchTotalMessage = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        ...searchMessage,
        page: currentPage,
        limit,
        sort: sortField,
        sortDirection: sortOrder, //  === "asc" ? "asc" : "desc",
      });

      //   if (searchMessage.createdAt) {
      //     params.set("createAt", searchMessage.createdAt);
      //   }

      if (searchMessage.createdAt) {
        const formattedDate = formatDate(searchMessage.createdAt, "it"); // Formatta la data in formato italiano
        params.set("createdAt", formattedDate); // Imposta il parametro con la data formattata
      }
      const url = `${API_URL}/contatti?${params.toString()}`;
      const data = await fetchWithAuth(url);
      setMessage(data.messaggi);
      //  console.log(data.messaggi);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Errore nel recupero dei messaggi", error);
    } finally {
      setTimeout(() => setLoading(false), 1500);
    }
  }, [API_URL, currentPage, limit, searchMessage, sortField, sortOrder]);

  const handleMessageUpdate = () => {
    fetchTotalMessage();
  };

  // Aggiorna l'useEffect per chiamare fetchprenotazioni() quando l'ordinamento cambia
  useEffect(() => {
    if (isOrderingChanged) {
      fetchTotalMessage();
      setIsOrderingChanged(false);
    }
  }, [isOrderingChanged, fetchTotalMessage]);

  // funzione per confermare i dati inseriti nella SearchPrenotazioni
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Resetta la pagina corrente quando si effettua una nuova ricerca
    fetchTotalMessage();
  };

  // imposto filtri sulla base dei parametri acquisiti dal form SearchMessage

  const filteredMessages = message
    ? message.filter((message) => {
        return Object.entries(searchMessage).every(([key, value]) => {
          if (!value) return true; // Ignora i campi vuoti
          const messageValue = message[key]?.toString().toLowerCase();
          return messageValue?.includes(value.toLowerCase());
        });
      })
    : [];

  useEffect(() => {
    fetchTotalMessage();
  }, [fetchTotalMessage]);

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
  // mostro SearchMessage e mappo la variabile messaggi

  return (
    <Container className="my-5 dimensione" fluid>
      <Row className="mb-4">
        <Col>
          <h2 className="text-center">Ricerca Avanzata</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mb-5">
        <Col xs={12} md={10} lg={8}>
          <Form onSubmit={handleSearch} className="d-flex flex-column gap-3">
            <Row>
              <Col xs={12} md={4} className="mb-3">
                <Form.Select name="stato" onChange={handleInputChange}>
                  <option value="">Seleziona Stato</option>
                  {stati.map((stato) => (
                    <option key={stato} value={stato}>
                      {stato}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col xs={12} sm={6} md={4} className="mb-3">
                <Form.Control
                  name="nome"
                  type="text"
                  placeholder="Nome"
                  onChange={handleInputChange}
                />
              </Col>
              <Col xs={12} sm={6} md={4} className="mb-3">
                <Form.Control
                  name="cognome"
                  type="text"
                  placeholder="Cognome"
                  onChange={handleInputChange}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={4} className="mb-3">
                <Form.Control
                  name="createdAt"
                  type="date"
                  onChange={handleInputChange}
                />
              </Col>
              <Col xs={12} sm={6} md={4} className="mb-3">
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                />
              </Col>
              <Col xs={12} sm={6} md={4} className="mb-3">
                <Form.Control
                  name="telefono"
                  type="number"
                  placeholder="Telefono"
                  onChange={handleInputChange}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={12} className="mb-3">
                <Form.Control
                  name="messaggio"
                  as="textarea"
                  rows={3}
                  placeholder="Messaggio"
                  onChange={handleInputChange}
                />
              </Col>
            </Row>

            <Row className="mt-4">
              <Col xs={12}>
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
                      {field === "createdAt"
                        ? "Data"
                        : field.charAt(0).toUpperCase() + field.slice(1)}{" "}
                      {field === sortField
                        ? sortOrder === "asc"
                          ? " ▲"
                          : " ▼"
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
            <Table responsive="sm" striped bordered hover>
              <thead className=" color-tr">
                <tr className="fs-5">
                  <th style={{ backgroundColor: "#08624A", color: "#fff" }}>
                    Data
                  </th>
                  <th style={{ backgroundColor: "#08624A", color: "#fff" }}>
                    Nome
                  </th>
                  <th style={{ backgroundColor: "#08624A", color: "#fff" }}>
                    Cognome
                  </th>
                  <th
                    style={{ backgroundColor: "#08624A", color: "#fff" }}
                    className="d-none d-lg-table-cell text-center"
                  >
                    Telefono
                  </th>
                  <th
                    style={{ backgroundColor: "#08624A", color: "#fff" }}
                    className="d-none d-lg-table-cell text-center"
                  >
                    Email
                  </th>
                  <th style={{ backgroundColor: "#08624A", color: "#fff" }}>
                    Messaggio
                  </th>
                  <th style={{ backgroundColor: "#08624A", color: "#fff" }}>
                    Stato
                  </th>
                  <th style={{ backgroundColor: "#08624A", color: "#fff" }}>
                    Dettaglio
                  </th>
                </tr>
              </thead>
              <tbody>
                {message && message.length > 0 ? (
                  filteredMessages.map((messaggio) => (
                    <tr key={messaggio._id}>
                      <DettaglioMessaggio
                        messaggio={messaggio}
                        handleMessageUpdate={handleMessageUpdate}
                      />
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9}>Nessun messaggio trovato.</td>
                  </tr>
                )}
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
