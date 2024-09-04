// Importo i pacchetti necessari
import express from 'express';
import endpoints from 'express-list-endpoints';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import clienteRoutes from './routes/clienteRoutes.js'; // Importa le rotte
import equipeRoutes from './routes/equipeRoutes.js';
import prenotazioneRoutes from './routes/prenotazioneRoutes.js';
import contattoRoutes from './routes/contattoRoutes.js';
import cors from 'cors';
import {
  badRequestHandler,
  unauthorizedHandler,
  notFoundHandler,
  genericErrorHandler
} from './middleware/errorHandlers.js';
import path from 'path'; // UPLOAD: Modulo per gestire i percorsi dei file
import { fileURLToPath } from 'url'; // UPLOAD Per convertire URL in percorsi di file
import authRoutes from './routes/authRoutes.js';
import session from 'express-session';
import passport from "./config/passportConfig.js";


// UPLOAD: Configurazione per utilizzare __dirname in moduli ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




// Carica le variabili d'ambiente
dotenv.config();

// Inizializza l'app Express
const app = express();
// ** TODO  **

const corsOptions = {
  origin: function (origin, callback) {
    // Definiamo una whitelist di origini consentite. 
    // Queste sono gli URL da cui il nostro frontend farà richieste al backend.
    const whitelist = [
      'http://localhost:3000',
      'https://ricerche-radiologiche.onrender.com',
      'https://ricerche-radiologiche.vercel.app'
    ];

    if (process.env.NODE_ENV === 'development') {
      // In sviluppo, permettiamo anche richieste senza origine (es. Postman)
      callback(null, true);
    } else if (whitelist.indexOf(origin) !== -1 || !origin) {
      // In produzione, controlliamo se l'origine è nella whitelist
      callback(null, true);
    } else {
      callback(new Error('Permesso negato CORS'));
    }
  },
  credentials: true // Permette l'invio di credenziali, come nel caso di autenticazione
  // basata su sessioni.
};

// NEW! passiamo `corsOptions` a cors()
app.use(cors(corsOptions));


// abilitato server per collegamento front-end
app.use(cors());

// Middleware per il parsing del corpo delle richieste JSON
app.use(express.json());

// Configurazione della sessione per autenticazione Google
app.use(
  session({
    // Il 'secret' è usato per firmare il cookie di sessione
    // È importante che sia una stringa lunga, unica e segreta
    secret: process.env.SESSION_SECRET,
    // 'resave: false' dice al gestore delle sessioni di non
    // salvare la sessione se non è stata modificata
    resave: false,
    // 'saveUninitialized: false' dice al gestore delle sessioni di non
    // creare una sessione finché non memorizziamo qualcosa
    // Aiuta a implementare le "login sessions" e riduce l'uso del server di memorizzazione
    saveUninitialized: false,
  })
)

// ** Configurazione Google **


// NEW! Inizializzazione di Passport
app.use(passport.initialize());
app.use(passport.session());

// ** // 
// Usa le route di autenticazione
app.use('/auth', authRoutes);

// ** // 
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);
// ** // 
// ** Fine configurazione Google**

// Connessione a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connesso'))
  .catch((err) => console.error('MongoDB: errore di connessione.', err));

// Definizione della porta su cui il server ascolterà
const PORT = process.env.PORT || 5001;



// Usa le rotte per gli utenti
app.use('/auth', authRoutes);
app.use('/prenotazioni', prenotazioneRoutes);
app.use('/equipe', equipeRoutes);
app.use('/pazienti', clienteRoutes);
app.use('/contatti', contattoRoutes);
app.use(badRequestHandler);
app.use(unauthorizedHandler);
app.use(notFoundHandler);
app.use(genericErrorHandler);


// Avvio del server
app.listen(PORT, () => {
  console.log(`Server acceso sulla porta ${PORT}`);
  console.log("Sono disponibili i seguenti endpoints:");
  console.table(endpoints(app));
});

