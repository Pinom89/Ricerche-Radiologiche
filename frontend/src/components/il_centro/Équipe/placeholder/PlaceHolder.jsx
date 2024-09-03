import React from 'react';
import { Card } from 'react-bootstrap';
import './placeholder.css'; // Creeremo questo file CSS
// imposto delle card di placeholder che varranno utilizzate al caricamento della pagina
const PlaceHolder = () => {
  return (
    <Card className="blog-card placeholder-card">
      <div className="placeholder-img pulse"></div>
      <Card.Body>
        <div className="placeholder-title pulse"></div>
      </Card.Body>
      <Card.Footer>
        <div className="placeholder-author pulse"></div>
      </Card.Footer>
      <div className="placeholder-buttons">
        <div className="placeholder-button pulse"></div>
        <div className="placeholder-button pulse"></div>
      </div>
    </Card>
  );
};

export default PlaceHolder;