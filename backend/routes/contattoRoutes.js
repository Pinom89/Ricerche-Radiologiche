import express from "express"; // Importa il pacchetto Express
import { Contatto } from "../models/Contatto.js"; // Importa il modello User
import { authMiddleware } from "../middleware/authMiddleware.js";
import { transporter } from "../config/mailer.js"; // richiamo transponder.
import formatDate from "../services/formatdate.js";



const router = express.Router(); // Crea un router Express


// Funzione per convertire la data in UTC
     const convertToUTCDate = (dateString) => {
     const [day, month, year] = dateString.split("/");
    return new Date(Date.UTC(year, month - 1, day));
 };


// Rotta per creare un nuovo messaggio
router.post('/', async (req, res) => {
  // console.log("Ricevuta richiesta POST:", req.body);
  try {
      const { nome, cognome, email, telefono,messaggio} = req.body;

      const nuovoMessaggio = new Contatto({
          nome,
          cognome,
          email,
          telefono,
          messaggio,
          risposta: '',
          stato: 'Nuovo', // Imposto uno stato predefinito
      });

      const messaggioSalvato = await nuovoMessaggio.save();

      await transporter.sendMail({
          from: '"Centro Radiologico" <noreply@ricercheradiologiche.com>',
          to: messaggioSalvato.email,
          subject: 'Copia messaggio Ricerche radiologiche', // Subject line
          html: `
            <p>Gentile ${messaggioSalvato.nome + " " + messaggioSalvato.cognome},</p>
               <p>Il tuo messaggio è stato inviato con successo</p>
                <br>
                <p>Il contenuto del tuo messaggio è: ${messaggioSalvato.messaggio}<p>
                <br>
                <p>Entro 72h lavorative riceverai una risposta.</p>
                 <br>
                 <br>
                 <p>Se hai bisogno di aiuto contattare la seguente email: supporto@ricercheradiologiche.com</p>
                
              `, // html body
      });

    
     res.status(201).json(messaggioSalvato);
  } catch (error) {
      console.error('Errore durante la creazione del messaggio:', error);
      res.status(500).json({ messaggio: 'Errore durante la creazione del messaggio' });
  }
});


//Protegge le altre rotte con il middleware di autenticazione
 router.use(authMiddleware);

router.get('/', async (req, res) => {
     if (!req.user.isAdmin) {
     return res.status(403).json({ message: 'Accesso non autorizzato' });
    }

    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 40;
        const sort = req.query.sort || "createdAt";
        const sortDirection = req.query.sortDirection === "desc" ? -1 : 1;
        const skip = (page - 1) * limit;

        // Costruisci l'oggetto di query
        let query = {};

        // Gestisco la ricerca per data di creazione
         if (req.query.createdAt) {
            const searchDate = convertToUTCDate(req.query.createdAt);
            const nextDay = new Date(searchDate);
             nextDay.setUTCDate(nextDay.getUTCDate() + 1);


    
             query.createdAt = {
                 $gte: searchDate,
                 $lt: nextDay
             };
        }
        // Aggiungi campi di ricerca
        ['nome', 'cognome', 'email', 'messaggio', 'risposta', 'stato'].forEach(field => {
          if (req.query[field]) {
              query[field] = new RegExp(req.query[field], 'i');
          }
      });

        const messaggi = await Contatto.find(query)
            .sort({ [sort]: sortDirection })
            .skip(skip)
            .limit(limit);

        const total = await Contatto.countDocuments(query);
        res.json({
            messaggi: messaggi.map(msg => ({
              ...msg.toObject(),
              createdAt: formatDate(msg.createdAt, 'it'),
              updatedAt: formatDate(msg.updatedAt, 'it')
            })),
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalContatti: total,
        });
    } catch (error) {
        console.error('Errore nel recupero dei messaggi:', error);
        res.status(500).json({ message: 'Errore nel recupero dei messaggi' });
    }
});

