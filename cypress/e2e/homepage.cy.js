/// <reference types="cypress" />

describe('Homepage', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('should display the correct title', () => {
        cy.title().should('eq', 'EduPay')
    })

    it('should display the main heading', () => {
        cy.get('h1').contains('Bienvenido a EduPay')
    })

    it('should display the description', () => {
        cy.get('p').contains('Tu plataforma para acceder a tus clases o manejar tus pagos de las mismas.')
    })

    it('should have a login button that navigates to the login page', () => {
        cy.get('a[href="/teachers/login"] button').should('contain', 'Inicio de sesión').click()
        cy.url().should('include', '/teachers/login')
    })

    it('should have a button to access classes that navigates to the classes page', () => {
        cy.get('a[href="/classes/available"] button').should('contain', 'Acceder a mi clase').click()
        cy.url().should('include', '/classes/available')
    })

    it('should display the footer with the correct text', () => {
        cy.get('footer').contains('© 2024 EduPay. All rights reserved.')
    })
})