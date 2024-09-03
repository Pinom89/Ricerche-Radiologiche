import React, { useState, useContext } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logohome from "../../image/logohome.jpg";
import "./navigationbar.css";
import { Link } from "react-router-dom";
import Logged from "../logged/Logged";
import { AuthContext } from "../../modules/AuthContext.js";

export default function NavigationBar() {
  const { pazienteLogin, isLoggedIn } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [highlight1, setHighlight1] = useState(false);

  const handleMouseEnter1 = () => {
    setShow(true);
    setHighlight1(true);
  };

  const handleMouseLeave1 = () => {
    setShow(false);
    setHighlight1(false);
  };
  const [show2, setShow2] = useState(false);
  const [highlight2, setHighlight2] = useState(false);

  const handleMouseEnter2 = () => {
    setShow2(true);
    setHighlight2(true);
  };

  const handleMouseLeave2 = () => {
    setShow2(false);
    setHighlight2(false);
  };
  const [show3, setShow3] = useState(false);
  const [highlight3, setHighlight3] = useState(false);

  const handleMouseEnter3 = () => {
    setShow3(true);
    setHighlight3(true);
  };

  const handleMouseLeave3 = () => {
    setShow3(false);
    setHighlight3(false);
  };
  return (
    <Navbar className=" font" expand="sm" variant="light" >
      <Container fluid className="p-0">
        <Navbar.Brand as={Link} to="/">
          <img src={logohome} alt="logo azienda" />
        </Navbar.Brand>
        <div className="d-flex justify-content-end align-items-center">
          <Navbar.Toggle
            aria-controls="offcanvasNavbar-expand-sm"
            className="me-auto"
          />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link
                as={Link}
                to="/"
                className="p-sm-2 mt-2 ms-sm-1 color_home"
                style={{ color: "#08624a" }}
              >
                Home
              </Nav.Link>
              <Nav.Item>
                <NavDropdown
                  title="Il centro"
                  className="p-2"
                  id="basic-nav-dropdown"
                  show={show}
                  onMouseEnter={handleMouseEnter1}
                  onMouseLeave={handleMouseLeave1}
                  style={{
                    backgroundColor: highlight1 ? "#08624A" : "transparent",
                    borderRadius: highlight1 ? "0.25rem" : "0",
                    padding: "0.25rem",
                  }}
                >
                  <NavDropdown.Item as={Link} to="/equipe">
                    Equipe
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/carta-servizi">
                    Carta Servizi
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/azienda">
                    L'azienda
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/certificazioni">
                    Certificazioni
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/impegni">
                    Impegni
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav.Item>

              <Nav.Item>
                <NavDropdown
                  title="Diagnostiche"
                  className="p-2"
                  id="basic-nav-dropdown"
                  show={show2}
                  onMouseEnter={handleMouseEnter2}
                  onMouseLeave={handleMouseLeave2}
                  style={{
                    backgroundColor: highlight2 ? "#08624A" : "transparent",
                    borderRadius: highlight2 ? "0.25rem" : "0",
                  }}
                >
                  <NavDropdown.Item as={Link} to="/radiologia-digitale">
                    Radiologia digitale
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/panoramica-dentale">
                    {" "}
                    Diagnostica dentale{" "}
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/ecografia">
                    Ecografia
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/senologia">
                    Senologia
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/tomografia">
                    Tomografia Computerizzata
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/risonanza">
                    Risonanza Magnetica ad alto campo 1,5T
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav.Item>

              <Nav.Item data-testid="mock-info">
                <NavDropdown
                  title="Info"
                  className="p-2 "
                  id="basic-nav-dropdown"
                  show={show3}
                  onMouseEnter={handleMouseEnter3}
                  onMouseLeave={handleMouseLeave3}
                  style={{
                    backgroundColor: highlight3 ? "#08624A" : "transparent",
                    borderRadius: highlight3 ? "0.25rem" : "0",
                  }}
                  
                >
                  <NavDropdown.Item as={Link} to="/orari">
                    Orari
                  </NavDropdown.Item>
                  <NavDropdown.Item data-testid="mock-contatti" as={Link} to="/contatti">
                    Contatti
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/prenota-esame">
                    Prenotazione Esame
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/accettazione">
                    Accettazione
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/referti">
                    Referti
                  </NavDropdown.Item>
                  {isLoggedIn && !pazienteLogin.isAdmin && (
                    <NavDropdown.Item as={Link} to="/le-mie-prenotazioni">
                      Le mie prenotazioni
                    </NavDropdown.Item>
                  )}
                  {isLoggedIn && pazienteLogin.isAdmin && (
                    <NavDropdown.Item as={Link} to="/crea-specialista">
                      Crea Specialista
                    </NavDropdown.Item>
                  )}
                  {isLoggedIn && pazienteLogin.isAdmin && (
                    <NavDropdown.Item as={Link} to="/admin-prenotazioni">
                      Prenotazioni Admin
                    </NavDropdown.Item>
                  )}
                  {isLoggedIn && pazienteLogin.isAdmin && (
                    <NavDropdown.Item as={Link} to="/admin-messaggi">
                      Messaggi Admin 
                    </NavDropdown.Item>
                  )}
                </NavDropdown>
              </Nav.Item>
            </Nav>
            <Logged />
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}
