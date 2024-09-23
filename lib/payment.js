// lib/payment.js
import axios from 'axios';

const accessToken = process.env.NEXT_PUBLIC_MP_ACCESS_TOKEN;

export async function donate(amount, message) {
    try {
        const response = await axios.post('/api/mercadoPago', {
            items: [
                {
                    id: "donacion",
                    title: message,
                    quantity: 1,
                    unit_price: amount,
                },
            ],
            back_urls: {
                success: `${window.location.origin}/classes/success`,
                failure: `${window.location.origin}/classes/fail`,
                pending: `${window.location.origin}/classes/pending`,
            },
            auto_return: "approved",
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        console.log(response.data);
        window.location.href = response.data.init_point;
    } catch (error) {
        console.error('Error al crear la preferencia4:', error.response ? error.response.data : error);
    }
}