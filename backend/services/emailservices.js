

// Funzione per inviare email
export const sendEmail = async (to, subject, htmlContent) => {

    const data = {
        from: "Ricerche Radiologiche <noreply@ricercheradiologiche.com>", //mail del mittente
        to, // Destinatario
        subject,  // Oggetto dell'email
        html: htmlContent // Contenuto HTML dell'email
    };
    try {
           // Invia l'email usando Mailgun
        const response = await mg.messages().send(data);
        console.log("Email inviata con successo:", response);
        return response;
    } catch (error) {
         // Gestione degli errori
        console.error("Errore durante l'invio dell'email:", error);
        throw error; // Lancia l'errore per permettere la gestione dell'errore
    }
}