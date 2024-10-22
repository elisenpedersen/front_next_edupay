import axios from "axios"

const API_URL = 'https://sandbox-api.talo.com.ar';

// Función para obtener el token de acceso
async function getAccessToken(userId) {
    try {
        const response = await axios.post(`${API_URL}/users/${userId}/tokens`, {
            client_id: process.env.NEXT_PUBLIC_TALO_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_TALO_CLIENT_SECRET
        });
        return response.data.data.token;
    } catch (error) {
        console.error('Error al obtener el token de acceso:', error);
        throw error;
    }
}


export async function createPayment(userId, classPrice, linkMeet) {
    try {
        const accessToken = await getAccessToken(userId);
        
        // Generar un external_id único
        const timestamp = Date.now();
        const randomNum = Math.floor(Math.random() * 1000);
        const external_id = `payment_${timestamp}_${randomNum}`;

        const response = await axios.post(`${API_URL}/payments/`, {
            price: {
                currency: "ARS",
                amount: classPrice,
            },
            user_id: userId,
            payment_options: [
                "transfer"
            ],
            redirect_url: linkMeet,
            external_id: external_id, // Usar el external_id generado
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });

        return response.data.data;
    } catch (error) {
        console.error('Error al crear el pago:', error);
        throw error;
    }
}

// Función para obtener información de un pago
export async function getPaymentInfo(paymentId, userId) {
    try {
        const accessToken = await getAccessToken(userId);
        const response = await axios.get(`${API_URL}/payments/${paymentId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error al obtener información del pago:', error);
        throw error;
    }
}

// Manejador de webhook
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { paymentId, userId } = req.body;
            
            // Verificar la autenticidad del webhook (implementar lógica de verificación)
            
            // Obtener los detalles actualizados del pago
            const paymentDetails = await getPaymentInfo(paymentId, userId);
            
            // Actualizar el estado del pedido en tu sistema
            // Implementa la función updateOrderStatus según tu lógica de negocio
            await updateOrderStatus(paymentDetails.external_id, paymentDetails.status);
            
            res.status(200).json({ message: 'Webhook procesado correctamente' });
        } catch (error) {
            console.error('Error al procesar el webhook:', error);
            res.status(500).json({ error: 'Error al procesar el webhook' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

// Función para actualizar el estado del pedido (debes implementarla según tu lógica de negocio)
async function updateOrderStatus(orderId, status) {
    // Implementa la lógica para actualizar el estado del pedido en tu base de datos
    console.log(`Actualizando estado del pedido ${orderId} a ${status}`);
}


// Function to simulate a payment transfer
export async function simulatePayment(userId, amount) {
    try {
        const cvu = "0000630500009929799271";
        const accessToken = await getAccessToken(userId);
        const response = await axios.post(`${API_URL}/cvu/${cvu}/faucet`, {
            amount: amount
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error simulating payment:', error);
        throw error;
    }
}
