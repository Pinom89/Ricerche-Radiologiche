


import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Homepage from './components/homepage/Homepage';
import Footer from './components/footer/Footer';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import PrenotaEsame from './components/prenota-esame/PrenotaEsame';
import Certificazioni from './components/il_centro/certificazioni/Certificazioni';


// Test per il rendering di Homepage
test('Homepage renders all subcomponents', () => {
  render(
    <Router>
      <Homepage />
    </Router>
  );
  
  expect(screen.getByTestId('mock-carosello')).toBeInTheDocument();
  expect(screen.getByTestId('mock-funzioni')).toBeInTheDocument();
  expect(screen.getByTestId('mock-hero')).toBeInTheDocument();
  expect(screen.getByTestId('mock-esami')).toBeInTheDocument();
  expect(screen.getByTestId('mock-finalpage')).toBeInTheDocument();
});


test('Carosello renders correctly', async () => {
  render(
    <Router>
      <Homepage />
    </Router>
  );
  
  const carouselElements = await screen.findAllByAltText('panoramica');
  expect(carouselElements.length).toBeGreaterThan(0);
  carouselElements.forEach(element => {
    expect(element).toBeInTheDocument();
  });
});



test('renders Footer component with correct sections', () => {
  render(<App />);
 // Verifica che le sezioni principali siano presenti, specificando il selettore
 expect(screen.getByText('Il centro', { selector: 'h5' })).toBeInTheDocument();
 expect(screen.getByText('Le diagnostiche', { selector: 'h5' })).toBeInTheDocument();
 expect(screen.getByText('Informazioni', { selector: 'h5' })).toBeInTheDocument();
});

test('prenota esame', async() => {
  render(<App />);
  const buttondetails = await screen.findAllByText(/Come prenotare il tuo esame/i);
  fireEvent.click(buttondetails[0]);
  const comment = await screen.findByText(/Come prenotare un esame/i)
  expect(comment).toBeInTheDocument();
});



test('naviga alla homepage cliccando sul link Home', async () => {
  render(
 
      <App />
   
  );

  // Trova il link "Home"
  const homeLink = await screen.findByText(/Home/i);

  // Simula il click sul link "Home"
  fireEvent.click(homeLink);

  // Verifica che la navigazione sia avvenuta correttamente
  expect(window.location.pathname).toBe('/');
}); 

test('Footer contiene tutti i link', () => {
  const { getByText } = render(
    <MemoryRouter>
    <Footer />
  </MemoryRouter>
  );

  expect(getByText('Équipe')).toBeInTheDocument();
  expect(getByText('Carta Servizi')).toBeInTheDocument();
  expect(getByText('Impegni')).toBeInTheDocument();
  expect(getByText('L\'azienda')).toBeInTheDocument();
  expect(getByText('Certificazioni')).toBeInTheDocument();
  expect(getByText('Radiologia digitale')).toBeInTheDocument();
  expect(getByText('Diagnostica Dentale')).toBeInTheDocument();
  expect(getByText('Ecografia')).toBeInTheDocument();
  expect(getByText('Senologia')).toBeInTheDocument();
  expect(getByText('Tomografia Computerizzata')).toBeInTheDocument();
  expect(getByText('Rm ad alto campo')).toBeInTheDocument();
  expect(getByText('Orari')).toBeInTheDocument();
  expect(getByText('Contatti')).toBeInTheDocument();
  expect(getByText('Referti')).toBeInTheDocument();
  expect(getByText('Accedi')).toBeInTheDocument();
});

