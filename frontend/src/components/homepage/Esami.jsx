import React from "react";
import { Container, Tabs, Tab, Col, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./style.css";
import radiologia from "../../image/radiologia-180x180.png";
import ecografia from "../../image/ecografia-180x180.png";
import senologia from "../../image/senologia-180x180.png";
import risonanza from "../../image/risonanza-180x180.png";
import tac from "../../image/tc-180x180.png";
import panoramica from "../../image/cone-beam-180x180.png";

export default function Esami() {
  const navigate = useNavigate();
  return (
    <Container fluid className="mt-5 p-0" data-testid="mock-esami">
      <Tabs
        defaultActiveKey="Radiologia"
        id="uncontrolled-tab-example"
        className="mb-3 justify-content-center"
      >
        <Tab
          eventKey="Radiologia"
          title={
            <div className="d-flex flex-column align-items-center">
              <div className="tab-image-container">
                <img
                  src={radiologia}
                  alt="Radiologia"
                  className="tab-image img-fluid"
                  
                />
              </div>
              <span className=".text-title-esami">RADIOLOGIA</span>
            </div>
          }
          className="tab_esami"
        >
          <Row className="p-5">
            <Col sm={12} md={6}>
              <h4 className="h4_esami my-3">Radiologia digitale</h4>
              <p className="text_esami">
                L’esame radiologico è l’indagine di primo livello della
                Diagnostica per Immagini. Si basa sulle proprietà che hanno i
                raggi X di attraversare i tessuti dell’organismo e imprimere su
                una pellicola radiografica l’immagine del distretto anatomico
                studiato, tutelando al massimo la salute e la sicurezza dei
                pazienti. Fornisce informazioni imprescindibili nel sospetto
                diagnostico delle patologie respiratorie, osteoarticolari,
                dell’addome e dell’apparato urogenitale. Disponiamo di
                apparecchiature radiologiche dotate di sistema di acquisizione
                digitalizzato, con controllo automatizzato della dose
                d’esposizione. Il software di rielaborazione AGFA Healtcare
                implementato, garantisce risultati in alta definizione con
                possibilità di stampa su pellicola e/o su carta certificata
                dell’iconografia selezionata e archiviazione su disco.
              </p>
              <p className="text_esami">
                L’approfondimento diagnostico con somministrazione di mezzo di
                contrasto è previsto per i seguenti esami:
              </p>
              <ul className="text_esami">
                <li> studio del tubo digerente completo</li>
                <li> studio del transito intestinale (tenue minutato) </li>
                <li> clisma opaco a doppio contrasto </li>
                <li> valutazione post-chirurgica bariatrica </li>
                <li> urografia </li>
                <li> cistouretrografia retrograda minzionale </li>
              </ul>
            </Col>
            <Col sm={12} md={6}>
              <h4 className="h4_esami my-3">Densitometria ossea</h4>
              <p className="text_esami">
                La Densitometria Ossea, nota come DEXA (Dual-Energy X-ray
                Absorptiometry) o MOC (Mineralometria Ossea Computerizzata),
                consente di rilevare e quantificare strumentalmente la densità
                minerale ossea secondo la classificazione proposta
                dall’Organizzazione Mondiale della Sanità (OMS). L’indagine,
                utilizza raggi X a bassissima dose ed è di rapida esecuzione.
                Riveste un ruolo fondamentale per la diagnosi dell’Osteoporosi e
                il monitoraggio della sua evoluzione nel tempo.
              </p>
              <p className="text_esami">
                Per la valutazione clinica globale del paziente, il risultato
                densitometrico deve essere necessariamente integrato con
                l’analisi dei fattori di rischio per osteoporosi e fratture e
                con eventuali indagini di laboratorio e/o strumentali relative
                alla struttura scheletrica:
              </p>
              <ul className="text_esami">
                <li>
                  menopausa con anamnesi familiare di frattura osteoporotica in
                  età inferiore ai 75 anni{" "}
                </li>
                <li>menopausa precoce o chirurgica </li>
                <li>malattie reumatiche </li>
                <li>pregresse fratture </li>
                <li>uso di farmaci (cortico-steroidi, inibitori aromatasi) </li>
                <li>abuso di alcool </li>
                <li>fumo </li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="text-center my-4">
              <Button
                variant="light"
                onClick={() => navigate("/radiologia-digitale")}
              >
                Per saperne di più
              </Button>
            </Col>
          </Row>
        </Tab>
        <Tab
          eventKey="Dental"
          title={
            <div className="d-flex flex-column align-items-center">
              <div className="tab-image-container">
                <img
                  src={panoramica}
                  alt="Panoramica dentale"
                  className="tab-image img-fluid"
                  
                />
              </div>
              <span className=".text-title-esami">DENTAL</span>
            </div>
          }
          className="tab_esami"
        >
          <Row className="p-5">
            <Col sm={12} md={8}>
              <h4 className="h4_esami mt-2 mb-3">Diagnostica dentale</h4>
              <p className="text_esami">
                La Diagnostica Dentale dispone di apparecchiature radiologiche
                di ultima generazione. Una perfetta combinazione di
                funzionalità, qualità e design. Il Cone Beam CT 3D della NEWTOM
                ad emissione pulsata, di recente installazione (2019), affianca
                gli esami ad oggi effettuati con la tradizionale Tc dentalscan
                per pianificare il miglior trattamento in applicazioni di
                implantologia, endodonzia, parodontologia e chirurgia
                maxillofacciale. L’implementazione di protocolli sofisticati
                permette di ridurre sensibilmente le emissioni radiogene
                evitando di esporre i pazienti a dosi in eccesso. Il software
                esclusivo genera immagini in altissima definizione e consente
                ulteriori elaborazioni in post-processing, di ricostruzione e
                valutazione multiplanare 3D, con possibilità di stampa su
                pellicola e/o su carta certificata dell’iconografia selezionata
                e archiviazione su disco.
              </p>
            </Col>
            <Col sm={12} md={4}>
              <p className="text_esami mt-5">
                {" "}
                L’Orthophos XG 5 della Sirona, con braccio cefalometrico per
                telecranio, è utilizzato per lo studio in prima istanza dei
                denti, delle arcate dentarie e delle ossa mascellari e
                mandibolari in modalità panoramica 2D. Consente lo studio
                stratigrafico delle articolazioni temporo-mandibolari per la
                valutazione della motilità articolare in caso di blocco in
                apertura o chiusura buccale, bruxismo, e anomalie congenite o
                acquisite non risalibili ad altre patologie o problematiche.
              </p>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="text-center my-4">
              <Button
                variant="light"
                onClick={() => navigate("/panoramica-dentale")}
              >
                Per saperne di più
              </Button>
            </Col>
          </Row>
        </Tab>
        <Tab
          eventKey="Ecografia"
          title={
            <div className="d-flex flex-column align-items-center">
              <div className="tab-image-container">
                <img
                  src={ecografia}
                  alt="ecografia"
                  className="tab-image img-fluid"
                  
                />
              </div>
              <span className=".text-title-esami">ECOGRAFIA</span>
            </div>
          }
          className="tab_esami"
        >
          <Row className="p-5">
            <Col sm={12} md={8}>
              <h4 className="h4_esami mt-2 mb-3">
                Ecografia – Ecocolordoppler
              </h4>
              <p className="text_esami">
                L’ecografia è una metodica di indagine diagnostica che si basa
                sull’uso degli ultrasuoni, sfruttando il principio
                dell’emissione di eco e della trasmissione delle onde
                ultrasonore ad alta frequenza. Gli ultrasuoni generano un
                segnale di ritorno che consente di visualizzare a monitor ed in
                tempo reale le condizioni degli organi superficiali e profondi.
                L’ecocolordoppler, il cui principio di funzionamento si basa
                sull’ associazione in tempo reale di un’immagine ecografica
                bidimensionale con un segnale doppler pulsato, consente lo
                studio simultaneamente ed in tempo reale, della morfologia e
                struttura degli organi, delle caratteristiche di flusso nei vasi
                del circolo arterioso e venoso e la vascolarizzazione di organi
                e apparati. Uno dei maggiori punti di forza dell’ecografia è
                l’assenza di radiazioni ionizzanti che la rendono totalmente
                innocua e non invasiva. Tuttavia l’esame potrebbe presentare
                delle limitazioni intrinseche da considerare in funzione del
                sospetto clinico, della metodica (profondità delle strutture) e
                del paziente (obesità, ridotta capacità a trattenere il respiro,
                meteorismo intestinale).
              </p>
            </Col>
            <Col sm={12} md={4}>
              <p className="text_esami mt-5">
                La nostra struttura dispone di due ecografi di ultima
                generazione, con sonde differenziate e dedicate alle differenti
                strutture anatomiche e ai diversi quesiti clinici da studiare:
              </p>
              <ul>
                <li>cute e sottocute</li>
                <li>patologie tiroidee</li>
                <li>tronchi sovraortici</li>
                <li>
                  flusso arterioso e venosi degli arti superiori e inferiori
                </li>
                <li>ghiandole mammarie</li>
                <li>displasia dell’anca neonatale</li>
                <li>patologie addominali</li>
                <li>apparato osteo-articolare</li>
                <li>apparato muscolo-tendineo</li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="text-center my-4">
              <Button variant="light" onClick={() => navigate("/ecografia")}>
                Per saperne di più
              </Button>
            </Col>
          </Row>
        </Tab>
        <Tab
          eventKey="Senologia"
          title={
            <div className="d-flex flex-column align-items-center">
              <div className="tab-image-container">
                <img
                  src={senologia}
                  alt="senologia"
                  className="tab-image img-fluid"
                  
                />
              </div>
              <span className=".text-title-esami">SENOLOGIA</span>
            </div>
          }
          className="tab_esami"
        >
          <Row className="p-5">
            <Col sm={12} md={8}>
              <h4 className="h4_esami mt-2 mb-3">Senologia</h4>
              <p className="text_esami">
                La nostra struttura offre alle donne una sezione dedicata alla
                senologia per garantire un percorso diagnostico completo per le
                patologie della mammella.
              </p>
              <p className="text_esami">L’iter prevede:</p>
              <ul className="text_esami">
                <li>
                  {" "}
                  visita senologica, consigliabile una volta l’anno per le donne
                  a partire dai 25 anni
                </li>
                <li> mammografia, da eseguire una volta l’anno, dai 40 anni</li>
                <li>
                  {" "}
                  ecografia, indicata a completamento della visita senologica
                  dopo i 25 anni, o della mammografia dai 40 anni
                </li>
                <li>
                  {" "}
                  risonanza magnetica, senza e con somministrazione di mezzo di
                  contrasto, a completamento dell’iter diagnostico in casi
                  selezionati
                </li>
              </ul>
              <p className="text_esami">
                {" "}
                Queste indagini sono fondamentali per la prevenzione, al fine di
                verificare la presenza o meno di lesioni di piccole dimensioni
                che si presentano sotto forma di opacità nodulari a margini
                irregolari, microcalcificazioni polimorfe, oppure aree di
                distorsione strutturale prima che siano palpabili e si
                manifestino altri sintomi, e quando ancora le possibilità di
                recupero e guarigione sono elevate. D’altra parte sono
                necessarie nel controllo di diagnosi di malattia già nota.
              </p>
            </Col>
            <Col sm={12} md={4}>
              <p className="text_esami mt-5">
                In linea con la nostra strategia di avanguardia tecnologica,
                disponiamo di un nuovo apparecchio mammografico digitale con
                tomosintesi, il GE Senographe 3D Mammography Essential, di un
                potente ecografo Philips e di una risonanza Philips Achieva 1,5
                T ad alto campo.
              </p>
              <p className="text_esami">
                Presso il nostro Centro vengono effettuati ulteriori
                approfondimenti specialistici per definire la natura delle
                lesioni mammarie e per capire se necessitano di controlli, di
                intervento chirurgico o di terapia.
              </p>
              <ul className="text_esami">
                <li>agoaspirato (prelievo citologico) </li>
                <li>agocentesi (prelievo delle formazioni cistiche) </li>
                <li> prelievo e analisi del secreto </li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="text-center my-4">
              <Button variant="light" onClick={() => navigate("/senologia")}>
                Per saperne di più
              </Button>
            </Col>
          </Row>
        </Tab>
        <Tab
          eventKey="Tc"
          title={
            <div className="d-flex flex-column align-items-center">
              <div className="tab-image-container">
                <img src={tac} alt="Tac" className="tab-image" img-fluid />
              </div>
              <span className=".text-title-esami">TAC</span>
            </div>
          }
          className="tab_esami"
        >
          <Row className="p-5">
            <Col sm={12} md={8}>
              <h4 className="h4_esami mt-2 mb-3 ms-2">TC</h4>
              <p className="text_esami my-2">
                La Tomografia Computerizzata, indicata con l’acronimo TC, ha
                rivoluzionato il mondo della Diagnostica per immagini.
              </p>
              <p className="text_esami my-2">
                La TC i6000 iCT Philips a 256 strati di ultimissima generazione,
                in dotazione presso il nostro Centro, rappresenta uno dei
                sistemi di tomografia computerizzata più avanzati attualmente
                disponibili sul mercato.
              </p>
              <p className="text_esami my-2">
                Questa metodica fornisce una serie di immagini assiali a strato
                sottile distinguendo i vari organi e tessuti in base alla loro
                densità. Si acquisiscono dei profili di attenuazione dai quali,
                con l’impiego di complessi algoritmi matematici, sono generate e
                ricostruite nel modello tridimensionale le immagini delle
                strutture anatomiche presenti nello strato considerato.
                Costantemente aggiornata, garantisce un’elevata risoluzione di
                contrasto, acquisizioni volumetriche in tempi brevissimi e di
                ridurre notevolmente l’esposizione ai raggi X (circa dell’80%)
                grazie alla recente implementazione del potente software i-Dose.
                È dotata del software di ricostruzione iterativa (Tecnologia
                Philips IMR) che consente di rielaborare velocemente immagini di
                elevata qualità, assicurando una visualizzazione avanzata di
                piccoli dettagli anche nelle applicazioni più complesse.
              </p>
              <p className="text_esami my-2">
                Trova ampio utilizzo nello studio di patologie neoplastiche,
                neurologiche, cardiovascolari, muscoloscheletriche e
                ortopediche.
              </p>
            </Col>
            <Col sm={12} md={4}>
              <p className="text_esami mt-5">
                Secondo la tipologia di esame da effettuare e/o sulla base del
                quesito clinico l’esame è eseguibile senza e con
                somministrazione di mezzo di contrasto. L’impiego del mezzo di
                contrasto estende i limiti clinici nell’ambito dell’imaging:
              </p>
              <ul className="text_esami">
                <li>
                  {" "}
                  cerebrale, in situazioni di emergenza (emorragie, ischemie
                  cerebrali)
                </li>
                <li>
                  {" "}
                  cardiaco (Cardio-TC, Coronaro-TC e Calcium Index Score
                  coronarico)
                </li>
                <li> vascolare (Angio-TC dei vasi sanguigni)</li>
                <li> polmonare (Studio HRCT)</li>
                <li> addominale (Entero-TC, Uro-TC e Colonscopia virtuale)</li>
                <li> Whole Body (Tc Total Body)</li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="text-center my-4">
              <Button variant="light" onClick={() => navigate("/tomografia")}>
                Per saperne di più
              </Button>
            </Col>
          </Row>
        </Tab>
        <Tab
          eventKey="Rm"
          title={
            <div className="d-flex flex-column align-items-center">
              <div className="tab-image-container">
                <img
                  src={risonanza}
                  alt="risonanza"
                  className="tab-image img-fluid"
                  
                />
              </div>
              <span className=".text-title-esami">RISONANZA</span>
            </div>
          }
          className="tab_esami"
        >
          <Row className="p-5">
            <Col sm={12} md={8}>
              <h4 className="h4_esami mt-2 mb-3 ms-2">Risonanza Magnetica</h4>
              <p className="text_esami my-2">
                La RM è una tecnica di imaging multiparametrica non invasiva che
                fornisce immagini di sezioni multiplanari del corpo umano
                sfruttando le proprietà dei campi magnetici e degli impulsi di
                radiofrequenze. I progressi tecnologici degli ultimi anni
                consentono l’acquisizione di immagini morfologiche ad alta
                risoluzione e di informazioni di tipo metabolico funzionale,
                fondamentali per la diagnosi finale. La nostra struttura dispone
                di due potenti apparecchiature di risonanza magnetica Philips
                Achieva D-Stream 1,5 T ad alto campo. Il software, costantemente
                aggiornato, consente ulteriori elaborazioni in post-processing,
                di ricostruzione e valutazione multiplanare 3D, con possibilità
                di stampa su pellicola dell’iconografia selezionata e
                archiviazione su disco. La risonanza magnetica è utilizzata per
                lo studio di diversi organi e per la formulazione di diagnosi di
                molteplici patologie. Secondo la tipologia di esame da
                effettuare e/o sulla base del quesito clinico l’esame è
                eseguibile senza e con somministrazione di mezzo di contrasto.
              </p>
              <p className="text_esami my-2">
                I pazienti claustrofobici, eventualmente, possono eseguire gli
                esami in sedazione previo colloquio con il medico Anestesista.
              </p>
            </Col>
            <Col sm={12} md={4}>
              <p className="text_esami mt-5">
                Inoltre, tecniche avanzate consentono valutazioni di tipo
                funzionale oltre che morfologiche in ambito:
              </p>
              <ul className="text_esami">
                <li>
                  neurologico (Diffusione, Perfusione, Spettroscopia,
                  Trattografia)
                </li>
                <li> cardiologico (Cardio-RM)</li>
                <li>
                  vascolare (Angio-RM dei vasi sanguigni, arteriosi e venosi)
                </li>
                <li>mammario (RM della mammella)</li>
                <li>addominale (Colangio-RM, Uro-RM)</li>
                <li> peritoneale e retroperitoneale</li>
                <li>gastroenterologico (Entero-RM)</li>
                <li>pelvico (RM della prostata, RM dell’utero, Defeco-RM)</li>
                <li> osteo-articolare</li>
                <li> muscolo-scheletrico</li>
                <li> Total Body (RM Diffusion Whole Body)</li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="text-center my-4">
              <Button
                variant="light"
                onClick={() => navigate("/risonanza")}
              >
                Per saperne di più
              </Button>
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
}
