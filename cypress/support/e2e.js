// cypress/support/e2e.js

// Importa los comandos personalizados
import './commands';

// Configuración global para capturar capturas de pantalla en caso de error
Cypress.on('fail', (error, runnable) => {
    cy.screenshot('error-screenshot');
    throw error; // Re-lanza el error para que la prueba falle
});
