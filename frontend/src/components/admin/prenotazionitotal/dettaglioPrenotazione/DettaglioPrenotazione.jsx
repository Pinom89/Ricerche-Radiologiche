import React from "react";
import "./dettaglioPrenotazione.css";
import DettaglioRicetta from "./DettaglioRicetta.jsx";
import ModificaPrenotazione from "./ModificaPrenotazione.jsx";
import EliminaPrenotazione from "../eliminazionePrenotazione/EliminazionePrenotazione.jsx";

export default function DettaglioPrenotazione({
  prenotazione,
  handlePrenotazioneUpdate
}) {


  

  return (
    <>
      <tr style={{ fontSize: 13}}>
        <td className="d-none d-lg-table-cell" >{prenotazione._id}</td>
        {/* <td>{formatDate(prenotazione.data, 'it')}</td> */}
        <td className="text-center">{prenotazione.data}</td>
        <td className="text-center">{prenotazione.nome}</td>
        <td className="text-center">{prenotazione.cognome}</td>
        <td className="text-center">
          {prenotazione.codiceFiscale.toUpperCase()}
        </td>
        <td className="text-center">{prenotazione.esame}</td>
        <td className="text-center">{prenotazione.numRicetta}</td>
        <td className="text-center">
          {prenotazione.codEsenzione
            ? prenotazione.codEsenzione
            : "nessuna esenzione"}
        </td>
        <td className="text-center d-none d-lg-table-cell">{prenotazione.email}</td>
        <td className="text-center">{prenotazione.stato}</td>
        <td className="d-flex flex-column justify-content-center align-items-center gap-1">
          <div className="d-flex justify-content-center align-items-center gap-1">
            <DettaglioRicetta fotoRicetta={prenotazione.ricetta} />

            <ModificaPrenotazione
              handlePrenotazioneUpdate={handlePrenotazioneUpdate}
              prenotazione={prenotazione}
            />
          </div>
          <EliminaPrenotazione handlePrenotazioneUpdate={handlePrenotazioneUpdate} id={prenotazione._id}/>
        </td>
        </tr>
    </>
  );
}
