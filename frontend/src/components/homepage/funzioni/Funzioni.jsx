import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { TiDocumentText } from "react-icons/ti";
import { FaPencilAlt } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import './funzioni.css'
import { Link } from 'react-router-dom'

export default function Funzioni() {
  return (
   <Container className='mt-4 p-0' data-testid="mock-funzioni">
    <Row>
      <Col sm={12} md={4} as={Link} to="/referti" className='text-decoration-none'>
        <div className='my-2 mx-3 p-2 classfunz'>
            <h5><span  className='p-2'><TiDocumentText /></span> Modalità ritiro referti</h5>
            <p>Come richiedere una copia e/o spedizione del referto o dell’intero esame</p>
        </div>
     </Col>
     <Col sm={12} md={4} as={Link} to="/prenota-esame" className='text-decoration-none'>
        <div className='my-2 mx-3 p-2 classfunz' >
        <h5> <span className='p-2'><FaPencilAlt /></span>Come prenotare il tuo esame</h5>
        <p>Scopri come prenotare un esame al telefono, on line o direttamente in struttura</p>      
        </div>
     </Col>
     <Col sm={12} md={4} as={Link} to="/accettazione" className='text-decoration-none'>
        <div className='my-2 mx-3 p-2 classfunz'>
        <h5><span className='p-2'><IoPeople /></span>Presentarsi in accettazione</h5>
        <p>Consulta gli orari di apertura e altre info utili alla prenotazione dell'esame</p>
        </div>
     </Col>
    </Row>
   </Container>
  )
}
