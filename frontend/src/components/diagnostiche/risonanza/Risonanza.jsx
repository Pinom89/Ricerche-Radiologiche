import React from "react";
import "./risonanza.css";
import { Container, Row, Col } from "react-bootstrap";

export default function Risonanza() {
  return (
    <>
      <Container fluid className="prenotazione-esame mb-4 p-0">
        <Row>
          <Col>
            <h2 className=" text-center title_principale_risonanza pt-4 pb-4">
              Risonanza Magnetica ad alto campo 1,5T
            </h2>
          </Col>
        </Row>
      </Container>
      <Container className="mb-4">
        <Row className="ms-3">
          <Col sm={12}>
            <p className="text_risonanza">
              Il nostro Centro dispone di due potenti apparecchiature di
              risonanza magnetica Philips Achieva D-Stream 1,5T ad alto campo.
            </p>
            <h4 className="h4_risonanza ps-4 text-start title_risonanza mb-3">
              Che cos’è?
            </h4>
            <p className="text_risonanza">
              La RM è una tecnica di imaging multiparametrica non invasiva che
              fornisce immagini di sezioni multiplanari del corpo umano
              utilizzando le proprietà dei campi magnetici e degli impulsi di
              radiofrequenze. I progressi tecnologici degli ultimi anni
              consentono l’acquisizione di immagini morfologiche ad alta
              risoluzione e di informazioni di tipo metabolico funzionale,
              fondamentali per una corretta diagnosi. Il software, costantemente
              aggiornato, consente ulteriori elaborazioni in post-processing, di
              ricostruzione e valutazione multiplanare 3D, con possibilità di
              stampa su pellicola e/o su carta certificata dell’iconografia
              selezionata e archiviazione su disco.
            </p>

            <h4 className="h4_risonanza ps-4 text-start title_risonanza mb-3">
              Perchè si fa?
            </h4>
            <p className="text_risonanza">
              La risonanza magnetica è utilizzata per lo studio di diversi
              organi e per la formulazione di diagnosi di molteplici patologie.
              Secondo la tipologia di esame da effettuare e/o sulla base del
              quesito clinico l’esame è eseguibile senza e con somministrazione
              endovenosa di mezzo di contrasto. Inoltre, tecniche avanzate
              consentono valutazioni di tipo funzionale oltre che morfologiche
              in ambito:
            </p>
            <ul className="text_risonanza">
              <li>neurologico (Diffusione, Perfusione, Spettroscopia)</li>
              <li>cardiologico (Cardio-RM)</li>
              <li>vascolare (Angio-TC dei vasi sanguigni)</li>
              <li>polmonare (Studio HRCT)</li>
              <li>addominale (Entero-TC, Uro-TC e Colonscopia virtuale)</li>
              <li>Whole Body (Tc Total Body)</li>
            </ul>
            <p className="text_risonanza">
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
            <h4 className="h4_risonanza ps-4 text-start title_risonanza mb-3">
              Informazioni utili
            </h4>

            <p className="text_risonanza">
              In caso di allergie note o pregresse al mezzo di contrasto, gravi
              allergie a farmaci o sostanze, in presenza di insufficienza renale
              cronica, il Medico Curante dovrebbe considerare prioritariamente
              indagini diagnostiche alternative che non prevedano
              somministrazione di mezzi di contrasto; qualora il mezzo di
              contrasto fosse necessario, è raccomandato contattare il medico
              anestesista del Centro.
            </p>
            <p className="text_risonanza">
              Per gli esami che prevedono la somministrazione del mezzo di
              contrasto, il paziente deve presentarsi il giorno dell’esame a
              digiuno da almeno 6 ore e con il risultato non eccedente i 90
              giorni che precedono il giorno dell’esame, del dosaggio della
              creatininemia, dell’azotemia e del calcolo del filtrato
              glomerulare. È consentito assumere l’abituale terapia domiciliare
              secondo l’indicazione del proprio Medico di base.
            </p>
            <p className="text_risonanza">
              Utile, e di fondamentale importanza, il confronto con eventuali
              esiti di indagini radiologiche precedenti, che consigliamo di
              consegnare al momento dell’esame al personale di reparto.
            </p>
            <p className="text_risonanza">
              In genere non è necessaria alcuna attesa al termine dell’esame,
              anche se, nel caso di iniezione endovenosa di mezzo di contrasto,
              è prudente attendere qualche minuto in reparto, per sorvegliare
              l’eventuale esordio di una reazione allergica.
            </p>
            <p className="text_risonanza">
              I pazienti claustrofobici, eventualmente, possono eseguire gli
              esami in sedazione previo colloquio con il medico Anestesista del
              Centro.
            </p>
            <p className="text_risonanza">
              Il paziente, terminato l’esame, non deve eseguire prescrizioni
              particolari e può riprendere la sua normale attività quotidiana.
            </p>

            <h4 className="h4_impegni ps-4 text-start title_risonanza mb-3">
              Controindicazioni
            </h4>
            <p className="text_risonanza">
              Durante la gravidanza l’esame non è controindicato, anche se la
              letteratura consiglia di evitarlo nelle prime 12 settimane, se non
              è assolutamente indispensabile e urgente.
            </p>
            <p className="text_risonanza">
              Pur essendo un esame sicuro, esistono alcune condizioni nelle
              quali è impossibile (controindicazione assoluta) o preferibile
              (controindicazione relativa) non esporsi al campo magnetico
              generato dalla risonanza magnetica.{" "}
            </p>
            <ul className="text_risonanza">
              <li>
                Controindicazione assoluta: essere portatori di clips vascolari
                endocraniche ferro-magnetiche su aneurismi in assenza di una
                precisa documentazione che ne accerti la compatibilità, o di
                pacemaker cardiaco.
              </li>
              <li>
                Controindicazione relative: la presenza di schegge o frammenti
                metallici, di esser portatori di impianti protesici,
                stimolatori, dispositivi metallici, stabilizzatori vertebrali,
                impianti per udito, pompe di infusione per insulina o altri
                farmaci, neurostimolatori, derivazione spinale o ventricolare,
                corpi intrauterini (spirale contraccettiva), lenti a contatto
                rigide, protesi dentarie fisse o mobili. Di essersi sottoposti
                ad interventi del cristallino (cataratta), o di esser affetti da
                anemia falciforme.
              </li>
            </ul>
            <p className="text_risonanza">
              La presenza di uno qualsiasi di questi elementi deve esser
              attentamente valutata prima dell’esecuzione dell’esame. Per tutti
              i dispositivi medici impiantati è indispensabile la certificazione
              della compatibilità con apparecchiature di risonanza magnetica,
              che di norma dovrebbe essere rilasciata unitamente alla relazione
              di dimissione e/o intervento chirurgico.
            </p>
            <ul className="text_risonanza">
              <li>
                Protesi del cristallino: da linee guide si ritengono sicure
                quelle impiantate dopo gli anni novanta.
              </li>
              <li>
                Dispositivi intrauterini (IUD): l’esame può esser effettuato
                anche con IUD, ma si suggerisce una visita ginecologica per
                verificarne il corretto posizionamento.
              </li>
              <li>
                Tatuaggi: in relazione alla differente composizione dei colori
                contenuti nell’inchiostro, la presenza di tatuaggi potrebbe
                compromettere il dettaglio delle immagini e produrre artefatti o
                il surriscaldamento della zona tatuata. In tal caso si valuta
                l’interruzione o la ripetizione dell’esame.
              </li>
              <li>
                Piercing, protesi dentarie rimovibili, protesi acustiche,
                cosmetici, oggetti metallici: da rimuovere prima dell’ingresso
                nella sala magnete.
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
}
