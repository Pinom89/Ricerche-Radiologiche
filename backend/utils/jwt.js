// Importa la libreria jsonwebtoken per gestire i JSON Web Tokens
import jwt from "jsonwebtoken";

// Funzione per generare un token JWT
export const generateJWT = (payload) => {
    //Utilizza il metodo sign di jwt per creare nuovo token
    return new Promise((resolve, reject) =>    
    jwt.sign(
        payload,//Il payload contiene i dati che vogliamo includere nel token (es. ID utente)
        process.env.JWT_SECRET, //La chiave segreta per criptare il token, memorizzata nelle variabili d'ambiente
        { expiresIn: "1 day" }, //Opzioni: imposta la scadenza del token a 1 giorno
        (err, token) => {
            if (err) reject(err); // Se c'è errore, rifiuta promise
             else  resolve(token);    // Altrimenti, risolvi promise con il token generato
        }
    )
 );
}

//  forse mancano le graffe alla promise => verificare

// Funzione per verificare un toker JWT  
export const verifJWT = (token) => {
    // Restituisce una promiese per gestire l'operazione in modo asincrono
    return new Promise ((resolve, reject) => 
    // Utilizzare il metodo verify di jwt per decodificare e verificare il token
      jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
          //Callback che gestisce il risultato dell'operazione
          if (err) reject(err);
          // Se c'è un errore (es. token non valido), rifiuta promise
          else resolve(payload);
          //Altrimenti, risolve la Promise con il Payload
      })
    )
}
 
