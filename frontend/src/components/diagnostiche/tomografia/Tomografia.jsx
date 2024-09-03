import React from "react";
import "./tomografia.css";
import { Row, Col, Container, Image } from "react-bootstrap";
import Sala1 from "../../../image/sala1.jpg";
import Sala2 from "../../../image/sala2.jpg";

export default function Tomografia() {
  return (
    <>
      <Container fluid className="prenotazione-esame mb-4 p-0">
        <Row>
          <Col>
            <h2 className=" text-center title_principale_tomografia pt-4 pb-4">
              Tomografia Computerizzata - iCT
            </h2>
          </Col>
        </Row>
      </Container>
      <Container className="mb-4">
        <Row className="ms-3">
          <Col sm={12}>
            <p className="text_tomografia">
              La Tomografia Computerizzata, indicata con l’acronimo TC, ha
              rivoluzionato il mondo della Diagnostica per immagini. La TC i6000
              iCT Philips a 256 strati di ultimissima generazione, in dotazione
              presso il nostro Centro, rappresenta uno dei sistemi di tomografia
              computerizzata più avanzati attualmente disponibili sul mercato.
            </p>

            <h4 className="h4_tomografia ps-4 text-start title_tomografia mb-3">
              Che cos’è?
            </h4>
            <p className="text_tomografia">
              Questa metodica fornisce una serie di immagini assiali a strato
              sottile distinguendo i vari organi e tessuti in base alla loro
              densità. Sfruttando i raggi X si acquisiscono dei profili di
              attenuazione dai quali, con l’impiego di complessi algoritmi
              matematici, sono generate e ricostruite nel modello
              tridimensionale le immagini delle strutture anatomiche presenti
              nello strato considerato. Costantemente aggiornata, garantisce
              un’elevata risoluzione di contrasto, acquisizioni volumetriche in
              tempi brevissimi e di ridurre notevolmente l’esposizione ai raggi
              X (circa dell’80%) grazie alla recente implementazione del potente
              software i-Dose. E’ dotata del software di ricostruzione iterativa
              (Tecnologia Philips IMR) che consente di rielaborare velocemente
              immagini di elevata qualità, assicurando una visualizzazione
              avanzata di piccoli dettagli anche nelle applicazioni più
              complesse, con specifica ottimizzazione per l’imaging oncologico,
              per quei pazienti che devono sottoporsi a controlli periodici per
              follow-up.
            </p>

            <h4 className="h4_tomografia ps-4 text-start title_tomografia mb-3">
              Perchè si fa?
            </h4>
            <p className="text_tomografia">
              Trova ampio utilizzo nello studio di patologie neoplastiche,
              neurologiche, cardiovascolari, muscoloscheletriche e ortopediche.
              Secondo la tipologia di esame da effettuare e/o sulla base del
              quesito clinico l’esame è eseguibile senza e con somministrazione
              di mezzo di contrasto. L’impiego del mezzo di contrasto estende i
              limiti clinici nell’ambito dell’imaging:
            </p>
            <ul className="text_tomografia">
              <li>
                cerebrale, in situazioni di emergenza (emorragie, ischemie
                cerebrali)
              </li>
              <li>
                cardiaco (Cardio-TC, Coronaro-TC e Calcium Index Score
                coronarico)
              </li>
              <li>vascolare (Angio-TC dei vasi sanguigni)</li>
              <li>polmonare (Studio HRCT)</li>
              <li>addominale (Entero-TC, Uro-TC e Colonscopia virtuale)</li>
              <li>hole Body (Tc Total Body)</li>
            </ul>
            <p className="text_tomografia">
              Uno degli utilizzi più frequenti, tanto da diventare il gold
              standard della tomografia computerizzata per la diagnosi di molte
              patologie, è lo studio del cranio e dell’encefalo. La complessità
              di questa regione anatomica e la presenza di numerose strutture
              sovrapposte, nonché la necessità di visualizzare dettagli spesso
              propedeutici ad un intervento neurochirurgico, rende
              indispensabile la possibilità di ottenere immagini multiplanari ad
              alta risoluzione. Nonostante la risonanza magnetica abbia ormai
              acquisito maggiore importanza per quanto riguarda lo studio
              dell’encefalo, la TC garantisce tempi di esecuzione nettamente
              inferiori, non presenta problematiche relative alla presenza degli
              elevati campi magnetici e di claustrofobia, rendendo tale metodica
              la prima scelta, nonché la più adatta in situazioni di emergenza
              come traumi cranici e sospetti ictus cerebrali (emorragici o
              ischemici).
            </p>
            <h4 className="h4_tomografia ps-4 text-start title_tomografia mb-3">
              Informazioni utili
            </h4>

            <p className="text_tomografia">
              Il paziente, prima di eseguire l’esame TC, è invitato a togliere
              eventuali oggetti metallici che potrebbero inficiare con i
              risultati dell’esame.
            </p>
            <p className="text_tomografia">
              Per gli esami che prevedono la somministrazione del mezzo di
              contrasto, il paziente deve presentarsi il giorno dell’esame a
              digiuno da almeno 6 ore e con il risultato, non eccedente i 90
              giorni che precedono il giorno dell’esame, del dosaggio della
              creatininemia e dell’elettrocardiogramma. Utile, e di fondamentale
              importanza, il confronto con eventuali esiti di indagini
              radiologiche precedenti, che consigliamo di consegnare in visione
              al momento dell’esame al personale di reparto.
            </p>
            <ul className="text_tomografia">
              <li>
                È consentito assumere l’abituale terapia domiciliare secondo
                l’indicazione del proprio Medico di base.
              </li>
              <li>
                n caso di allergie note o pregresse al mezzo di contrasto, gravi
                allergie a farmaci o sostanze, in presenza di insufficienza
                renale cronica, il Medico Curante dovrebbe considerare
                prioritariamente indagini diagnostiche alternative che non
                prevedano somministrazione di mezzi di contrasto; qualora il
                mezzo di contrasto fosse necessario, è raccomandato contattare
                il medico anestesista del Centro.
              </li>
            </ul>
            <p className="text_tomografia">
              In genere non è necessaria alcuna attesa al termine dell’esame,
              anche se, nel caso di iniezione endovenosa di mezzo di contrasto,
              è prudente attendere qualche minuto in reparto, per sorvegliare
              l’eventuale esordio di una reazione allergica.
            </p>
            <p className="text_tomografia">
              Il paziente, terminato l’esame, non deve eseguire prescrizioni
              particolari e può riprendere la sua normale attività quotidiana.
            </p>
            <h4 className="h4_impegni ps-4 text-start title_tomografia mb-3">
              Controindicazioni
            </h4>
            <p className="text_tomografia">
              Per le pazienti in età fertile, l’esame va eseguito solo previa
              esclusione di uno stato di gravidanza. È fondamentale informare il
              personale sanitario del Centro di accertata o presunta gravidanza
              in atto, prima di sottoporsi a esami che prevedono l’utilizzo di
              radiazioni ionizzanti.
            </p>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6}>
            <Image src={Sala1} fluid />
          </Col>
          <Col sm={12} md={6}>
            <Image src={Sala2} fluid />
          </Col>
        </Row>
      </Container>
    </>
  );
}
