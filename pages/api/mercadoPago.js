// pages/api/mercadoPago.js
import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const response = await axios.post('https://api.mercadopago.com/checkout/preferences', req.body, {
                headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MP_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });
            res.status(200).json(response.data);
        } catch (error) {
            console.error('Error al crear la preferencia1:', error.response ? error.response.data : error);
            console.error('Error details:', error);
            res.status(500).json({ error: 'Error al crear la preferencia2' });
        }
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}