const fetchWithAuth = async (url, options = {}) => {
    // Recupera il token dal localStorage
 const token = localStorage.getItem("token");
 // Prepara gli headers di default, includendo il Content-Type
 const headers = {
   // Spread degli headers esistenti
   ...options.headers,
   

    // Se esiste un token, lo aggiunge agli headers
 

 };

 if (token) {
   // Aggiunge l'header di autorizzazione con il token
   headers['Authorization'] = `Bearer ${token}`;
   // Log del token per debugging
  // console.log("Token inviato:", token);
 }

   try {
     const response = await  fetch(url, {
       ...options,
       headers,
     });
 
     if (!response.ok) {
       
       throw new Error('Errore nella richiesta');
     }
     return await  response.json();
   } catch (error) {
     console.error("Errore nella richiesta:", error);
     throw error;
   }
 };
 
 export default fetchWithAuth