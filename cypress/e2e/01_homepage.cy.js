describe('Home Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('should have a header with the title and login button', () => {
        cy.get('header').within(() => {
            cy.contains('h1', 'EduPay').should('exist');
            //cy.contains('h1','ERROR').should('exist');
            cy.get('button').contains('Iniciar sesión con Auth0').should('exist');
        });
    });

    it('should have a hero section with the main title, description, and view classes button', () => {
        cy.get('main').within(() => {
            cy.contains('h1', 'EduPay').should('exist');
            cy.contains('p', 'Descubre cursos increíbles y gestiona tus pagos fácilmente con EduPay.').should('exist');
            cy.get('a[href="/classes/available"] button').should('contain', 'Ver Clases');
        });
    });

    it('should have a button to view classes that navigates to the classes page', () => {
        cy.intercept('GET', 'http://localhost:3001/src/cl/renamedclass/all').as('getClasses');
        cy.get('a[href="/classes/available"] button').should('contain', 'Ver Clases').click();
        cy.wait('@getClasses').its('response.statusCode').should('be.oneOf', [200, 304]);
        cy.url().should('include', '/classes/available');
    });

    it('should render the Swiper component with the correct number of slides', () => {
        cy.get('.swiper-slide').should('have.length', 4); // Assuming there are 4 slides
    });

    it('should have a course preview section with the correct title and course details', () => {
        cy.get('section').within(() => {
            cy.contains('h2', '¡Mira lo que puedes aprender!').should('exist');
            cy.get('.swiper-slide').each(($slide) => {
                cy.wrap($slide).within(() => {
                    cy.get('img').should('exist');
                    cy.get('h3').should('exist');
                    cy.contains('p', 'Con').should('exist');
                    cy.contains('p', 'Categoría:').should('exist');
                    cy.contains('a', 'Ver más detalles').should('exist');
                });
            });
        });
    });

    it('should display the footer with the correct text', () => {
        cy.get('footer').contains('© 2024 EduPay. Todos los derechos reservados.');
    });
});