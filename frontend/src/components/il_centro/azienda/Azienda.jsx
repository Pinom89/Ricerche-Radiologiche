import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Presenzazione from '../../../image/presentazione_azienda.jpg'
import Reception from '../../../image/reception.jpg'
import './azienda.css'


export default function Azienda() {
  return (
    <>
      <Container fluid className='prenotazione-esame mb-4 p-0'>
        <Row>
          <Col>
            <h2 className='h2_impegni text-center pt-4 pb-4 title_carta_servizi'>L'azienda</h2>
          </Col>
        </Row>
      </Container>
        <Container className='mb-4'>
          <Row className='ms-3'>
            <Col>
              <div className='imgAzienda'>
                <img src={Reception} alt='Reception' className="img-fluid"/>   
              </div>
            </Col>
            <Col>
              <p> La struttura, accreditata con il S.S.N., è iscritta nel registro nazionale della ricerca scientifica; ha ottenuto il riconoscimento della certificazione UNI EN ISO 9001 (n° 9122RIRA) del sistema di gestione per la qualità aziendale rilasciato da IMQ-CSQ ed eroga le prestazioni sia in convenzione che in regime libero-professionale. All’interno del centro è garantita la verifica seriale degli standard qualitativi e la disposizione di ogni eventuale correttivo atto a mantenere gli stessi ai massimi livelli anche mediante le valutazioni espresse dal paziente tramite compilazione di questionario anonimo (satisfaction gradient). </p>  
              <p>La nostra struttura utilizza la tecnologia digitale che consente la riduzione della dose di esposizione e migliore qualità delle immagini.
                    L’informatica, oltre che supportare le moderne tecniche e metodiche di diagnostica per immagini (come dimostrato dall’importante e ormai quotidiano beneficio clinico della Ecografia, TC e RM), consente un evidente miglioramento qualitativo nei sistemi di gestione, archiviazione delle immagini e possibilità di teleconsulto, ovvero di refertazione remota.Le tre soluzioni, fortemente integrate fra loro creano un unico potente strumento di lavoro, al servizio della Diagnostica per Immagini.
                    Il RIS (Radiology Information System) consente una ottimale gestione di un reparto di Radiologia, dalla prenotazione fino all’archiviazione dei referti.
                    Il Workflow (flusso di lavoro):
              </p>
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col sm={12}>
                
                <ul  className='ps-4 ms-5'>
                  <li>Prenotazione: viene gestita da un’agenda software secondo un ordine temporale e le capacità lavorative del centro; a tale scopo sono disponibili 15 linee telefoniche</li>
                  <li>Accettazione: consiste nella verifica dei dati anagrafici e delle prestazioni sanitarie da erogare. La scheda informatica viene automaticamente smistata nella diagnostica di competenza.</li>
                  <li>Esecuzione dell’esame: il personale tecnico, mediante visualizzazione della checklist (lista di controllo) provvede all’esecuzione dell’esame stesso. Il sistema prevede anche la gestione del magazzino, permettendo all’infermiere o al T.S.R.M. di segnalare la quantità del materiale di consumo utilizzato per l’indagine.</li>
                  <li> Refertazione: La valutazione delle immagini viene eseguita alle Work-Station (postazioni di lavoro) terminali di informazioni cliniche che migliorano l’accuratezza diagnostica.</li>
                </ul>
                <p className='ps-4'>Il medico radiologo, mediante Worklist (lista di lavoro contenente dati anagrafici e specifica dell’esame eseguito) ha la possibilità di visualizzare i dati anamnestici e clinici e richiamare eventuali referti precedenti. L’integrazione con il sistema PACS consente, inoltre, di visionare le immagini dell’indagine appena eseguita, nonché le immagini di precedenti esami eseguiti presso la nostra struttura.
                  A questo punto è possibile stilare il referto mediante tastiera od avvalersi del sistema di refertazione vocale (orami integrato nella maggior parte delle soluzioni RIS in uso).
                  Lo stesso sistema beneficia anche il comparto amministrativo che può gestire una consistente mole di dati e di statistiche, giacenze di magazzino aggiornate in tempo reale, programmando e monitorando l’andamento economico dell’Azienda.
                  Il complementare del RIS è il sistema PACS (Picture Archive and Communication System): Sistema di Archiviazione e Trasmissione delle Immagini.
                  Questa tecnologia è la soluzione ottimale per l’archiviazione legale delle immagini permettendo non solo di archiviare in maniera veloce e poco ingombrante ma soprattutto di reperire le immagini con pari velocità.
                  Il sistema consente di archiviare le immagini in forma digitale, legandole al referto elettronico, in tempi brevi e senza l’ausilio di personale addetto. Con altrettanta rapidità permette di eseguire un operazione di query/retrive (interrogazione – prelievo) per visionare le immagini ed il relativo referto.
                  Esaminare un immagine diagnostica su una workstation (stazione di lavoro) a due o più schermi ad alta risoluzione, diviene un operazione molto stimolante per il Radiologo, che ha la possibilità di effettuare misurazioni, cambiare il livello di luminosità o contrasto dell’immagine, ingrandire un particolare.
                </p>
               
            </Col>
          </Row>  
          <Row>
            <Col sm={12} md={6}>
            <p className='ps-4 mt-4'>Il nostro sistema (archive system) consente di archiviare le immagini in due tipologie diverse di memoria:</p>
                <ul className='ms-5'>
                  <li>Archiviazione a breve termine mediante cache online (memoria di rapido reperimento) riferita alle indagini effettuate più recentemente.</li>
                  <li>Archiviazione a lungo termine mediante archivio ottico su CD-ROM. </li>
                </ul>
                <p className='ps-4'>Quest’ultima caratteristica ci permette anche di fornire al paziente la documentazione radiologica su CD-ROM .
                accettazione ricerche radiologicheTeleradiologia:</p>
                <p className='ps-4'> Il centro Ricerche Radiologiche, utilizza la teleradiologia per la valutazione diagnostica di 2° livello, procedura anche detta teleconsulto. Disponiamo di connessioni domiciliari con i nostri Radiologi per tutte quelle situazioni che richiedono una specifica valutazione professionale.
                    Risulta evidente come l’informatica, adeguatamente combinata ad apparecchiature performanti e a personale qualificato, migliori oltre alla qualità diagnostica quella assistenziale protesa alla centralizzazione del paziente.
                    Le apparecchiature sono ordinariamente sottoposte a manutenzione e frequentemente aggiornate e rinnovate, in maniera da rispondere con adeguatezza di mezzi alle repentine e continue evoluzioni tecnologiche. Tutti gli impianti e gli ambienti sono soggetti a controlli severi e alla più rigorosa radioprotezione. Il personale di Radiodiagnostica (Medico e TSRM) è altamente specializzato e costantemente aggiornato attraverso la partecipazione, specifica per settore, a congressi scientifici, seminari di studio, stages (anche internazionali) che ne arricchiscono le risorse professionali. Il medico refertatore è a disposizione dei pazienti, previo accordo con il personale del centro, per qualsiasi chiarimento sull’esame da eseguire o già eseguito.</p>
                </Col>
            <Col sm={12} md={6}>
               <div className="image-container">
                  <img src={Presenzazione} alt="Dottore che controlla radiografia" className='img-fluid'/>
                </div>
            </Col>
          </Row>
        </Container>
    </>
  )
}