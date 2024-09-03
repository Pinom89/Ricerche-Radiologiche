import React , { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./referti.css";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Referti() {
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
            <h2 className=" text-center title_principale_referti pt-4 pb-4">
              Referti
            </h2>
          </Col>
        </Row>
      </Container>
      <Container className="mb-4">
        <Row>
          <Col sm={12} md={10}>
            <h4 className="h4_referti ps-4 title_referti mb-3">
              Orari di apertura
            </h4>
            <p className="text_referti">
              Il Paziente può ritirare il referto personalmente in accettazione
              nel giorno e nell’orario indicato sul modulo di consegna referti
              rilasciato, o nei giorni successivi, dal lunedì al venerdì dalle
              ore 09:00 alle 18:30, il sabato dalle ore 09:00 alle 12:30.
            </p>
            <p className="text_referti">
              A tutela della riservatezza dei dati personali e in ottemperanza a
              quanto previsto dalla normativa vigente in materia di Privacy
              (RGPD n. 679/2016), i referti sono consegnati in busta chiusa
              esclusivamente al Paziente o a persona munita di delega e di
              documento di riconoscimento in corso di validità sia del delegato
              che del delegante. In assenza di tali condizioni, il personale di
              accettazione non è autorizzato a consegnare il referto al
              richiedente.
            </p>
            <h4 className="h4_referti ps-4 title_referti mb-3">
              Utente con età inferiore ai 18 anni
            </h4>
            <p className="text_referti">
              Gli utenti minori di età devono necessariamente esser accompagnati
              da chi ne esercita la patria potestà: genitori, tutore o curatore
              speciale. In caso contrario abbiamo il dovere di non procedere
              alla consegna del referto della prestazione effettuata. Nel caso
              in cui il minore dovesse presentarsi accompagnato da un parente
              che non esercita la patria potestà è necessario che sia munito o
              di una delega o di un’autorizzazione scritta e firmata.
            </p>
            <h4 className="h4_referti ps-4 title_referti mb-3">
              Consegna referto tramite Servizio di Posta Prioritaria a domicilio
            </h4>
            <p className="text_referti">
              Offriamo la disponibilità di richiedere consegna dei referti a
              domicilio a condizioni particolarmente vantaggiose tramite il
              servizio di posta prioritaria. Qualora il paziente volesse
              usufruire di tale servizio, effettuato l’esame, deve darne
              comunicazione al personale dell’accettazione.
            </p>
            <h4 className="h4_referti ps-4 title_referti mb-3">
              Copia del referto
            </h4>
            <p className="text_referti ">
              Per richiedere copia del referto o dell’intero esame l’interessato
              deve necessariamente contattare la struttura al numero 080xxxxxxx,
              così da poter avviare la procedura di duplicazione. Di seguito
              saranno fornite tutte le informazioni necessarie per il ritiro.
            </p>
          </Col>
          <Col sm={12} md={2}>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h6 className="h4_referti text-center">Chiamaci</h6>
                <div className={`icon-container ${isVisible ? 'fade-in' : ''} my-2`}>
              <FaPhoneFlip className="my-2 icon_referti"/>
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
