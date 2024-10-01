import React from 'react';
import { donate } from '../lib/payment'; // Import the donate function from lib

const Testmp = () => {
    const handlePayment = () => {
        donate(100.0, 'Clase de prueba');
    };

    return (
        <div>
            <button onClick={handlePayment}>Pagar clase con Mercado Pago</button>
        </div>
    );
};

export default Testmp;

//QUIERO TERMINAR CON LO DE MERCADO PAGO