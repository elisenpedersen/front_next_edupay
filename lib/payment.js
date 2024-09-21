import axios from 'axios';

const accessToken = process.env.NEXT_PUBLIC_MP_ACCESS_TOKEN; // Asegúrate de que el token esté disponible

export async function donate( amount, message) {
    // event.preventDefault();


    try {
        const response = await axios.post('https://api.mercadopago.com/checkout/preferences', {
            items: [
                {
                    id: "donacion",
                    title: message,
                    quantity: 1,
                    unit_price: amount,
                },
            ],
            back_urls: {
                success: "http://localhost:3000/classes/success",
                failure: "http://localhost:3000/classes/fail",
                pending: "http://localhost:3000/classes/pending",
            },
            auto_return: "approved",
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        console.log(response.data);
        window.location.href = response.data.init_point; // Cambia a init_point
    } catch (error) {
        console.error('Error al crear la preferencia:', error.response ? error.response.data : error);
    }
}