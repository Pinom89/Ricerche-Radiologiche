import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './cartaservizi.css'

export default function CartaServizi() {
  return (
    <>   
     <Container fluid className='prenotazione-esame mb-4 p-0'>
    <Row>
        <Col>
        <h2 className='h2_impegni text-center pt-4 pb-4 title_carta_servizi'>Carta dei servizi</h2>
        </Col>
    </Row>
    </Container>
    <Container className='mb-4'>
        <Row className='ms-3'>
            <Col>
            <p className='px-4 mb-3 text_carta_servizi'>Il Centro Ricerche Radiologiche nasce nel 1949 e consolida negli anni la propria crescita in Diagnostica affermandosi come centro di riferimento della Regione Puglia. </p>
          
            <p className='px-4 mb-3 text_carta_servizi'>La struttura, accreditata con il S.S.N., eroga le prestazioni sia in convenzione che in regime libero-professionale, si avvale della certificazione UNI EN ISO 9001:2008 del Sistema di Gestione della Qualità, rilasciato da IMQ-CSQ e partecipa attivamente alla ricerca scientifica in collaborazione con numerosi istituti anche universitari. </p>

            <p className='px-4 mb-3 text_carta_servizi'>La Carta Servizi del Centro Ricerche Radiologiche, rappresenta un mezzo di comunicazione con i pazienti. </p>

            <p className='px-4 mb-3 text_carta_servizi'>Il nostro Centro si impegna a garantire la verifica seriale degli standard qualitativi e la disposizione di ogni eventuale correttivo, atto a mantenere gli stessi ai massimi livelli. </p> 
            <p className='px-4 mb-3 text_carta_servizi'>   Le apparecchiature sono ordinariamente sottoposte a manutenzione e frequentemente aggiornate, in maniera da rispondere con adeguatezza di mezzi alle repentine e continue evoluzioni tecnologiche. </p>
            <p className='px-4 mb-3 text_carta_servizi'>Tutti gli impianti e gli ambienti sono soggetti a controlli severi e alla più rigorosa radioprotezione.</p>

            <p className='px-4 mb-3 text_carta_servizi'>Il personale di Radiodiagnostica (Medico e TSRM) è altamente specializzato e costantemente aggiornato attraverso la partecipazione, specifica per settore, a congressi scientifici, seminari di studio, stages (anche internazionali), che ne arricchiscono le risorse professionali.</p>

            <p className='px-4 mb-5 text_carta_servizi'>Il medico è a disposizione dei pazienti, per qualsiasi chiarimento sull’esame da eseguire o già eseguito.</p>
            </Col>
            </Row>
        </Container>
    </>
  )
}
