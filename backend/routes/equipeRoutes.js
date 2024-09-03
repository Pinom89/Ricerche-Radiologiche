import Equipe from "../models/Equipe.js";   
import express from "express"; // Importa il pacchetto Express
import cloudinaryUploader from "../config/claudinaryConfig.js";
import { v2 as cloudinary } from "cloudinary";
import { authMiddleware } from "../middleware/authMiddleware.js";


const router = express.Router(); // Crea un router Express
// Creazione Rotte per BlogPosts

// Rotta per ottenere tutti gli Posts
router.get("/", async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Estrae il numero di pagina dalla query, default a 1 se non specificato
      const limit = parseInt(req.query.limit) || 4; // Estrae il limite di risultati per pagina, default a 4
      const sort = req.query.sort || "nome"; // Determina il campo per l'ordinamento, default a "nome"
      const sortDirection = req.query.sortDirection === "desc" ? -1 : 1; // Determina la direzione dell'ordinamento (1 per ascendente, -1 per discendente)
      const skip = (page - 1) * limit; // Calcola quanti documenti saltare per arrivare alla pagina richiesta
  
        // Esegue la query al database con paginazione, ordinamento e limite
      const equipe = await Equipe.find({}) // Trova tutti gli utenti nel database
        .sort({ [sort]: sortDirection }) // Ordina i risultati
        .skip(skip) // Salta i documenti delle pagine precedenti
        .limit(limit); // Limita il numero di risultati
  
       // Conta il numero totale di utenti nel database
       const total = await Equipe.countDocuments();
  
      res.json({
        equipe, // Array degli utenti per la pagina corrente
        currentPage: page, // Numero della pagina corrente
        totalPages: Math.ceil(total / limit), // Calcola il numero totale di pagine
        totalUsers: total, // Numero totale di utenti nel database
      }); // Risponde con i dati degli utenti in formato JSON
    } catch (err) {
      res.status(500).json({ message: err.message }); // Gestisce errori e risponde con un messaggio di errore
    }
  });
  

  // Rotta per ottenere un singolo Post
  router.get("/:id", async (req, res) => {
    try {
      const equipe = await Equipe.findById(req.params.id); // Trova un medico per ID
      if (!equipe) {
        return res.status(404).json({ message: "Medico non trovato" }); // Se l'utente non esiste, risponde con un errore 404
      }
      res.json(equipe); // Risponde con i dati dell'utente in formato JSON
    } catch (err) {
      res.status(500).json({ message: err.message }); // Gestisce errori e risponde con un messaggio di errore
    }
  });



// Proteggi le altre rotte con il middleware di autenticazione
   router.use(authMiddleware);



  
  // Rotta per creare un nuovo Post
  router.post("/", cloudinaryUploader.single("cover"), async (req, res) => {
    // Crea un nuovo utente con i dati dal corpo della richiesta
   
    try {
      const equipe =  req.body;
      if (req.file) {
        equipe.cover = req.file.path; // Cloudinary restituirà direttamente il suo url
      }
      const newEquipe = new Equipe(equipe);
      await newEquipe.save(); // Salva il nuovo utente nel database


      res.status(201).json(newEquipe); // Risponde con i dati del nuovo Medico e uno status 201 (Created)
    } catch (err) {
      res.status(400).json({ message: err.message }); // Gestisce errori di validazione e risponde con un messaggio di errore
    }
  });
  
  // Rotta per aggiornare un Medico
  router.patch("/:id", cloudinaryUploader.single("cover"), async (req, res) => {
    try {
      const equipe = req.body;
  
      // Se c'è un nuovo file caricato, aggiorna il campo cover
      if (req.file) {
        equipe.cover = req.file.path;
      }
  
      const updateEquipe = await Equipe.findByIdAndUpdate(
        req.params.id, 
        equipe,
        {
          new: true, // Restituisce il documento aggiornato anziché quello vecchio
        }
      );
  
      if (!updateEquipe) {
        // Se il medico non viene trovato, invia una risposta 404
        return res.status(404).json({ message: "Dottore non trovato" });
      }
  
      res.json(updateEquipe); // Risponde con i dati dell'equipe aggiornata in formato JSON
    } catch (err) {
      res.status(400).json({ message: err.message }); // Gestisce errori di validazione e risponde con un messaggio di errore
    }
  });
  
  // Rotta per eliminare un Dottore
  

router.delete("/:id", async (req, res) => {
  try {
    // Trova il Dottore dal database
    const equipe = await Equipe.findById(req.params.id);
    if (!equipe) {
      // Se il Dottore non viene trovato, invia una risposta 404
      return res.status(404).json({ message: "Dottore non trovato" });
    }

    // Estrai l'public_id da Cloudinary dall'URL della cover
    const publicId = `equipe_covers/${equipe.cover.split('/').pop().split('.')[0]}`;
    console.log("Extracted publicId:", publicId);
    // Elimina l'immagine da Cloudinary
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      console.log("Cloudinary deletion result:", result);
    } catch (cloudinaryError) {
      console.error("Cloudinary deletion error:", cloudinaryError);
    }

    // Elimina il blog post dal database
    await Equipe.findByIdAndDelete(req.params.id);

    // Invia un messaggio di conferma come risposta JSON
    res.json({ message: "Medico e immagine di copertina eliminati" });
  } catch (err) {
    // In caso di errore, invia una risposta di errore
    res.status(500).json({ message: err.message });
  }
});



  router.patch("/:id/cover", cloudinaryUploader.single("cover"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Nessun file caricato" });
      } 
      const equipe = await Equipe.findById(req.params.id);
      if (!equipe) {
        return res.status(404).json({ message: "Blog non trovato" });
      }
      equipe.cover = req.file.path;
    await Equipe.save();
     
 
   res.status(200).json({ message: "Cover aggiornata con successo", blogpost });
    } catch (err) {
      res.status(400).json({ message: err.message }); // Gestisce errori di validazione e risponde con un messaggio di errore
    }
  });
 




 // creazione rotte '/api/equipes/:id'
  export default router; // Esporta il router per l'utilizzo in altri file