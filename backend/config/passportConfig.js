import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import{Cliente}  from "../models/Cliente.js";


const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";
// Configuro la strategia di autenticazione Google
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                //inserisco URL di reindirizzamento dopo autenticazione
            callbackURL: `/auth/google/callback`,
            scope: ['profile', 'email'] // specifica le informazioni che richiediamo a Google (profilo e email)
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Cerco esistenza dell'user con ID Google
                let cliente = await Cliente.findOne({ googleId: profile.id });
                // imposto condizione se l'user Google esiste
                if (!cliente) {
                    cliente = new Cliente( {
                        googleId: profile.id, // id univoco fornito da Google
                        nome: profile.name.givenName, // Nome dell'utente
                        cognome: profile.name.familyName, //Cognome dell'utente
                        email: profile.emails[0].value, // Email dell'utente
                        dataDiNascita: null,
                        avatar: profile.photos[0].value, // Immagine dell'utente
                        isAdmin: false // Assumiamo che gli utenti Google non siano admin di default
                    })
                        
                    // Salvo il nuovo utente nel DB
                    await cliente.save();
                }
                
                    // Passiamo il cliente al middleware di Passport
                    // Il primo argomento null indica che non ci sono errori
                    done(null, cliente);
                     } catch (error) {  
                    // Se si verifica un errore, lo passiamo a Passport
                    done(error, null);
                }
            }
        )
    )

// Serializzazione dell'utente per la sessione
// Questa funzione determina quali dati dell'utente devono essere memorizzati nella sessione
passport.serializeUser((user, done) => {
    // Memorizziamo solo l'ID dell'utente nella sessione
    done(null, user.id);
  });

// Deserializzazione dell'utente per la sessione
// Questa funzione viene usata per recuperare l'intero oggetto utente basandosi sull'ID memorizzato
passport.deserializeUser(async(id, done) => {
    try {
        // Cerchiamo l'utente nel database usando l'ID 
        let user = await Cliente.findById(id);
        // Passiamo l'utente al middleware di Passport
        done(null, user);
    } catch (error) {
        // Se si verifica un errore, lo passiamo a Passport
        done(error, null);
    }
});





export default passport