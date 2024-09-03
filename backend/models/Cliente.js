import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const clienteSchema = new Schema({
  nome: { type: String, required: true },
  cognome: { type: String },
  email: { type: String, unique: true },
  dataDiNascita: { type: Date },
  avatar: { type: String, required: false },
  password: { type: String },
  googleId: { type: String },
  isAdmin: { type: Boolean },
}, {
  timestamps: true,
  collection: "clienti",
});

const prenotazioneSchema = new Schema({
  cliente: { type: Schema.Types.ObjectId, ref: 'Cliente', required: true },
  data: { type: Date, required: true },
  nome: { type: String, required: true },
  cognome: { type: String, required: true },
  codiceFiscale: { type: String },
  esame: { type: String, required: true },
  ricetta: { type: String },
  numRicetta: { type: Number, required: true },
  codEsenzione: { type: String },
  email: { type: String, required: true },
  stato: { type: String }
}, {
  timestamps: true,
  collection: "prenotazioni",
});


// Metodo per confrontare le password
clienteSchema.methods.comparePassword =  function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Middleware per l'hashing della password prima del salvataggio 
clienteSchema.pre("save", async function (next) {
  // Esegui l'hashing solo se la password è stata modifica (o è nuova)
  if (!this.isModified("password")) return next();

  try {
    // Genera un salt e hash la password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } 
  catch (error) {
    next(error);
  }
});
  



// Esporto il modello 'User' utilizzando il metodo model di Mongoose
// Il modello 'Cliente' sarà basato sullo schema 'ClienteSchema' definito sopra
const Cliente = model("Cliente", clienteSchema);
// Il modello 'Prenotazione' sarà basato sullo schema 'PrenotazioneSchema' definito sopra
const Prenotazione = model('Prenotazione', prenotazioneSchema);

export { Cliente, Prenotazione };