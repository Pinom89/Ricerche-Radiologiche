import express from "express"; // Importa il pacchetto Express
import { Cliente } from "../models/Cliente.js"; // Importa il modello User
import { generateJWT } from "../utils/jwt.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import passport from "../config/passportConfig.js";
import { transporter } from "../config/mailer.js"; // richiamo transponder.
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";




const router = express.Router(); // Crea un router Express

dotenv.config();

// Definisci l'URL del frontend usando una variabile d'ambiente
const FRONTEND_URL = process.env.FRONTEND_URL || "https://ricerche-radiologiche.vercel.app";



// Rotta per autenticare un utente tramite Login
router.post("/login", async (req, res) => {
    try {
        // Cerca l'autore nel database usando l'email
        const { email, password } = req.body;
        // Cerca l'autore nel data base usando l'email
        const cliente = await Cliente.findOne({ email });
        if (!cliente) {
            return res.status(401).json("Cliente non trovato");
        }
        // Verifica la password usando il metodo comparePassword definito nel modello User

        const isMatch = await cliente.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json("Password errata");
        }

        // Genera il token usando il metodo generateJWT definito nel modello User
        const token = await generateJWT({ id: cliente._id });

        // Restituisce il token e messaggio di successo
        res.json({ token,
             message: "Autenticazione riuscita",
             isAdmin: cliente.isAdmin 
        });
    } catch (error) {
        console.error("Errore nel login:", error);
        res.status(500).json({ message: "Errore del server" });
    }
});


// GET /me => restituisce cliente collegato al token di accesso
// authMiddleware verifica il token e aggiunge i dati dell'autore a req.author
router.get("/me", authMiddleware, (req, res) => {
    // Converte il documenti Moongoose in un oggetto JavaScript semplice
    const userData = req.user.toObject();

    // Rimuovi la password dal risultato
    delete userData.password;
    // Invia i dati dell'autore come Risposta
     // Assicuriamoci che isAdmin sia incluso nella risposta
     res.json({
        ...userData,
        isAdmin: userData.isAdmin || false
    });
});

// Definizione della router POST per password dimenticata dell'utente
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const cliente = await Cliente.findOne({ email });

    if (!cliente) {
      return res.status(404).json({ message: 'Email non trovata!' });
    }

        // insersco tempo massimo per il reset della password pari a 1 ora 
    const token = jwt.sign({ id: cliente._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const resetUrl = `${FRONTEND_URL}/reset-password/${cliente._id}/${token}`;

    await transporter.sendMail({
      from: ` Ricerche Radiologiche <noreply@ricercheradiologiche.com>`,
      to: cliente.email,
      subject: 'Recupero della password',
      html: `
        <p>Ciao <strong>${cliente.nome} ${cliente.cognome}</strong>,</p>
        <p>Hai richiesto di recuperare la tua password. Per procedere, clicca sul link sottostante:</p>
        <br />
        <a href="${resetUrl}" target="_blank">Reimposta la tua password</a>
        <br /><br />
        <p>Se non hai richiesto il recupero della password, ignora questa email. La tua password rimarrà invariata.</p>
        <br />
        <p>Grazie,</p>
        <h3>Il team di <strong>Ricerche Radiologiche</strong></h3>
      `,
    
    });

    res.status(200).json({ message: 'Email di recupero inviata con successo!' });
  } catch (error) {
    console.error('Errore nel recupero delle credenziali:', error);
    res.status(500).json({ message: 'Errore del server!', error: error.message });
  }
});



// Definizione della router POST per resettare la password dell'utente
router.post('/reset-password/:id/:token', async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
  
    try {
      if (!password || password.trim() === '') {
        return res.status(400).json({ Status: 'Password vuota o non inserita!' });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const hash = await bcrypt.hash(password, 10);
      const updatedCliente = await Cliente.findByIdAndUpdate(id, { password: hash }, { new: true });
  
      if (!updatedCliente) {
        return res.status(404).json({ Status: 'Cliente non trovato!' });
      }
  
      res.json({ Status: 'Password resettata con successo!' });
    } catch (err) {
      console.error('Errore durante il reset della password:', err);
      if (err.name === 'JsonWebTokenError') {
        res.status(400).json({ message: 'Token non valido!' });
      } else if (err.name === 'TokenExpiredError') {
        res.status(400).json({ message: 'Token scaduto!' });
      } else {
        res.status(500).json({ message: 'Errore del server!', Error: err.message });
      }
    }
  });
  
  // Definizione di router PATCH per aggiornare la password dell'utente
router.patch('/change-password', authMiddleware, async (req, res) => {
    
    try {
      const { currentPassword, newPassword } = req.body;
  
      // Verifica se la password corrente e la nuova password sono fornite
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: 'La password corrente e la nuova password sono obbligatorie!' });
      }
  
      // Trova l'utente che ha effettuato il login
      const cliente = await Cliente.findById(req.user._id);
  
      if (!cliente) {
        return res.status(404).json({ message: 'Cliente non trovato!' });
      }
  
      // Confronta la password corrente con quella salvata
      const isMatch = await cliente.comparePassword(currentPassword);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'La password corrente non è corretta!' });
      }
  
      // Verifica che la nuova password sia diversa dalla vecchia
      if (await cliente.comparePassword(newPassword)) {
        return res.status(400).json({ message: 'La nuova password deve essere diversa dalla password corrente!' });
      }
  
      // Aggiorna la password nel database
      cliente.password = newPassword;
      await cliente.save();
      res.status(200).json({ message: 'Password aggiornata con successo!' });
    } catch (error) {
      console.error('Errore durante il cambiamento della password:', error);
      res.status(500).json({ message: 'Errore del server!', error: error.message });
    }
  });
  




// *********************  // 

// Rotta per il login con Google
router.get("/google", passport.authenticate("google"));


// Rotte Google Login
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
)
// Questo endpoint inizia il flusso di autenticazione OAuth con Google
// 'google' si riferisce alla strategia GoogleStrategy configurata in passportConfig.js
// scope: specifica le informazioni richiediamo a Google (profilo e email)
// Rotta di callback per l'autenticazione Google

router.get(
    "/google/callback",
    // Passport tenta di autenticare l'utente con le credenziali Google
    passport.authenticate("google", { failureRedirect: `${FRONTEND_URL}/login`}),
    // Se l'autenticazione fallisce, l'utente viene reindirizzato alla pagina di login
    async (req, res) => {
        try {
            // req.user contiene i dati dell'utente forniti da Passport
            // Genero il token usando il metodo generateJWT
            // La funzione generateJWT riceve come argomento l'ID dell'utente 
            const token = await generateJWT({ id: req.user._id });

                        // // Recuperiamo l'informazione isAdmin dal database ** 
                        // const cliente = await Cliente.findById(req.user._id);
                        // const isAdmin = cliente ? cliente.isAdmin : false;
            
            // Reindirizza l'utente al frontend, passando il token come parametro URL
            // Il frontend può quindi salvare questo token e usarlo per le richieste autenticate
             res.redirect(`${FRONTEND_URL}/login?token=${token}`);

               // Reindiriziamo con token e isAdmin come parametri URL ** 
             //  res.redirect(`${FRONTEND_URL}/?token=${token}&isAdmin=${isAdmin}`);
        } catch (error) {
            // Se c'è un errore durante l'autenticazione, l'utente viene reindirizzato alla pagina di login
            console.error("Errore nella generazione del token:", error);
            // E reindirizziamo l'utente alla pagina di login con un messaggio di errore
            res.redirect(`${FRONTEND_URL}/login?error=auth_failed`);
        }
    }
);




export default router