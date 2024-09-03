
// creata funzione per permettere di formattare la data in formato gg/mm/aaaa
const formatDate = (data, paese) => {
    if (!data) return '';
    try {
      const date = new Date(data);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      if (paese === 'it') {
        return `${day}/${month}/${year}`;
      }
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error('Invalid date format', error);
      return ''; 
    }
  };

  
  export default formatDate;