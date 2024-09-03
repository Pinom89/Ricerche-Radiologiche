import React, {useContext} from 'react'
import { AuthContext } from '../../../../modules/AuthContext.js';
import './equipeItem.css'
import fetchWithAuth from '../../../../services/fetchWithAuth'
import { Card, Button} from 'react-bootstrap'
import formatDate from '../../../../services/formatdate.js';
import EditEquipe from '../editequipe/EditEquipe.jsx';


export default function EquipeItem({ equipe, specialista, setEquipe, handleEquipeUpdate}) {
    const { pazienteLogin, isLoggedIn } = useContext(AuthContext);
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";


    const cancellaMedico = async (id) => {
        try {
          await fetchWithAuth(`${API_URL}/equipe/${id}`, {
            method: "DELETE",
          });
    
          setEquipe(equipe.filter((specialista) => specialista._id !== id));
          alert("Specialista eliminato");
        } catch (err) {
          console.log("Errore nella cancellazione", err);
          alert("Errore durante l'eliminazione dello specialista"); // Opzionale: notifica l'utente dell'errore
        }
      };

  return (
    <Card className="equipe-card shadow-drop-tl textequipe h-100 d-flex flex-column">
      <Card.Img variant="top" src={specialista.cover} className="equipe-cover scale-up-ver-center equipe-immage" />
     
      <Card.Body className="d-flex flex-column">
        <Card.Title className="equipe-title">{specialista.title}</Card.Title>
        <Card.Text>Nome completo: <strong> {specialista.cognome} {specialista.nome} </strong></Card.Text>
        <Card.Text>Specializzazione: <strong> {specialista.specializzazione}</strong></Card.Text>
        <Card.Text>Data di nascita: {formatDate(specialista.dataDiNascita, "it")}</Card.Text>
        
        {isLoggedIn && pazienteLogin.isAdmin && (
            <div className="mt-auto d-sm-block d-lg-flex justify-content-between">
            <div className="mb-2 mb-lg-0 me-lg-2 flex-grow-1">
              <EditEquipe handleEquipeUpdate={handleEquipeUpdate} specialista={specialista} className="w-100" />
            </div>
            <div className="flex-grow-1">
              <Button variant="outline-danger" onClick={() => cancellaMedico(specialista._id)} className="w-100">Cancella</Button>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  )
}

