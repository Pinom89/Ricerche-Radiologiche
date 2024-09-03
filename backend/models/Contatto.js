import { Schema, model } from "mongoose";

const contattoSchema = new Schema({
    nome: { type: String, required: true },
    cognome: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: String, required: true },
    messaggio: { type: String, required: true },
    risposta: { type: String },
    stato: { type: String }
}, {
    timestamps: true,
    collection: "contatti",
});

// Il modello 'Cliente' sarà basato sullo schema 'contattoSchema' definito sopra
const Contatto = model('Contatto', contattoSchema);
export { Contatto };

