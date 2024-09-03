import React , { useState, useContext } from 'react'
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './modificaaccount.css'
import fetchWithAuth from '../../services/fetchWithAuth'; 
import { AuthContext } from '../../modules/AuthContext.js';
import formatDate from '../../services/formatdate.js';

export default function ModificaAccount() {
   
    const { pazienteLogin  } = useContext(AuthContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const [edit, setEdit] = useState({
    nome:pazienteLogin.nome,
    cognome:pazienteLogin.cognome,
    dataDiNascita:pazienteLogin.dataDiNascita,
  });


  const [avatar, setAvatar] = useState(null);
  const [notAdult, setNotAdult] = useState(false);

  const isAdult = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age >= 18;
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'dataDiNascita') {
      if (isAdult(value)) {
        setEdit(prev => ({
          ...prev,
          [name]: value
        }));
        setNotAdult(false);
      } else {
        setNotAdult(true);
        e.target.value = '';
      }
    } else {
      setEdit(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) { 
      navigate('/login');
      return;
    }

    const formData = new FormData();
    
    // Aggiungi i campi del registro al FormData
    Object.keys(edit).forEach(key => {
      formData.append(key, edit[key]);
    });

    // Aggiungi il file avatar se è stato selezionato
    if (avatar) {
      formData.append("avatar", avatar);
    }
    console.log('Dati inviati:', edit);
    try {
      const response = await fetchWithAuth(
        `${API_URL}/pazienti/${pazienteLogin._id}`, 
        {
        method: 'PATCH',
        body: formData,
      });
      
      console.log('Risultato:', response);
      alert("Modifica account effettuata, controlla la tua email.");
      navigate('/');

    } catch (error) {
      console.error('Errore durante la registrazione:', error);
    } finally {
      setEdit({
        nome: "",
        cognome: "",
        dataDiNascita: ""
      });
      setAvatar(null);
    
    }
  };

  return (
  
<Container>
      <Row>
        <Col>
          <h2 className='mt-3 text-center'>Modifica account</h2>
          <Form onSubmit={handleEditSubmit}>
            <InputGroup className="mb-3 mt-5">
              <Form.Control
                placeholder="Nome"
                name="nome"
                aria-label="Nome"
                aria-describedby="basic-addon1"
                type='text'
                required
                value={edit.nome}
                onChange={handleEditInputChange}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Cognome"
                name="cognome"
                aria-label="Cognome"
                aria-describedby="basic-addon2"
                type='text'
                value={edit.cognome}
                onChange={handleEditInputChange}
              />
            </InputGroup>
                <textlabel className='ms-1'>Data di nascita attuale: {formatDate(pazienteLogin.dataDiNascita, "it")}</textlabel>
            <InputGroup className="mb-3">
              <Form.Control
                name="dataDiNascita"
                aria-label="Date"
                max={new Date().toISOString().split('T')[0]}
                aria-describedby="basic-addon2"
                type='date'
                value={edit.dataDiNascita}
                onChange={handleEditInputChange}
              />
              
            </InputGroup>
            {notAdult && <p className='text-danger'>Devi avere almeno 18 anni per modificare l'account</p>}
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Avatar"
                aria-label="file"
                aria-describedby="basic-addon2"
                type='file'
                name="avatar"
                onChange={handleFileChange}
                accept="image/*"
              />
            </InputGroup>

          <div className='d-flex justify-content-center align-items-center gap-3 py-4'>
            <Button
              variant="dark"
              type="submit"
            >
              Conferma modifica
            </Button>

            <Button
              variant="outline-dark"
              onClick={() => {
                setEdit({
                  nome: "",
                  cognome: "",
                  dataDiNascita: ""
                });
                setAvatar(null);
              }}
            >
              Reset
            </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
