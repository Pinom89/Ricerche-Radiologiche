import React from 'react'
import './dettaglioMessaggio.css'
import InviaRisposta from './inviaRisposta/InviaRisposta'
import CancellaMessaggio from '../cancellaMessaggio/CancellaMessaggio'
// import formatDate from '../../../../services/formatdate'



export default function DettaglioMessaggio({
    messaggio,
    handleMessageUpdate
}) {
  return (
    <>
   
    {/* <td>{formatDate(messaggio.createdAt, 'it')}</td>  */}
    <td>{messaggio.createdAt}</td>
    <td>{messaggio.nome}</td>
    <td>{messaggio.cognome}</td>
    <td className='d-none d-lg-table-cell text-center'>{messaggio.telefono}</td>
    <td className='d-none d-lg-table-cell text-center'>{messaggio.email}</td>
    <td>{messaggio.messaggio}
    </td>
    
    <td>{messaggio.stato}</td>
    <td className='text-center d-flex justify-content-center align-item-center gap-1'>
      <InviaRisposta messaggio={messaggio} handleMessageUpdate={handleMessageUpdate} />
      <CancellaMessaggio id={messaggio._id} handleMessageUpdate={handleMessageUpdate} />
      
    </td>
  </>
  )
}
