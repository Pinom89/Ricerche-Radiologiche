import React from "react";
import "./radiologiaDigitale.css";
import { Container, Row, Col } from "react-bootstrap";

export default function RadiologiaDigitale() {
  return (
    <>
      <Container fluid className="prenotazione-esame mb-4 p-0">
        <Row>
          <Col>
            <h2 className=" text-center title_principale_radiologia pt-4 pb-4">
              Radiologia digitale
            </h2>
          </Col>
        </Row>
      </Container>
      <Container className="mb-4">
        <Row className="ms-3">
          <Col sm={12}>
            <h3 className="text-center h3_radiologia me-5">Radiologia digitale</h3>
            <h4 className="h4_radiologia ps-4 text-start title_radiologia mb-3">
              Che cos’è?
            </h4>
            <p className="text_radiologia">
              L’esame radiologico è l’indagine di primo livello della
              Diagnostica per Immagini. Negli ultimi anni la radiologia digitale
              sta sostituendo integralmente la radiologia tradizionale, poiché
              l’acquisizione dati in formato digitale consente di visualizzare
              direttamente l’immagine radiografica su un monitor di un computer.
            </p>
            <h4 className="h4_radiologia ps-4 text-start title_radiologia mb-3">
              Perchè si fa?
            </h4>
            <p className="text_radiologia">
              Si eseguono tutti gli esami di Radiologia tradizionale, al fine di
              offrire informazioni imprescindibili nel sospetto diagnostico
              delle patologie respiratorie, osteoarticolari, dell’addome e
              dell’apparato urogenitale.
            </p>
            <p className="text_radiologia">
              L’approfondimento diagnostico con somministrazione di mezzo di
              contrasto è previsto per lo studio del tubo digerente completo,
              del transito intestinale (tenue minutato), per il clisma opaco a
              doppio contrasto, per valutazione post-chirurgica bariatrica, per
              l’urografia e per la cistouretrografia retrograda e minzionale.
            </p>
            <p className="text_radiologia">
              È possibile, altresì, eseguire valutazioni morfometriche della
              colonna vertebrale completa (in toto) e sotto carico, sia mediante
              lo studio standard che con lo studio dinamico, per la valutazione
              di scoliosi, listesi vertebrale, rettilineizzazione della colonna
              o manifestazioni degenerative del corpo vertebrale. Lo studio
              degli arti inferiori e bacino in toto e sotto carico è indicato
              per la valutazione di asimmetrie e dismetrie del bacino,
              valutazione pre e post operatorie di posizionamento di protesi di
              anca e di valgismo o varismo delle ginocchia. Questi esami sono
              forniti su unico radiogramma in scala millimetrata,
              particolarmente apprezzati dagli specialisti ortopedici, pediatri
              e fisiatri.
            </p>
            <p className="text_radiologia">
              Eseguiamo lo studio dell’età ossea per ottenere informazioni sul
              grado di sviluppo scheletrico del bambino. Dall’osservazione di
              eventuali modificazioni dei segmenti ossei della mano e del polso
              sinistro (per convenzione dettata dall’OMS) è possibile ricavare
              un’esatta valutazione dello stato di crescita, secondo tabelle di
              studio del metodo TW2 o metodo Fels.
            </p>
            <h4 className="h4_impegni ps-4 text-start title_radiologia mb-3">
              Informazioni utili
            </h4>
            <p className="text_radiologia">
              Gli esami contrastografici richiedono una preparazione specifica.
              Al momento della prenotazione saranno fornite tutte le
              informazioni su eventuali istruzioni da seguire.
            </p>
            <p className="text_radiologia">
              Il software di rielaborazione AGFA Healtcare implementato,
              garantisce risultati in alta definizione con possibilità di stampa
              su pellicola e/o su carta certificata dell’iconografia selezionata
              e archiviazione su disco.
            </p>
            <p className="text_radiologia">
              Utile, e di fondamentale importanza, il confronto con eventuali
              esiti di indagini radiologiche precedenti, che consigliamo di
              consegnare al momento dell’esame al personale di reparto.
            </p>
            <h4 className="h4_radiologia ps-4 text-start title_radiologia mb-3">
              Controindicazioni
            </h4>
            <p className="text_radiologia">
              L’esame radiografico è controindicato in gravidanza ed è pertanto
              fondamentale informare il personale sanitario del Centro di
              accertata o presunta gravidanza in atto, prima di sottoporsi a
              esami radiologici.
            </p>
            <h3 className="text-center h3_radiologia me-5">Densitometria ossea</h3>
            <h4 className="h4_radiologia ps-4 text-start title_radiologia mb-3">
              Che cos’è?
            </h4>
            <p className="text_radiologia">
              La Densitometria Ossea, nota come DEXA (Dual-Energy X-ray
              Absorptiometry) o MOC (Mineralometria Ossea Computerizzata),
              consente di rilevare e quantificare strumentalmente la densità
              minerale ossea secondo la classificazione proposta
              dall’Organizzazione Mondiale della Sanità (OMS).
            </p>
            <h4 className="h4_radiologia ps-4 text-start title_radiologia mb-3">
              Perchè si fa?
            </h4>
            <p className="text_radiologia">
              La possibilità di rilevare e quantificare accuratamente le
              differenze assolute nella mineralizzazione ossea riveste un ruolo
              fondamentale nella diagnosi e cura delle malattie metaboliche
              dell’osso, in particolare dell’Osteoporosi e il monitoraggio della
              sua evoluzione nel tempo.
            </p>
            <p className="text_radiologia">
              L’indagine di rapida esecuzione, utilizza raggi X a bassissima
              dose permette di studiare i distretti anatomici maggiormente
              predisposti a rischio di frattura, quali le vertebre del tratto
              lombare e la parte prossimale del femore.
            </p>
            <h4 className="h4_radiologia ps-4 text-start title_radiologia mb-3">
              Informazioni utili
            </h4>
            <p className="text_radiologia">
              Per la valutazione clinica globale del paziente, il risultato
              densitometrico deve essere necessariamente integrato con l’analisi
              dei fattori di rischio per osteoporosi e fratture e con eventuali
              indagini di laboratorio e/o strumentali relative alla struttura
              scheletrica:
            </p>
            <ul className="text_radiologia">
              <li>
                Menopausa con anamnesi familiare di frattura osteoporotica in
                età inferiore ai 75 anni
              </li>
              <li>Menopausa precoce o chirurgica</li>
              <li>Malattie reumatiche</li>
              <li>Pregresse fratture</li>
              <li>
                Uso di farmaci (cortico-steroidi, inibitori aromatasi, ecc.)
              </li>
              <li>Abuso di alcool</li>
            </ul>
            <p className="text_radiologia">
              Effettuare un esame di Densitometria Ossea non necessita di alcuna
              preparazione specifica.
            </p>
            <p className="text_radiologia">
              Una volta completato l’esame, il paziente non è soggetto a regimi
              o prescrizioni particolari e può riprendere serenamente la sua
              normale attività quotidiana.
            </p>
            <h4 className="h4_impegni ps-4 text-start title_radiologia mb-3">
              Controindicazioni
            </h4>
            <p className="text_radiologia">
              Per le pazienti in età fertile, l’esame va eseguito solo previa
              esclusione di uno stato di gravidanza. È fondamentale informare il
              personale sanitario del Centro di accertata o presunta gravidanza
              in atto, prima di sottoporsi a esami che prevedono l’utilizzo di
              radiazioni ionizzanti.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
