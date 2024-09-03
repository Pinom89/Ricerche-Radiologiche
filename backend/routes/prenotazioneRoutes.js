import express from "express"; // Importa il pacchetto Express
import { Prenotazione } from '../models/Cliente.js';// Importa il modello Prenotazione
import cloudinaryUploader from "../config/claudinaryConfig.js";
import { v2 as cloudinary } from "cloudinary";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { transporter } from "../config/mailer.js"; // richiamo transponder.
import mongoose from "mongoose";
import formatDate from "../services/formatdate.js";

const router = express.Router(); // Crea un router Express


//Protegge le altre rotte con il middleware di autenticazione
router.use(authMiddleware);

// Funzione per convertire la data in UTC
const convertToUTCDate = (dateString) => {
  const [day, month, year] = dateString.split("/");
  return new Date(Date.UTC(year, month - 1, day));
};



router.get('/', async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Accesso non autorizzato' });
  }

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const sort = req.query.sort || "data";
    const sortDirection = req.query.sortDirection === "desc" ? -1 : 1;
    const skip = (page - 1) * limit;

    // Costruisci l'oggetto di query
    let query = {};

    // Gestisci la ricerca per data
    if (req.query.data) {
      const searchDate = convertToUTCDate(req.query.data);
      const nextDay = new Date(searchDate);
      nextDay.setUTCDate(nextDay.getUTCDate() + 1);

      query.data = {
        $gte: searchDate,
        $lt: nextDay
      };
    }

    // Aggiungi altri campi di ricerca se necessario
    ['nome', 'cognome', 'codiceFiscale', 'esame', 'numRicetta', 'codEsenzione', 'email', 'stato'].forEach(field => {
      if (req.query[field]) {
        query[field] = new RegExp(req.query[field], 'i');
      }
    });

    const prenotazioni = await Prenotazione.find(query)
      .sort({ [sort]: sortDirection })
      .skip(skip)
      .limit(limit);

    const total = await Prenotazione.countDocuments(query);

    res.json({
      prenotazioni: prenotazioni.map(p => ({
        ...p.toObject(),
        data: formatDate(p.data, 'it') // Formatta la data per il frontend
      })),
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPrenotazioni: total,
    });
  } catch (error) {
    console.error('Errore nel recupero delle prenotazioni:', error);
    res.status(500).json({ message: 'Errore nel recupero delle prenotazioni' });
  }
});


// Rotta per ottenere un singola prenotazione
router.get("/:id", async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Accesso non autorizzato' });
  }

  try {
    const prenotazione = await Prenotazione.findById(req.params.id); // Trova un utente per ID
    if (!prenotazione) {
      return res.status(404).json({ message: "Esame prenotato non esistente" }); // Se l'utente non esiste, risponde con un errore 404
    }
    res.json(prenotazione); // Risponde con i dati dell'utente in formato JSON
  } catch (err) {
    res.status(500).json({ message: err.message }); // Gestisce errori e risponde con un messaggio di errore
  }
});


// rotta per ottenere totale prenotazioni del paziente
router.get('/:clienteId/mie-prenotazioni', async (req, res) => {
  if (!req.user._id) {
    allert.error('Accesso non autorizzato');
    console.log('Accesso non autorizzato');
    return res.status(403).json({ message: 'Accesso non autorizzato' })
  }
  try {
    const clienteId = req.params.clienteId;

    // Verifica che clienteId sia un ObjectId valido
    if (!mongoose.Types.ObjectId.isValid(clienteId)) {
      return res.status(400).json({ message: 'ID cliente non valido' });
    }

    const prenotazioni = await Prenotazione.find({ cliente: clienteId });

    if (!prenotazioni || prenotazioni.length === 0) {
      return res.status(404).json({ message: 'Nessuna prenotazione trovata per questo cliente' });
    }

    res.json(prenotazioni);
  } catch (error) {
    console.error('Errore nel recupero delle prenotazioni:', error);
    res.status(500).json({ message: 'Errore nel recupero delle prenotazioni' });
  }
});


// Crea una nuova prenotazione
router.post('/', cloudinaryUploader.single("ricetta"), async (req, res) => {
  try {
   

    const prenotazione = new Prenotazione({
      cliente: req.body.cliente,
      data: req.body.data,
      nome: req.body.nome,
      cognome: req.body.cognome,
      codiceFiscale: req.body.codiceFiscale,
      esame: req.body.esame,
      numRicetta: req.body.numRicetta,
      codEsenzione: req.body.codEsenzione,
      email: req.body.email,
      stato: req.body.stato
    });


    if (req.file) {
      prenotazione.ricetta = req.file.path; // Cloudinary restituirà direttamente il suo url
    }
    const newPrenotazione = new Prenotazione(prenotazione);
    await newPrenotazione.save(); // Salva il nuovo utente nel database

    await transporter.sendMail({
      from: '"Centro Radiologico" <noreply@ricercheradiologiche.com>',
      to: newPrenotazione.email,
      subject: 'La tua prenotazione è stata registrata!', // Subject line
      html: `
        <p>Gentile ${newPrenotazione.nome + " " + newPrenotazione.cognome},</p>
           <p>La tua prenotazione è stata creata con successo</p>
            <p>verrà confermata da un nostro operatore.</p>
            <p>Entro 48h riceverai una notifica</p>
             <br>
           <br>
            <p>Per supporto contattare la seguente email: supporto@ricercheradiologiche.com</p>
          `, // html body
    });
    res.status(201).json(newPrenotazione); // Risponde con i dati del nuova prenotazione e uno status 201 (Created)
  } catch (err) {
    console.error("Errore durante la creazione dell'utente", err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });  // Gestisce errori di validazione e risponde con un messaggio di errore
    }

  }
});


