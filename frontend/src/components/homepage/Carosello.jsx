import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Container, Image } from 'react-bootstrap';
import radiologia from '../../image/radiologia-diagnostica.jpg';
import risonanza from '../../image/risonanza-diagnostica.jpg';
import senologia from '../../image/senologia-diagnostica.jpg';
import tac from '../../image/tc-idose-diagnostica.jpg';
import panoramica from '../../image/opt-diagnostica.jpg';
import ecografia from '../../image/ecografia-diagnostica.jpg';
import './style.css'; 


export default function Carosello() {
  return (
    <Container fluid className='p-0'  data-testid="mock-carosello">
      <Carousel className='shadow' >
        <Carousel.Item interval={2500}>
          <Image src={radiologia} alt="raggi" className="d-block w-100" />
          <Carousel.Caption>
            <h3 className='text-carosello text-start'>Radiologia digitale</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2500}>
          <Image src={risonanza} alt="risonanza" className="d-block w-100" />
          <Carousel.Caption>
            <h3 className='text-carosello text-start'>RM ad alto Campo</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2500}>
          <Image src={senologia} alt="senologia" className="d-block w-100" />
          <Carousel.Caption>
            <h3 className='text-carosello text-start'>Senologia</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2500}>
          <Image src={panoramica} alt="panoramica" className="d-block w-100" />
          <Carousel.Caption>
            <h3 className='text-carosello text-start'>Diagnostica dentale</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2500}>
          <Image src={ecografia} alt="ecografia" className="d-block w-100" />
          <Carousel.Caption>
            <h3 className='text-carosello text-start'>Ecografia Ecocolordoppler</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2500}>
          <Image src={tac} alt="tc I-dose" className="d-block w-100" />
          <Carousel.Caption>
            <h3 className='text-carosello text-start'>Tc i-Dose</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}
