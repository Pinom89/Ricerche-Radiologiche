import React, { useState } from 'react'
import './creaSpecialista.css'
import {  useNavigate } from 'react-router-dom'
import fetchWithAuth from '../../../../services/fetchWithAuth.js';
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export default function CreaSpecialista() {

        const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
    //    const { isLoggedin, pazienteLogin} = useContext(AuthContext);
    
        const navigate = useNavigate();
      
        const [coverFile, setCoverFile] = useState(null);
  
        const [newSpecialist, setNewSpecialist] = useState({
         nome: '',
         cognome: '',
         dataDiNascita: '',
         specializzazione: '',
         cover: '',
         title: '',
        });
      
        const handleFileChange = (e) => {
          setCoverFile(e.target.files[0]);
        };
      
        const creaEquipe = async (e) => {
          e.preventDefault();
          
        const formData = new FormData();
          
          // Aggiungi i campi del blog al FormData
          formData.append('nome', newSpecialist.nome);
          formData.append('cognome', newSpecialist.cognome);
          formData.append('dataDiNascita', newSpecialist.dataDiNascita);
          formData.append('specializzazione', newSpecialist.specializzazione);
          formData.append('title', newSpecialist.title);
      
          
         if(!coverFile){
          alert("Seleziona un file di copertina");
          return;
         }
      
          // Aggiungi il file di copertina se presente
          if (coverFile) {
              formData.append('cover', coverFile);
          }
      
          try {
              const response = await fetchWithAuth(`${API_URL}/equipe`, {
                  method: "POST",
                  body: formData, // Usa formData invece di JSON.stringify(newblog)
              });
              setNewSpecialist(response);
            //   setNewSpecialist({
            //         nome: '',
            //         cognome: '',
            //         dataDiNascita: '',
            //         specializzazione: '',
            //         title: '',
            //   });
            //  setCoverFile(null); // Resetta anche il file di copertina
              alert("Componente dell'equipe aggiunto con successo");
          } catch (err) {
              console.log("Errore nella creazione", err);
          } finally {
            setTimeout(() => {
              navigate("/");
          }, 2000);
        }
      
      };
      
      
  return (
    <Container className="new-specialist-container">
      <Row>
        <Col md={2}></Col>
        <Col md={8}>
          <Form className="my-5 " onSubmit={creaEquipe}>
            <Form.Group controlId="specialist-nome" className="mt-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control 
                size="lg"
                type="text"
                placeholder="Inserisci nome"
                required
                name='nome'
                value={newSpecialist.nome}
                onChange={(e) => setNewSpecialist({...newSpecialist, nome: e.target.value})}
              />
            </Form.Group>

            <Form.Group controlId="specialist-cognome" className="mt-3">
              <Form.Label>Cognome</Form.Label>
              <Form.Control 
                size="lg"
                type="text"
                placeholder="Inserisci cognome"
                required
                name='cognome'
                value={newSpecialist.cognome}
                onChange={(e) => setNewSpecialist({...newSpecialist, cognome: e.target.value})}
              />
            </Form.Group>

            <Form.Group controlId="specialist-dataDiNascita" className="mt-3">
              <Form.Label>Data di Nascita</Form.Label>
              <Form.Control 
                size="lg"
                type="date"
                required
                name='dataDiNascita'
                value={newSpecialist.dataDiNascita}
                onChange={(e) => setNewSpecialist({...newSpecialist, dataDiNascita: e.target.value})}
              />
            </Form.Group>

            <Form.Group controlId="specialist-specializzazione" className="mt-3">
              <Form.Label>Specializzazione</Form.Label>
              <Form.Control 
                size="lg"
                type="text"
                placeholder="Inserisci specializzazione"
                required
                name='specializzazione'
                value={newSpecialist.specializzazione}
                onChange={(e) => setNewSpecialist({...newSpecialist, specializzazione: e.target.value})}
              />
            </Form.Group>

            <Form.Group controlId="specialist-title" className="mt-3">
              <Form.Label>Titolo</Form.Label>
              <Form.Control 
                size="lg"
                type="text"
                placeholder="Inserisci titolo"
                required
                name='title'
                value={newSpecialist.title}
                onChange={(e) => setNewSpecialist({...newSpecialist, title: e.target.value})}
              />
            </Form.Group>

            <Form.Group controlId="specialist-cover" className="mt-3">
              <Form.Label>Foto</Form.Label>
              <Form.Control 
                size="lg"
                type="file"
                name='cover'
                onChange={handleFileChange}
              />
            </Form.Group>

            <Form.Group className="d-flex mt-3 justify-content-end">
              <Button 
                onClick={() => setNewSpecialist({
                  nome: '',
                  cognome: '',
                  dataDiNascita: '',
                  specializzazione: '',
                  title: '',
                })}
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
                style={{marginLeft: "1em"}}
              >
                Invia
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={2}></Col>
      </Row>
    </Container>
  )
}
