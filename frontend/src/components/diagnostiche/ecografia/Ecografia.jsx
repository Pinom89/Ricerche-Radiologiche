import React from "react";
import ecografo from "../../../image/ecografo.jpg";
import { Container, Col, Row } from "react-bootstrap";
import "./ecografia.css";

export default function Ecografia() {
  return (
    <>
      <Container fluid className="title_principale_ecografia mb-4 p-0">
        <Row>
          <Col>
            <h2 className=" text-center title_principale_ecografia pt-4 pb-4">
              Ecografia ed Ecocolordoppler
            </h2>
          </Col>
        </Row>
      </Container>
      <Container className="mb-4">
        <Row className="ms-3">
          <Col sm={12}>
            <p className="text_ecografia">
              Il nostro Centro dispone di due ecografi di ultima generazione,
              con sonde differenziate e dedicate alle differenti strutture
              anatomiche e ai diversi quesiti clinici da studiare:
            </p>
          </Col>
        </Row>
        <Row className="ms-3">
          <Col sm={12} md={4}>
            <ul className="text_ecografia">
              <li>cute e sottocute</li>
              <li>patologie tiroidee</li>
              <li>tronchi sovraortici</li>
              <li>
                flusso arterioso e venosi degli arti superiori e inferiori
              </li>
              <li>ghiandole mammarie</li>
              <li>displasia dell’anca neonatale</li>
              <li>displasia dell’anca neonatale</li>
              <li>apparato osteo-articolare</li>
              <li>apparato muscolo-tendineo</li>
            </ul>
          </Col>
          <Col sm={12} md={8}>
            <img src={ecografo} alt="ecografo" className="img-fluid my-2" />
          </Col>
        </Row>
        <Row className="ms-3">
          <Col sm={12}>
            <h4 className="h4_ecografia ps-4 text-start title_ecografia mb-3">
              Che cos’è?
            </h4>
            <p className="text_ecografia">
              L’ecografia è una metodica di indagine diagnostica che si basa
              sull’utilizzo degli ultrasuoni, sfruttando il principio
              dell’emissione di eco e della trasmissione delle onde ultrasonore
              ad alta frequenza. Gli ultrasuoni generano un segnale di ritorno
              che consente di visualizzare a monitor ed in tempo reale le
              condizioni degli organi superficiali e profondi.
            </p>
            <p className="text_ecografia">
              L’ecocolordoppler, il cui principio di funzionamento si basa sull’
              associazione in tempo reale di un’immagine ecografica
              bidimensionale con un segnale doppler pulsato, consente lo studio
              simultaneamente ed in tempo reale, della morfologia e struttura
              degli organi, delle caratteristiche di flusso nei vasi del circolo
              arterioso e venoso e la vascolarizzazione di organi e apparati.
            </p>
            <p className="text_ecografia">
              Uno dei maggiori punti di forza dell’ecografia è l’assenza di
              radiazioni ionizzanti che la rendono totalmente innocua e non
              invasiva. Tuttavia l’esame potrebbe presentare delle limitazioni
              intrinseche da considerare in funzione del sospetto clinico, della
              metodica (profondità delle strutture) e del paziente (obesità,
              ridotta capacità a trattenere il respiro, meteorismo intestinale).
            </p>
            <h4 className="h4_ecografia ps-4 text-start title_ecografia mb-3">
              Perchè si fa?
            </h4>
            <p className="text_ecografia">
              Nella pratica clinica le strutture delle quali si analizza la
              velocità sono i globuli rossi all’interno dei vasi. Grazie
              all’effetto Doppler è possibile ottenere informazioni diagnostiche
              precise sulla presenza, sulla direzione e sul tipo di flusso.{" "}
            </p>
            <p className="text_ecografia">
              In flebologia, l’ecodoppler è una metodica altamente affidabile
              nella diagnosi delle trombosi venose profonde. Consente la
              definizione della sede e dell’estensione dell’occlusione venosa,
              l’analisi del grado di compattezza, di organizzazione e di
              aderenza del trombo. Permette di dimostrare l’eventuale presenza
              di trombi parzialmente liberi nel torrente ematico, flottanti, a
              rischio embolico. Nelle sindromi varicose lo studio emodinamico e
              morfologico del circolo venoso superficiale, delle giunzioni
              safeniche, delle vene perforanti e del circolo venoso profondo
              sono un preliminare imprescindibile sia per la terapia chirurgica
              tradizionale che per la chirurgia conservativa. In campo
              arterioso, consente non solo la valutazione del grado di stenosi
              morfologica e dinamica dei segmenti arteriosi esaminati, ma anche
              un’analisi strutturale morfologica della placca ateromasica. Tale
              valutazione ultrasonografica dei vasi epiaortici racchiude un
              grande valore nella prevenzione dell’ictus cerebrale.
            </p>
            <p className="text_ecografia">
              L’ecocolordoppler dell’aorta addominale permette di diagnosticare,
              con elevata sensibilità, la presenza di stenosi o aneurismi del
              calibro aortico, definendo diametri, eventuale presenza di trombi
              murali, discontinuità e disomogeneità parietali, versamenti
              ematici retro peritoneali e/o dissecazioni. A livello iliaco
              femorale ed a livello degli arti consente di individuare eventuali
              stenosi, occlusioni o circoli collaterali di compenso. Anche le
              arterie renali, il tronco celiaco e le mesenteriche possono essere
              agevolmente insonorizzate e studiate.
            </p>
            <h4 className="h4_ecografia ps-4 text-start title_ecografia mb-3">
              Informazioni utili
            </h4>
            <p className="text_ecografia">
              Per lo studio degli organi addominali (in particolare, fegato e
              colecisti) è buona norma seguire, nei 3 giorni precedenti l’esame,
              una dieta povera di scorie (evitare frutta e verdura, formaggi e
              bevande gassate) ed osservare il digiuno assoluto per almeno 6 ore
              prima. Per lo studio degli organi pelvici, (vescica, utero ed
              ovaie, prostata), è necessario avere la vescica piena (aver finito
              di bere 1 litro di acqua circa 1 ora prima dell’esame). In
              particolari condizioni (studio di organi addominali e pelvici in
              pazienti sofferenti di stitichezza ed ecografia transrettale per
              lo studio della prostata) è consigliabile effettuare un clistere
              di pulizia qualche ora prima dell’esame. Per tutti gli altri esami
              non è necessaria alcuna preparazione. Il paziente, terminato
              l’esame, non deve eseguire regimi o prescrizioni particolari e può
              immediatamente riprendere la sua normale attività quotidiana.
            </p>
            <h4 className="h4_ecografia ps-4 text-start title_ecografia mb-3">
              Controndicazioni
            </h4>
            <p className="text_ecografia">
              L’esame di facile esecuzione, è del tutto innocuo e indolore e non
              presenta controindicazioni.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
