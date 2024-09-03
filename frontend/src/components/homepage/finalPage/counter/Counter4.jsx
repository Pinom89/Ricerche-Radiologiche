import React, { useState, useEffect } from 'react';
import "./counter.css"
function Counter4() {
  const [count, setCount] = useState(0);
  const target = 13248;
  const duration = 4000; // Durata dell'animazione in millisecondi
  const steps = 30; // Numero di passi per l'animazione

  useEffect(() => {
    let timer;
    const increment = Math.ceil(target / steps);
    let currentStep = 0;

    const updateCounter = () => {
      currentStep++;
      setCount(prevCount => {
        const newCount = Math.min(prevCount + increment, target);
        if (newCount >= target || currentStep >= steps) {
          clearInterval(timer);
          return target;
        }
        return newCount;
      });
    };

    timer = setInterval(updateCounter, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return <div className='px-4 py-2' style={{backgroundColor: '#18775D'}}>
    <span className="counter d-flex justify-content-center align-items-center">{count.toLocaleString()}</span>
    <p className="p_counter text-center">Risonanza Magnetica</p>
    </div>;
}

export default Counter4;