import { Schema, model } from "mongoose";

// const commentSchema = new Schema({
//     name: { type: String, required: true },  // tutti i dati sono richiesti obbligatoriamente
//     email: { type: String, required: true },
//     comment: { type: String, required: true }
//   }, {
//     timestamps: true, // indica data di creazione e aggiornento
//     _id: true // verifichiamo che ogni commento abbia un unico id
// });

const EquipeSchema = new Schema({
    nome: { type: String, required: true },
    cognome: { type: String, required: true },
    dataDiNascita: { type: Date, required: true },
    specializzazione: { type: String, required: true },
    title: { type: String, required: true },
    cover: { type: String, required: true },
  }, {
    timestamps: true,
    collection: "equipe"
});

 const Equipe = model('Equipe', EquipeSchema);

export default Equipe;


   