// Rotta per ottenere un singola prenotazione
router.get("/:id", async (req, res) => {
     if (!req.user.isAdmin) {
       return res.status(403).json({ message: 'Accesso non autorizzato' });
    }

    try {
        const messaggio = await Contatto.findById(req.params.id); // Trova un utente per ID
        if (!messaggio) {
            return res.status(404).json({ message: "Esame prenotato non esistente" }); // Se l'utente non esiste, risponde con un errore 404
        }
        res.json(messaggio); // Risponde con il messaggio dell'utente in formato JSON
    } catch (err) {
        res.status(500).json({ message: err.message }); // Gestisce errori e risponde con un messaggio di errore
    }
});




router.patch("/:id",  async (req, res) => {
     if (!req.user.isAdmin) {
         return res.status(403).json({ message: 'Accesso non autorizzato' });
       }
  
    try {
  
      // Prepara l'oggetto con i dati da aggiornare
      const updateData = { ...req.body };

      const updatedMessaggio = await Contatto.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true, // Restituisce il documento aggiornato anziché quello vecchio
          runValidators: true // Esegue i validatori dello schema
        }
      );
      if (!updatedMessaggio) {
        return res.status(404).json({ message: 'Messaggio non trovato' });
      }
  
      let emailSubject, emailBody;
  
        if (updatedMessaggio.stato === 'Risposta inviata') {
            
          emailSubject = 'Risposta da Ricerche  Radiologiche';
          emailBody = `
              <p>Gentile ${updatedMessaggio.nome} ${updatedMessaggio.cognome},</p>
              <p>A seguito del suo messaggio: ${updatedMessaggio.messaggio}</p>
              <br>  
              <p> La risposta è la seguente: ${updatedMessaggio.risposta}</p>
                <p>Per ulteriori info contatti il nostro centro al 080 XXX XXX</p>
              `;
          
      }
  
      if (emailSubject && emailBody) {
        try {
          await transporter.sendMail({
            from: '"Centro Radiologico" <noreply@ricercheradiologiche.com>',
            to: updatedMessaggio.email,
            subject: emailSubject,
            html: `
                ${emailBody}
                <br><br>
                <p>Per supporto contatti la seguente email: supporto@ricercheradiologiche.com</p>
              `,
          });
        } catch (emailError) {
          console.error('Errore nell\'invio dell\'email:', emailError);
          // Non blocchiamo la risposta se l'invio dell'email fallisce
        }
      }


      res.json(updatedMessaggio); // Risponde con i dati dell'utente aggiornato in formato JSON
    } catch (err) {
      if (err.name === 'ValidationError') {
        // Errore di validazione Mongoose
        const errors = Object.values(err.errors).map(error => error.message);
        return res.status(400).json({ message: "Errore di validazione", errors });
      } else if (err.code === 11000) {
        // Errore di duplicazione (es. email già esistente)
        return res.status(409).json({ message: "Email già in uso" });
      } else if (err.name === 'CastError') {
        // Errore di casting (es. ID non valido)
        return res.status(400).json({ message: "ID non valido" });
      } else {
        // Altri errori del server
        console.error(err); // Log dell'errore per debugging
        res.status(500).json({ message: "Errore interno del server" });
      }
    }
  });
  
  

// Rotta per eliminare un messaggio
router.delete("/:id", async (req, res) => {
     if (!req.user.isAdmin) {
         return res.status(403).json({ message: 'Accesso non autorizzato' });
       }
    try {
      // Trova e elimina il Contatto dal database
      const messaggio = await Contatto.findByIdAndDelete(req.params.id);
  
      if (!messaggio) {
        // Se il Contatto non viene trovato, invia una risposta 404
        return res.status(404).json({ message: "Messaggio non trovato" });
      }
  
      // Invia un messaggio di conferma come risposta JSON
      res.json({ message: "Messaggio Eliminato" });
    } catch (err) {
      // In caso di errore, invia una risposta di errore
      res.status(500).json({ message: err.message });
    }
  });

  export default router