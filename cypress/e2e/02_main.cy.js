describe('Test Component', () => {
    const testUser = Cypress.env('testUser');

    // Antes de la prueba
    beforeEach(() => {
        // Almacena el token en localStorage
        localStorage.setItem('token', testUser.token);
        cy.visit(`http://localhost:3000/main?token=${testUser.token}`);
    });

    it('renders the component', () => {
        cy.contains('Continúa tu camino como...').should('be.visible');
    });

    it('should load the page and display buttons', () => {
        // Verificar que la página carga correctamente y muestra los botones
        cy.contains('Continúa tu camino como...').should('be.visible');
        cy.contains('Estudiante').should('be.visible');
        cy.contains('Profesor').should('be.visible');
    });

    it('should navigate to classes page when clicking "Estudiante"', () => {
        // Hacer clic en el botón "Estudiante"
        cy.contains('Estudiante').click();

        // Verificar la navegación a la página de clases
        cy.url().should('include', '/classes/available');
    });

    it('should use the global test user and token', () => {
        const testUser = Cypress.env('testUser');

        // Verificar que el email esté definido correctamente
        expect(testUser.email).to.exist;
        expect(testUser.email).to.equal('jalbertonisalini@itba.edu.ar');

        // Simular una solicitud con el email del usuario
        cy.intercept('POST', `${Cypress.env('NEXT_PUBLIC_API_URL')}/src/te/getTeacher`, {
            statusCode: 200,
            body: { teacherData: 'fake-teacher-data' }
        }).as('getTeacher');

        // Hacer clic en el botón "Profesor"
        cy.contains('Profesor').click();

        // Verificar que la solicitud se realizó con el email correcto
        cy.wait('@getTeacher').its('request.body').should('include', { email: testUser.email });
    });
});