// Rotta per aggiornare un prenotazione

// Solo Admin può modificare prenotazione


router.patch("/:id", cloudinaryUploader.single("ricetta"), async (req, res) => {
  if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Accesso non autorizzato' });
    }

  try {

    // Prepara l'oggetto con i dati da aggiornare
    const updateData = { ...req.body };

    // Se c'è un nuovo file caricato, aggiorna il campo ricetta
    if (req.file) {
      updateData.ricetta = req.file.path;
    }

    // Converti la data se presente
    if (updateData.data) {
      const dataParts = updateData.data.split('/');
      updateData.data = new Date(`${dataParts[2]}-${dataParts[1]}-${dataParts[0]}`);
    }

    const updatedPrenotazione = await Prenotazione.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true, // Restituisce il documento aggiornato anziché quello vecchio
        runValidators: true // Esegue i validatori dello schema
      }
    );
    if (!updatedPrenotazione) {
      return res.status(404).json({ message: 'Prenotazione non trovata' });
    }

    let emailSubject, emailBody;

    switch (updatedPrenotazione.stato) {
      case "Confermato":
        emailSubject = 'La tua prenotazione è stata confermata!';
        emailBody = `
            <p>Gentile ${updatedPrenotazione.nome} ${updatedPrenotazione.cognome},</p>
            <p>La tua prenotazione è stata confermata <p>
            in data ${formatDate(updatedPrenotazione.data, "it")}</p>
          `;
        break;
      case "Annullato":
        emailSubject = 'La tua prenotazione è stata annullata!';
        emailBody = `
            <p>Gentile ${updatedPrenotazione.nome} ${updatedPrenotazione.cognome},</p>
            <p>La tua prenotazione del ${formatDate(updatedPrenotazione.data, "it")} è stata annullata</p>
            <p>Per info contatti il nostro centro</p>
          `;
        break;
      case "Modificato":
        emailSubject = 'La tua prenotazione è stata modificata!';
        emailBody = `
            <p>Gentile ${updatedPrenotazione.nome} ${updatedPrenotazione.cognome},</p>
            <p>La tua prenotazione è stata modificata. La data di prenotazione è stata spostata al  ${formatDate(updatedPrenotazione.data, "it")}.</p>
            <p>Per info contatti il nostro centro</p>
          `;
        break;
    }

    if (emailSubject && emailBody) {
      try {
        await transporter.sendMail({
          from: '"Centro Radiologico" <noreply@ricercheradiologiche.com>',
          to: updatedPrenotazione.email,
          subject: emailSubject,
          html: `
              ${emailBody}
              <br><br>
              <p>Per supporto contattare la seguente email: supporto@ricercheradiologiche.com</p>
            `,
        });
      } catch (emailError) {
        console.error('Errore nell\'invio dell\'email:', emailError);
        // Non blocchiamo la risposta se l'invio dell'email fallisce
      }
    }



    res.json(updatedPrenotazione); // Risponde con i dati dell'utente aggiornato in formato JSON
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






// Rotta per eliminare un utente
router.delete("/:id", async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Accesso non autorizzato' });
  }
  try {
    // Trova la Prenotazione dal database
    const prenotazione = await Prenotazione.findById(req.params.id);
    if (!prenotazione) {
      // Se la Prenotazione non viene trovata, invia una risposta 404
      return res.status(404).json({ message: "Prenotazione non trovata" });
    }

    // Se la prenotazione ha una ricetta, elimina l'immagine da Cloudinary
    if (prenotazione.ricetta) {
      // Estrai l'public_id da Cloudinary dall'URL della ricetta
      const publicId = `ricette/${prenotazione.ricetta.split('/').pop().split('.')[0]}`;
      console.log("Extracted publicId:", publicId);

      // Elimina l'immagine da Cloudinary
      try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log("Cloudinary deletion result:", result);
      } catch (cloudinaryError) {
        console.error("Cloudinary deletion error:", cloudinaryError);
        // Nota: continuiamo con l'eliminazione della prenotazione anche se l'eliminazione dell'immagine fallisce
      }
    }

    // Elimina la prenotazione dal database
    await Prenotazione.findByIdAndDelete(req.params.id);

    // Invia un messaggio di conferma come risposta JSON
    res.json({ message: "Prenotazione e ricetta associate eliminate" });
  } catch (err) {
    // In caso di errore, invia una risposta di errore
    res.status(500).json({ message: err.message });
  }
});

// Rotta per aggiornare un la ricetta di un utente/autore
router.patch("/:id/ricetta", cloudinaryUploader.single("ricetta"), async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Accesso non autorizzato' });
  }
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Nessun file caricato" });
    }

    const prenotazione = await Prenotazione.findById(req.params.id);
    if (!prenotazione) {
      return res.status(404).json({ message: "Prenotazione non trovata" });
    }

    prenotazione.ricetta = req.file.path;
    await Prenotazione.save();

    await transporter.sendMail({
      from: '"Centro Radiologico" <noreply@ricercheradiologiche.com>',
      to: prenotazione.email,
      subject: 'La tua ricetta è stata modificata!', // Subject line
      html: `
        <p>Gentile ${prenotazione.nome + " " + prenotazione.cognome},</p>
           <p>La tua ricetta è stata modificata con successo</p
           <br>
            <p>Per supporto contattare la seguente email: supporto@ricercheradiologiche.com</p>
          `, // html body
    });
    res.status(200).json({ message: "Avatar aggiornato con successo", cliente });
  } catch (err) {
    console.error("Errore durante l'aggiornamento", err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: "Errore interno del server" });
  }
});


export default router;