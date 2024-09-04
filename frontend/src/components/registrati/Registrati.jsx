import React , { useState } from 'react'
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './registrati.css'
import fetchWithAuth from '../../services/fetchWithAuth'; 

export default function Registrati() {
   
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const [register, setRegister] = useState({
    nome: "",
    cognome: "",
    email: "",
    dataDiNascita: "",
    password: "",
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

  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'dataDiNascita') {
      if (isAdult(value)) {
        setRegister(prev => ({
          ...prev,
          [name]: value
        }));
        setNotAdult(false);
      } else {
        setNotAdult(true);
        e.target.value = '';
      }
    } else {
      setRegister(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    
    // Aggiungi i campi del registro al FormData
    Object.keys(register).forEach(key => {
      formData.append(key, register[key]);
    });

    // Aggiungi il file avatar se è stato selezionato
    if (avatar) {
      formData.append("avatar", avatar);
    }
    //  console.log('Dati inviati:', register);
    try {
      const result = await fetchWithAuth(`${API_URL}/pazienti`, {
        method: 'POST',
        body: formData,
      });

    //   console.log('Risultato:', result);
    } catch (error) {
      console.error('Errore durante la registrazione:', error);
    } finally {
      setRegister({
        nome: "",
        cognome: "",
        email: "",
        dataDiNascita: "",
        password: "",
      });
      setAvatar(null);
      alert("Registrazione completata!");
      navigate('/login');
    }
  };

  return (
  
<Container className='font'>
      <Row className='d-flex flex-column justify-content-center align-items-center'>
        <Col  sm={6}>
          <h2 className='mt-3 text-center'>Registra il tuo utente</h2>
          <Form onSubmit={handleRegisterSubmit}>
            <InputGroup className="mb-3 mt-5">
              <Form.Control
                placeholder="Nome"
                name="nome"
                aria-label="Nome"
                aria-describedby="basic-addon1"
                type='text'
                required
                value={register.nome}
                onChange={handleRegisterInputChange}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Cognome"
                name="cognome"
                aria-label="Cognome"
                aria-describedby="basic-addon2"
                type='text'
                value={register.cognome}
                onChange={handleRegisterInputChange}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Email"
                name="email"
                aria-label="Email"
                aria-describedby="basic-addon2"
                type='email'
                required
                value={register.email}
                onChange={handleRegisterInputChange}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Data di nascita"
                name="dataDiNascita"
                aria-label="Date"
                max={new Date().toISOString().split('T')[0]}
                aria-describedby="basic-addon2"
                type='date'
                value={register.dataDiNascita}
                onChange={handleRegisterInputChange}
              />
              
            </InputGroup>
            {notAdult && <p className='text-danger'>Devi avere almeno 18 anni per registrarti</p>}
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

            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Password"
                name="password"
                aria-label="password"
                aria-describedby="basic-addon2"
                type='password'
                required
                value={register.password}
                onChange={handleRegisterInputChange}
              />
            </InputGroup>
          <div className='d-flex justify-content-center align-items-center gap-3 py-4'>
            <Button
              variant="dark"
              type="submit"
            >
              Crea Nuovo Utente
            </Button>

            <Button
              variant="outline-dark"
              onClick={() => {
                setRegister({
                  nome: "",
                  cognome: "",
                  email: "",
                  dataDiNascita: "",
                  password: "",
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
