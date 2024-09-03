import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './certificazioni.css'
import imgcerficazione from '../../../image/certificazione.jpg'
export default function Certificazioni() {
  return (
    <>
    <Container fluid className='prenotazione-esame mb-4 p-0'>
      <Row>
          <Col>
            <h2 className='h2_impegni text-center pt-4 pb-4 title_principale_certificazioni'>Certificazioni</h2>
          </Col>
      </Row>
    </Container>
    <Container className='mb-4 text_certificazioni'>
       <Row className='ms-3'>
          <Col sm={12}>
            <p className='px-4 mb-3 text_carta_servizi'>Ricerche Radiologiche S.r.l., coerentemente con le linee strategiche e di indirizzo della Direzione Aziendale ha stabilito, documentato e attivato, impegnandosi a migliorarlo con continuità, il Sistema di Gestione della Qualità aziendale certificato ai sensi della Norma Internazionale UNI EN ISO 9001:2015.</p>
          
            <p className='px-4 mb-3 text_carta_servizi'>La certificazione del Sistema di Gestione della Qualità assicura che: </p>

            <ul className='ps-4 mb-3 text_certificazioni'>
              <li className='ps-2 mb-3 ms-4'>Tutti i materiali e le apparecchiature utilizzate sono controllati secondo protocolli prestabiliti.</li>
              <li className='ps-2 mb-3 ms-4'>Il personale è accuratamente selezionato e viene avviato a programmi di formazione continua.</li>
              <li className='ps-2 mb-3 ms-4'>L’attività del personale sanitario medico e non medico è conforme a linee guida e protocolli di provata efficacia e sicurezza.</li>
              <li className='ps-2 mb-3 ms-4'>Tutte le attività sono descritte in documenti specifici per permettere e garantire il corretto svolgimento delle procedure a tutti i livelli.</li>
              <li className='ps-2 mb-3 ms-4'>Il grado di soddisfazione degli utenti viene rilevato attraverso appositi questionari; i dati riscontrati vengono elaborati ed esaminati dalla Direzione per i correttivi necessari.</li>
              <li className='ps-2 mb-3 ms-4'>Sono istituiti appositi strumenti di rilevazione delle anomalie (rapporti di non conformità) e programmi di verifiche ispettive interne da parte di personale preposto al controllo del corretto andamento dell’attività.</li>  
              <li className='ps-2 mb-3 ms-4'>Tutti i materiali e le apparecchiature utilizzate sono controllati secondo protocolli prestabiliti.</li>
              <li className='ps-2 mb-3 ms-4'>Sono adottati percorsi di miglioramento continuo.</li>
            </ul>
            <p className='px-4 mb-5 text_carta_servizi'>La certificazione è stata rilasciata dal prestigioso Ente IMQ – CSQ che ha attestato la conformità del Sistema di Gestione per la Qualità. La struttura inoltre è sottoposta a periodiche verifiche di mantenimento della qualità da parte di tale Ente per monitorarne la costante adeguatezza ai requisiti.</p>
          </Col>
          <Col sm={12} className='text-center'>
            <div >
                <img className='mx-auto'  src={imgcerficazione} alt=" Logo Certificazione" />
            </div>
          </Col>
        </Row>
    </Container>
    </>
  )
}
