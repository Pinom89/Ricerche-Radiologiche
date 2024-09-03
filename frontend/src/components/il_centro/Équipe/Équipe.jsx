import React, { useCallback, useEffect, useState } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import fetchWithAuth from "../../../services/fetchWithAuth.js";
import Search from "./search/Search.jsx";
import EquipeItem from "./equipeitem/EquipeItem.jsx";
import PlaceHolder from "../Équipe/placeholder/PlaceHolder.jsx";

export default function Équipe() {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [equipe, setEquipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Pagina corrente
  const [totalPages, setTotalPages] = useState(1); // Numero totale di pagine
  const [limit, setLimit] = useState(6); // Numero di utenti per pagina

  const [search, setSearch] = useState("");
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };
  
  const handleEquipeUpdate = () => {
    fetchEquipe();
  };


  const fetchEquipe = useCallback(async () => {
    try {
      const data = await fetchWithAuth(`${API_URL}/equipe?page=${currentPage}&limit=${limit}`);
      setEquipe(data.equipe);
      setTotalPages(data.totalPages);
      
    } catch (error) {
      console.error("Errore nel recupero dei medici:", error);
    } finally {
      setLoading(false);
    }
  }, [API_URL, currentPage, limit]);

  useEffect(() => {
    fetchEquipe();
  }, [fetchEquipe]);


  if (loading) {
    return (
      <Container className="my-5">
        <Row>
          <Col md={4}>
            <PlaceHolder />
          </Col>
          <Col md={4}>
            <PlaceHolder />
          </Col>
          <Col md={4}>
            <PlaceHolder />
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={2}></Col>
        <Col md={8}>
          <Search search={search} handleInputChange={handleInputChange} />
        </Col>
        <Col md={2}></Col>
      </Row>
      <Row>
        {equipe
          .filter(
            (specialista) =>
              specialista.cognome
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              specialista.specializzazione
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              specialista.nome.toLowerCase().includes(search.toLowerCase())
          )
          .map((specialista) => (
            <Col
              key={specialista._id}
              md={4}
              style={{
                marginBottom: 50,
              }}
            >
              <EquipeItem
                handleEquipeUpdate={handleEquipeUpdate}
                specialista={specialista}
                equipe={equipe}
                setEquipe={setEquipe}
              />
            </Col>
          ))}
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
            <option value={6}>6 per pagina</option>
            <option value={12}>12 per pagina</option>
            <option value={20}>20 per pagina</option>
          </Form.Select>
        </Col>
      </Row>
    </Container>
  );
}
