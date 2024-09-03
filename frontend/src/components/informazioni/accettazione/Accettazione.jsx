import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaPhoneFlip } from "react-icons/fa6";
import "./accettazione.css";
import { Link } from "react-router-dom";

export default function Accettazioni() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); // 500 ms = 0.5 secondi

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Container fluid className="prenotazione-esame mb-4 p-0">
        <Row>
          <Col>
            <h2 className=" text-center title_principale_accettazione pt-4 pb-4">
              Accettazione
            </h2>
          </Col>
        </Row>
      </Container>
      <Container className="mb-4">
        <Row>
          <Col sm={12} md={10}>
            <p className="text-accettazione">
              L’Accettazione è aperta dal lunedì al venerdì dalle ore 8:00 alle
              19:00, il sabato dalle ore 8:00 alle 13:00.
            </p>
            <h4 className="h4_accettazione ps-4 title_accettazione mb-3">
              Come presentarsi
            </h4>
            <p className="text-accettazione">
              Per eseguire l’accettazione si consiglia di presentarsi presso lo
              sportello (per effettuare le pratiche di registrazione dei dati
              personali, pagamento della visita/esame, ecc.) circa 30 minuti
              prima dell’orario fissato per la prestazione muniti di:
            </p>
            <ul className="text_accettazione">
              <li>prescrizione del medico di base/specialista</li>
              <li>documento di riconoscimento</li>
              <li>tessera sanitaria</li>
              <li>
                documentazione clinica precedente inerente l’esame da svolgere
              </li>
              <li>
                analisi del sangue per la somministrazione del mezzo di
                contrasto
              </li>
            </ul>
            <p className="text_accettazione">
              Tutti gli utenti che accedono alle casse per eseguire
              prenotazioni, accettazione amministrativa relativa a prestazioni
              ambulatoriali con o senza pagamento ticket, e/o ritiro referti,
              devono ritirare al totem il numero per l’accodamento nell’area di
              accoglienza delle casse.
            </p>
            <p className="text_accettazione">
              L’utente che deve eseguire prestazioni diagnostiche, riceverà al
              momento dell’espletamento della pratica amministrativa un nuovo
              report con il numero di identificazione paziente e l’indicazione
              della sala d’attesa della diagnostica di riferimento.
            </p>
            <p className="text_accettazione">
              Per info sul ritiro del referto <span>clicca qui </span>
            </p>

            <h4 className="h4_accettazione ps-4 title_accettazione mb-3">
              Info e pagamenti
            </h4>
            <p className="text_accettazione">
              L’ordine di chiamata dei pazienti nelle diagnostiche avviene
              tenendo conto dell’orario di prenotazione, dell’orario di arrivo e
              della priorità di urgenza. Eventuali ritardi sono da attribuire
              all’arrivo di pazienti provenienti da Pronto Soccorso oppure di
              pazienti che devono eseguire esami urgenti.
            </p>

            <p className="text_accettazione">
              Nella stessa sala d’attesa sono inoltre presenti pazienti che
              devono eseguire le indagini radiologiche in diagnostiche
              differenti e pertanto l’ordine delle chiamate varia a seconda
              dell’esame da eseguire e della disponibilità della diagnostica in
              cui si esegue l’esame.
            </p>

            <p className="text_accettazione ">
              Alcuni giorni prima dell’appuntamento, potreste essere contattati
              dal personale di accettazione, al numero di telefono da voi
              rilasciato, per conferma. In caso vengano fornite sedute
              aggiuntive o nel caso si liberino dei posti causa disdetta, il
              personale d’accettazione provvede ad anticipare le prenotazioni
              contattando telefonicamente i pazienti.
            </p>
            <p className="text_accettazione">
              Il pagamento deve essere effettuato il giorno dell’esame, presso
              gli sportelli di Accettazione con le seguenti modalità: contanti,
              carta di credito, assegno.
            </p>
            <p className="text_accettazione">
              Il ticket pagato presso la nostra struttura per l’effettuazione di
              prestazioni accreditate con il Servizio Sanitario Nazionale ha lo
              stesso importo ticket pagato presso le Strutture Pubbliche.
            </p>
            <p className="text_accettazione">
              Per info sull’accesso alle prestazioni private e ai relativi costi
              vi preghiamo di chiamare il numero 080 xxx xxx.
            </p>
          </Col>
          <Col sm={12} md={2}>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h6 className="h4_referti text-center">Chiamaci</h6>
              <div
                className={`icon-container ${isVisible ? "fade-in" : ""} my-2`}
              >
                <FaPhoneFlip className="my-2 icon_referti" />
              </div>
              <h4 className="h4_referti mt-2"> 080 000 0000</h4>
              <h6 className="h6_referti text-center">Dal lunedì al venerdì:</h6>
              <p className="text_referti text-center">dalle 08:00 alle 12:00</p>
              <p className="mb-2 text_referti text-center">
                dalle 14:30 alle 18:30
              </p>
              <h6 className="h6_referti text-center">Sabato:</h6>
              <p className="text_referti mb-2 text-center">
                dalle 08:00 alle 12:00
              </p>
              <p className="text_referti text-center">
                oppure compila il modulo per richiedere una prenotazione
              </p>
              <Button
                as={Link}
                to="/prenota-esame"
                className="mb-5 btn_prenota_online btn-primary"
              >
                Prenota online
              </Button>
              <h4 className="h4_referti"> Dove Siamo</h4>
              <p className="text_referti">Ricerche Radiologiche S.r.l.</p>
              <p className="text_referti">Via Roma 1, 00100 Roma</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
