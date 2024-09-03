import React from 'react'
import { Form }  from "react-bootstrap";

export default function Search({search, handleInputChange}) {

   
  return (
  
    <Form.Control
      type="text"
      value={ search } // inserisco il valore della variabile search
      onChange={ handleInputChange} // avvio funzione handleInputChange
      placeholder="Cerca un medico"
      className="mb-5 text-center"
    />
  
)
}
