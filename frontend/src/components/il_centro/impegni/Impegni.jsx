import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './impegni.css'

export default function Impegni() {
  return (
    <>       
        <Container fluid className='prenotazione-esame mb-4 p-0'>
        <Row>
            <Col>
            <h2 className='h2_impegni text-center title_principale_impegni pt-4 pb-4'>Impegni</h2>
            </Col>
        </Row>
        </Container>
        <Container className='mb-4'>
        <Row className='ms-3'>
            <Col>
            <h4 className='h4_impegni ps-4 text-start title_impegni mb-3'>Ciascun Operatore si impegna:</h4>
            <ul className='ms-2 text_impegni'>
                    <li className='ps-2 mb-3 ms-4'>A fornire la massima professionalità, indipendentemente dalla qualifica e/o collocazione lavorativa all’interno dell’Azienda.</li>
                    <li className='ps-2 mb-3 ms-4'>A trattare il paziente con cortesia, ponendo massima attenzione alle sue esigenze, fornendo ogni utile espediente teso ad assicurare un ambiente discreto ed accogliente e ad alleviare ogni eventuale disagio. I pazienti sono invitati a segnalare al personale le proprie esigenze o gli eventuali disagi incontrati.</li>
                    <li className='ps-2 mb-3 ms-4'>A elargire tutte le informazioni che consentano al paziente di essere adeguatamente informato prima di sottoporsi ad esami diagnostici; le informazioni devono concernere anche i possibili rischi o disagi conseguenti al trattamento. Ove il sanitario raggiunga il motivato convincimento della inopportunità di una informazione diretta, la stessa dovrà essere fornita, salvo espresso diniego del paziente, ai familiari e a coloro che esercitano potestà tutoria. Al momento dell’accettazione, al paziente verrà richiesto di firmare un modulo per il consenso al trattamento dati e per alcune indagini diagnostiche, in reparto sarà compilato un secondo modulo di consenso informato.</li> 
                    <li className='ps-2 mb-3 ms-4'>A prendere in considerazione gli eventuali reclami espressi dal paziente tramite compilazione di questionario anonimo (satisfaction gradient) ed eventualmente adottare delle soluzioni. </li> 
                    <li className='ps-2 mb-3 ms-4'>A garantire il paziente la più rigorosa tutela della privacy, in conformità delle vigenti normative legali.   </li>   
                    <li className='ps-2 mb-3 ms-4'></li>   
            </ul>
            <h4 className='h4_impegni ps-4 text-start title_impegni mb-3'>Il cittadino, quando accede in una struttura sanitaria è invitato ad avere un comportamento responsabile in ogni momento, nel rispetto e nella comprensione dei diritti degli altri malati.</h4>
            <ul className='ms-2 text_impegni'>
                    <li className='ps-2 mb-3 ms-4'> L’accesso in una struttura sanitaria esprime da parte del cittadino-paziente un rapporto di fiducia e di rispetto verso il personale sanitario. </li>
                    <li className='ps-2 mb-3 ms-4'>Il cittadino è tenuto al rispetto degli ambienti, delle attrezzature e degli arredi.</li>
                    <li className='ps-2 mb-3 ms-4'>Chiunque si trovi in una struttura sanitaria è chiamato al rispetto degli orari delle visite. Le prestazioni sanitarie richieste in tempi e modi non corretti, determinano un notevole disservizio per tutta l’utenza.</li>
            </ul>
            </Col>
            </Row>
        </Container>
    </>
  )
}
