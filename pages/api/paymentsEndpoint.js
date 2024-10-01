const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://tough-kerrill-gagitogol-f492a8ba.koyeb.app';

export async function assignPayment({ name, link_payment, teacherProfileId }) {
    const response = await fetch(`${API_URL}/src/payments/assign`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, link_payment, teacherProfileId }),
    });
    if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to assign payment: ${errorDetails.message}`);
    }
    return await response.json();
}

export async function getPaymentById(paymentId) {
    const response = await fetch(`${API_URL}/src/payments/${paymentId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to get payment: ${errorDetails.message}`);
    }
    return await response.json();
}

export async function updatePayment({ name, link_payment, teacherProfileId }) {
    const response = await fetch(`${API_URL}/src/payments/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, link_payment, teacherProfileId }),
    });
    if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to update payment: ${errorDetails.message}`);
    }
    return await response.json();
}
