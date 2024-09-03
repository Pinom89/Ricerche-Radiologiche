import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <Container fluid className="p-0">
      <div className=" bg-dark text-light py-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className=" text-center title-footer">Il centro</h5>
            <ul className="list-unstyled text-center ul-footer">
              <li className="my-2 text-light">
                <Link to="/Équipe" className="text-light text-decoration-none">
                  Équipe
                </Link>
              </li>
              <li className="my-2 text-light">
                <Link
                  to="/carta-servizi"
                  className="text-light text-decoration-none"
                >
                  Carta Servizi
                </Link>
              </li>
              <li className="my-2 text-light">
                <Link to="/impegni" className="text-light text-decoration-none">
                  Impegni
                </Link>
              </li>
              <li className="my-2 text-light">
                <Link to="/azienda" className="text-light text-decoration-none">
                  L'azienda
                </Link>
              </li>
              <li className="my-2 text-light">
                <Link
                  to="/certificazioni"
                  className="text-light text-decoration-none"
                >
                  Certificazioni
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h5 className=" text-center title-footer">Le diagnostiche</h5>
            <ul className="list-unstyled text-center ul-footer">
              <li className="my-2 text-light">
                <Link
                  to="/radiologia-digitale"
                  className="text-light text-decoration-none"
                >
                  Radiologia digitale
                </Link>
              </li>
              <li className="my-2 text-light">
                <Link
                  to="/panoramica-dentale"
                  className="text-light text-decoration-none"
                >
                  Diagnostica Dentale
                </Link>
              </li>
              <li className="my-2 text-light">
                <Link
                  to="/ecografia"
                  className="text-light text-decoration-none"
                >
                  Ecografia
                </Link>
              </li>
              <li className="my-2">
                <Link
                  to="/senologia"
                  className="text-light text-decoration-none"
                >
                  Senologia
                </Link>
              </li>
              <li className="my-2">
                <Link
                  to="/tomografia"
                  className="text-light text-decoration-none"
                >
                  Tomografia Computerizzata
                </Link>
              </li>
              <li className="my-2">
                <Link
                  to="/risonanza"
                  className="text-light text-decoration-none"
                >
                  Rm ad alto campo
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h5 className=" text-center title-footer">Informazioni</h5>
            <ul className="list-unstyled text-center ul-footer">
              <li className="my-2">
                <Link to="/orari" className="text-light text-decoration-none">
                  Orari
                </Link>
              </li>
              <li className="my-2">
                <Link
                  to="/contatti"
                  className="text-light text-decoration-none"
                >
                  Contatti
                </Link>
              </li>
              <li className="my-2">
                <Link to="/referti" className="text-light text-decoration-none">
                  Referti
                </Link>
              </li>
              <li className="my-2">
                <Link to="/login" className="text-light text-decoration-none">
                  Accedi
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}
