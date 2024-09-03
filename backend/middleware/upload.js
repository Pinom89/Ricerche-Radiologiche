// Importa il modulo multer per la gestione dell'upload dei file
import multer from "multer";
// Importa il modulo path per la manipolazione dei percorsi dei file
import path from "path";

// Configura lo storage per multer

const storage = multer.diskStorage({
      // Specifica la cartella di destinazione per i file caricati
  destination: (req, file, cb) =>{
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Genera un nome univoco per il file caricato
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
        null,
         file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});
// Crea un'istanza di multer con la configurazione dello storage
const upload = multer({ storage: storage });
// Esporta il middleware di upload per l'uso in altre parti dell'applicazione
export default upload

