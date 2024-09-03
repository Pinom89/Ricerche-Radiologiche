import './App.css';
import NavigationBar  from './components/navigationBar/NavigationBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './components/homepage/Homepage';
import PrenotaEsame from './components/prenota-esame/PrenotaEsame';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {AuthProvider} from './modules/AuthProvider.js';
import CartaServizi from './components/il_centro/cartaservizi/CartaServizi'
import Impegni from './components/il_centro/impegni/Impegni'
import Équipe from './components/il_centro/Équipe/Équipe'
import Azienda from './components/il_centro/azienda/Azienda'
import Certificazioni from './components/il_centro/certificazioni/Certificazioni'
import RadiologiaDigitale from './components/diagnostiche/radiologiaDigitale/RadiologiaDigitale';
import Login from './components/login/Login';
import Registrati from './components/registrati/Registrati';
import Footer from './components/footer/Footer';
import MiePrenotazioni from './components/mieprenotazioni/MiePrenotazioni.jsx';
import DiagnosticaDentale from './components/diagnostiche/diagnosticaDentale/DiagnosticaDentale.jsx';
import Ecografia from './components/diagnostiche/ecografia/Ecografia.jsx';
import CreaSpecialista from './components/il_centro/Équipe/creaspecialista/CreaSpecialista.jsx';
import Admin from './components/admin/Admin.jsx';
import Senologia from './components/diagnostiche/senologia/Senologia.jsx';
import Tomografia from './components/diagnostiche/tomografia/Tomografia.jsx';
import Risonanza from './components/diagnostiche/risonanza/Risonanza.jsx';
import Orari from './components/informazioni/orari/Orari.jsx';
import Referti from './components/informazioni/referti/Referti.jsx';
import Accettazioni from './components/informazioni/accettazione/Accettazione.jsx';
import Contatti from './components/informazioni/contatti/Contatti.jsx';
import MessaggiAdmin from './components/admin/messaggiAdmin/MessaggiAdmin.jsx';
import ResetPassword from './components/resetpassword/ResetPassword.jsx';
import Forgotpassword from './components/forgotpassword/Forgotpassword.jsx';
import CambiaPassword from './components/cambiapassword/CambiaPassword.jsx';
import ModificaAccount from './components/modificaaccount/ModificaAccount.jsx';
import NotFound from './components/404/NotFound.jsx';




function App() {
  return (
    <AuthProvider>
      <Router>
       <NavigationBar/>
        <Routes>
          <Route path='/' element={<Homepage/>}/> 
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Registrati/>}/>
          <Route path='/admin-prenotazioni' element={<Admin/>}/>
          <Route path='/prenota-esame' element={<PrenotaEsame/>}/>
          <Route path='/carta-servizi' element={<CartaServizi/>}/>
          <Route path='/impegni' element={<Impegni/>}/>
          <Route path='/equipe' element={<Équipe/>}/>
          <Route path='/crea-specialista' element={<CreaSpecialista/>}/>
          <Route path='/azienda' element={<Azienda/>}/>
          <Route path='/certificazioni' element={<Certificazioni/>}/>
          <Route path='/radiologia-digitale' element={<RadiologiaDigitale/>}/>
          <Route path='/le-mie-prenotazioni' element={<MiePrenotazioni/>}/>
          <Route path='/panoramica-dentale' element={<DiagnosticaDentale/>}/>
          <Route path='/ecografia' element={<Ecografia/>}/>
          <Route path='/senologia' element={<Senologia/>}/>
          <Route path='/tomografia' element={<Tomografia/>}/>
          <Route path='/risonanza' element={<Risonanza/>}/>
          <Route path='/orari' element={<Orari/>}/>
          <Route path='/referti' element={<Referti/>}/>
          <Route path='/accettazione' element={<Accettazioni/>}/>
          <Route path='/contatti' element={<Contatti/>}/>
          <Route path='/admin-messaggi' element={<MessaggiAdmin/>}/>
          <Route path='/reset-password/:id/:token' element={<ResetPassword/>}/>
          <Route path='/forgot-password' element={<Forgotpassword/>}/>
          <Route path='/cambia-password' element={<CambiaPassword/>}/>
          <Route path='/modifica-account/' element={<ModificaAccount/>}/>
          <Route path='/*' element={<NotFound/>}/>
        </Routes>
        <Footer/>
      </Router>
    </AuthProvider>
  );
}

export default App;
