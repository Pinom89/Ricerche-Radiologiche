

import express from "express"; // Importa il pacchetto Express
import { Cliente } from "../models/Cliente.js"; // Importa il modello Cliente
import cloudinaryUploader from "../config/claudinaryConfig.js";
import { v2 as cloudinary } from "cloudinary";
import { transporter } from "../config/mailer.js"; // richiamo transponder.
import { authMiddleware } from "../middleware/authMiddleware.js";


const router = express.Router(); // Crea un router Express


// Rotta per creare un nuovo utente
router.post("/", cloudinaryUploader.single("avatar"), async (req, res) => {
  try {
    const cliente =  req.body;
    if (req.file) {
        cliente.avatar = req.file.path; // Cloudinary restituirà direttamente il suo url
    }
    const newCliente = new Cliente(cliente);
    await newCliente.save(); // Salva il nuovo utente nel database
    // Salva nuova prenotazione
   
    // Rimuovi la password dalla risposta per sicurezza
    const clienteResponse = newCliente.toObject();
    delete clienteResponse.password;

     transporter.sendMail({
      from: '"Centro Radiologico" <noreply@ricercheradiologiche.com>',
      to: newCliente.email, 
      subject: 'Il tuo account è stato creato!', // Subject line
      html: `
        <p>Gentile ${cliente.nome + " " + cliente.cognome},</p>
        <p>Il tuo account è stato creato con successo</p>
        <br>
        <br>
        <p>Per supporto contattare il seguente email: supporto@ricercheradiologiche.com</p>
        `, // html body
    });
    res.status(201).json(clienteResponse); // Risponde con i dati del nuovo utente e uno status 201 (Created)
  } catch (err) {
    console.error("Errore durante la creazione dell'utente", err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });  // Gestisce errori di validazione e risponde con un messaggio di errore
    }
  }
});

// Proteggi le altre rotte con il middleware di autenticazione
  router.use(authMiddleware);

  // Rotta per ottenere tutti gli utenti
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Estrae il numero di pagina dalla query, default a 1 se non specificato
    const limit = parseInt(req.query.limit) || 6; // Estrae il limite di risultati per pagina, default a 10
    const sort = req.query.sort || "nome"; // Determina il campo per l'ordinamento, default a "name"
    const sortDirection = req.query.sortDirection === "desc" ? -1 : 1; // Determina la direzione dell'ordinamento (1 per ascendente, -1 per discendente)
    const skip = (page - 1) * limit; // Calcola quanti documenti saltare per arrivare alla pagina richiesta


    const cliente = await Cliente.find({}) // Trova tutti gli utenti nel database
      .skip(skip).sort({ [sort]: sortDirection }) // Ordina i risultati
      .skip(skip) // Salta i documenti delle pagine precedenti
      .limit(limit); // Limita il numero di risultati
    
    // Conta il numero totale di utenti nel database
    const total = await Cliente.countDocuments();

    res.json({
      cliente,
      currentPage: page, // Numero della pagina corrente
      totalPages: Math.ceil(total / limit), // Calcola il numero totale di pagine
      totalClienti: total, // Numero totale di utenti nel database
    }); // Risponde con i dati degli utenti in formato JSON
  } catch (err) {
    res.status(500).json({ message: err.message }); // Gestisce errori e risponde con un messaggio di errore
  }
});

// Rotta per ottenere un singolo utente
router.get("/:id", async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id); // Trova un utente per ID
    if (!cliente) {
      return res.status(404).json({ message: "utente non trovato" }); // Se l'utente non esiste, risponde con un errore 404
    }
    res.json(cliente); // Risponde con i dati dell'utente in formato JSON
  } catch (err) {
    res.status(500).json({ message: err.message }); // Gestisce errori e risponde con un messaggio di errore
  }
});


// Rotta per aggiornare un utente
router.patch("/:id",  cloudinaryUploader.single("avatar"), async (req, res) => {
  try {
    const cliente = req.body;
      // Se c'è un nuovo file caricato, aggiorna il campo cover
      if (req.file) {
        cliente.avatar = req.file.path;
      }
  
    const updatedCliente = await Cliente.findByIdAndUpdate(
      req.params.id,
      cliente,
     { 
      new: true, // Restituisce il documento aggiornato anziché quello vecchio
    }
     )
     if (!updatedCliente) {
      return res.status(404).json({ message: "Cliente non trovato" });
    }
    if (updatedCliente) {
      transporter.sendMail({
      from: '"Centro Radiologico" <noreply@ricercheradiologiche.com>',
      to: updatedCliente.email, 
      subject: 'Il tuo account è stato modificato!', // Subject line
      html: `
        <p>Gentile ${updatedCliente.nome + " " + updatedCliente.cognome},</p>
        <p>Il tuo account è stato modificato con successo</p>
        <br>
        <br>
        <p>Per supporto contattare il seguente email: supporto@ricercheradiologiche.com</p>
            `, // html body
    });
  }
    res.json(updatedCliente); // Risponde con i dati dell'utente aggiornato in formato JSON
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
  try {
    // Trova il Cliente dal database
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      // Se il Cliente non viene trovato, invia una risposta 404
      return res.status(404).json({ message: "Cliente non trovato" });
    }

    // Se il cliente ha un avatar, elimina l'immagine da Cloudinary
    if (cliente.avatar) {
      // Estrai l'public_id da Cloudinary dall'URL dell'avatar
      const publicId = `avatar/${cliente.avatar.split('/').pop().split('.')[0]}`;
      console.log("Extracted publicId:", publicId);
      
      // Elimina l'immagine da Cloudinary
      try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log("Cloudinary deletion result:", result);
      } catch (cloudinaryError) {
        console.error("Cloudinary deletion error:", cloudinaryError);
        // Nota: continuiamo con l'eliminazione del cliente anche se l'eliminazione dell'immagine fallisce
      }
    }

    // Elimina il cliente dal database
    await Cliente.findByIdAndDelete(req.params.id);

    // Invia un messaggio di conferma come risposta JSON
    res.json({ message: "Account Cliente e avatar eliminati" });
  } catch (err) {
    // In caso di errore, invia una risposta di errore
    res.status(500).json({ message: err.message });
  }
});

/////////////////////


// Rotta per aggiornare un l'avatar di un utente/autore
router.patch("/:id/avatar", cloudinaryUploader.single("avatar"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Nessun file caricato" });
    }

    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente non trovato" });
    }

    cliente.avatar = req.file.path;
    await Cliente.save();

     transporter.sendMail({
      from: '"Centro Radiologico" <noreply@ricercheradiologiche.com>',
      to: cliente.email, 
      subject: 'Il tuo avatar è stato aggiornato!', // Subject line
      html: `
        <p>Ciao ${cliente.nome + " " + cliente.cognome},</p>
      <p>Il tuo avatar è stato aggiornato con successo</p>
      <br>
      <br>
      <p>Per supporto contattare il seguente email: supporto@ricercheradiologiche.com</p>
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


export default router; // Esporta il router per l'utilizzo in altri file