test('Link portano alle corrette rotte', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );

  expect(getByText('Équipe')).toHaveAttribute('href', '/Équipe');
  expect(getByText('Carta Servizi')).toHaveAttribute('href', '/carta-servizi');
  expect(getByText('Impegni')).toHaveAttribute('href', '/impegni');
  expect(getByText('L\'azienda')).toHaveAttribute('href', '/azienda');
  expect(getByText('Certificazioni')).toHaveAttribute('href', '/certificazioni');
  expect(getByText('Radiologia digitale')).toHaveAttribute('href', '/radiologia-digitale');
  expect(getByText('Diagnostica Dentale')).toHaveAttribute('href', '/panoramica-dentale');
  expect(getByText('Ecografia')).toHaveAttribute('href', '/ecografia');
  expect(getByText('Senologia')).toHaveAttribute('href', '/senologia');
  expect(getByText('Tomografia Computerizzata')).toHaveAttribute('href', '/tomografia');
  expect(getByText('Rm ad alto campo')).toHaveAttribute('href', '/risonanza');
  expect(getByText('Orari')).toHaveAttribute('href', '/orari');
  expect(getByText('Contatti')).toHaveAttribute('href', '/contatti');
  expect(getByText('Referti')).toHaveAttribute('href', '/referti');
  expect(getByText('Accedi')).toHaveAttribute('href', '/login');
});


test('Link hanno la classe corretta', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );

  expect(getByText('Équipe')).toHaveClass('text-light text-decoration-none');
  expect(getByText('Carta Servizi')).toHaveClass('text-light text-decoration-none');
  expect(getByText('Impegni')).toHaveClass('text-light text-decoration-none');
  expect(getByText('L\'azienda')).toHaveClass('text-light text-decoration-none');
  expect(getByText('Certificazioni')).toHaveClass('text-light text-decoration-none');
  expect(getByText('Radiologia digitale')).toHaveClass('text-light text-decoration-none');
  expect(getByText('Diagnostica Dentale')).toHaveClass('text-light text-decoration-none');
  expect(getByText('Ecografia')).toHaveClass('text-light text-decoration-none');
  expect(getByText('Senologia')).toHaveClass('text-light text-decoration-none');
  expect(getByText('Tomografia Computerizzata')).toHaveClass('text-light text-decoration-none');
  expect(getByText('Rm ad alto campo')).toHaveClass('text-light text-decoration-none');
  expect(getByText('Orari')).toHaveClass('text-light text-decoration-none');
  expect(getByText('Contatti')).toHaveClass('text-light text-decoration-none');
  expect(getByText('Referti')).toHaveClass('text-light text-decoration-none');
  expect(getByText('Accedi')).toHaveClass('text-light text-decoration-none');
});



test('Pagina contiene il titolo principale', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Certificazioni />
    </MemoryRouter>
  );

  expect(getByText('Certificazioni')).toBeInTheDocument();
});

test('Pagina contiene il testo descrittivo', () => {
  const { getByText } = render(<Certificazioni />);

  expect(getByText('Ricerche Radiologiche S.r.l., coerentemente con le linee strategiche e di indirizzo della Direzione Aziendale ha stabilito, documentato e attivato, impegnandosi a migliorarlo con continuità, il Sistema di Gestione della Qualità aziendale certificato ai sensi della Norma Internazionale UNI EN ISO 9001:2015.')).toBeInTheDocument();
  expect(getByText('La certificazione del Sistema di Gestione della Qualità assicura che:')).toBeInTheDocument();
  expect(getByText('La certificazione è stata rilasciata dal prestigioso Ente IMQ – CSQ che ha attestato la conformità del Sistema di Gestione per la Qualità. La struttura inoltre è sottoposta a periodiche verifiche di mantenimento della qualità da parte di tale Ente per monitorarne la costante adeguatezza ai requisiti.')).toBeInTheDocument();
});


test('Pagina ha il corretto stile CSS', () => {
  const { getByText } = render(<Certificazioni />);

  expect(getByText('Certificazioni')).toHaveClass('h2_impegni text-center pt-4 pb-4 title_principale_certificazioni');
  expect(getByText('Ricerche Radiologiche S.r.l., coerentemente con le linee strategiche e di indirizzo della Direzione Aziendale ha stabilito, documentato e attivato, impegnandosi a migliorarlo con continuità, il Sistema di Gestione della Qualità aziendale certificato ai sensi della Norma Internazionale UNI EN ISO 9001:2015.')).toHaveClass('px-4 mb-3 text_carta_servizi');
  expect(getByText('La certificazione del Sistema di Gestione della Qualità assicura che:')).toHaveClass('px-4 mb-3 text_carta_servizi');
 
});