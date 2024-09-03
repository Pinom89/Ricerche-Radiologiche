import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './style.css'

export default function Hero() {
  return (
<Container fluid className='p-0' data-testid="mock-hero">
    <Row>
        <Col >
            <h2 className='text-center h2_Hero my-5'>Ricerche Radiologiche s.r.l.</h2>
            <div  className='d-flex flex-column justify-content-center align-items-center m-auto p-4'>
            <p className='p_Hero mx-3 my-2 '>
            Ricerche Radiologiche s.r.l., con sede a Molfetta, nasce nel 1949 e consolida negli anni la propria crescita nel campo della Diagnostica per Immagini affermandosi come centro radiologico di riferimento della Regione Puglia. 
                Da sempre, il nostro impegno, la nostra serietà ed il nostro lavoro sono posti al servizio dei pazienti e della loro salute.
            </p>
            <p className='p_Hero  mx-3 my-2 '>
                La struttura, accreditata con il S.S.N., eroga prestazioni sia in convenzione che in regime libero-professionale.
                Si avvale della certificazione UNI EN ISO 9001:2015 del Sistema di Gestione della Qualità (SGQ), rilasciata da IMQ-CSQ, garantendo il monitoraggio e il miglioramento continuo delle prestazioni e delle procedure aziendali.
            </p>
            <p className='p_Hero  mx-3 my-2 '>
                Assicuriamo ai nostri pazienti l’assoluto rispetto della privacy e della sicurezza sottoponendo le apparecchiature installate a rigorosi controlli periodici. Partecipa attivamente alla ricerca scientifica in collaborazione con numerosi istituti ospedaliero-universitari.
            </p>
            </div>
        </Col>
    </Row>

</Container>
  )
}
