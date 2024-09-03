import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchWithAuth from "../../services/fetchWithAuth";
import { Image, Button, Dropdown } from "react-bootstrap";
import "./logged.css";
import { AuthContext } from "../../modules/AuthContext.js";
import { RiLoginCircleLine, RiUserAddLine } from "react-icons/ri";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";


// <Button variant="success">Accedi</Button>

export default function Logged() {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Login-Logout
    </Tooltip>
  );
  const renderTooltip2 = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Modifica account
    </Tooltip>
  );

  const renderTooltip3 = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Registrati
    </Tooltip>
  );
  // imposto mediaquery per mobile sul toggle in caso di islogged === true
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);

  const { pazienteLogin, setPazienteLogin } = useContext(AuthContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const navigate = useNavigate();

  useEffect(() => {
    // Controlla se esiste un token nel localStorage
    const checkLoginStatus = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await setIsLoggedIn(true);
          console.log(token)
        } catch (error) {
          console.error("Token non valido:", error);
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
      setIsLoggedIn(!!token);
      // console.log(isLoggedIn);
    };

    // Controlla lo stato di login all'avvio
    checkLoginStatus();

    // Aggiungi un event listener per controllare lo stato di login
    window.addEventListener("storage", checkLoginStatus);
    // NEW! Evento per il cambio di stato
    window.addEventListener("loginStateChange", checkLoginStatus);

    // Rimuovi l'event listener quando il componente viene smontato
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      window.removeEventListener("loginStateChange", checkLoginStatus);
    };
  }, [isLoggedIn, setIsLoggedIn, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const userData = await fetchWithAuth(`${API_URL}/auth/me`);
        setPazienteLogin(userData);
        //  console.log(userData);
      } catch (error) {
        console.error("Errore nel recupero dei dati utente:", error);
        navigate("/login");
      }
    };

    if (isLoggedIn) {
      fetchAuthor();
    }
  }, [setPazienteLogin, isLoggedIn, setIsLoggedIn, navigate, API_URL]);

  return (
    <div
      className={`d-column justify-content-start align-items-start me-md-4 textsize ${
        isLoggedIn ? "mb-5" : "mb-3"
      }`}
    >
      <h5 style={{ color: "#08624A", fontSize: "13px" }} className="mt-3">
        {isLoggedIn ? `Benvenuto ${pazienteLogin.nome}` : ""}
      </h5>
      <div className="d-flex justify-content-start align-items-start gap-md-1 gap-lg-3">
        {isLoggedIn && (
          //

          <Dropdown
            show={show}
            onToggle={toggleShow}
            className={isSmallScreen ? "btn-group dropbottom" : "btn-group dropstart"}
          >
            <Dropdown.Toggle as="div" onClick={toggleShow} className="p-md-0">
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip2}
              >
                <Image
                  alt="Profilo"
                  src={pazienteLogin.avatar}
                  roundedCircle
                  className="imgprofile"
                />
              </OverlayTrigger>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item className="text-decoration-none">
                {" "}
                <Link to="/cambia-password" className="custom-link" >Cambia password</Link>
              </Dropdown.Item>
              <Dropdown.Item className="text-decoration-none">
              {" "}
              <Link to="/modifica-account" className="custom-link" >Modifica Acccount</Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        {!isLoggedIn && (
           <OverlayTrigger
           placement="bottom"
           delay={{ show: 250, hide: 400 }}
           overlay={renderTooltip3}
         >
          <Button
            variant="outline-success"
            onClick={() => navigate("/register")}
            className="textsize"
          >
            <RiUserAddLine /> 
          </Button>
         </OverlayTrigger>
        )}
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <Button
            variant={isLoggedIn ? "danger" : "success"}
            onClick={() => (isLoggedIn ? handleLogout() : navigate("/login"))}
          >
            {isLoggedIn ? <RiLogoutCircleRLine /> : <RiLoginCircleLine />}
          </Button>
        </OverlayTrigger>
      </div>
    </div>
  );
}
