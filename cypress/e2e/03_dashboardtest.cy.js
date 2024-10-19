// cypress/e2e/03_dashboardtest.cy.js

describe('TeacherDashboard Component', () => {
    const testUser = Cypress.env('testUser');

    beforeEach(() => {
        window.localStorage.setItem('token', testUser.token);
        cy.visit('http://localhost:3000/teachers/dashboard');
    });

    it('renders the component', () => {
        cy.contains('TeacherHub').should('be.visible');
        cy.contains('Bienvenido').should('be.visible');
    });

    it('should display sidebar items', () => {
        cy.contains('Dashboard').should('be.visible');
        cy.contains('Courses').should('be.visible');
        cy.contains('Schedule').should('be.visible');
        cy.contains('Messages').should('be.visible');
        cy.contains('Earnings').should('be.visible');
        cy.contains('Classroom Map').should('be.visible');
        cy.contains('Settings').should('be.visible');
        cy.contains('Logout').should('be.visible');
    });

    it('should navigate to lessons page when clicking "Courses"', () => {
        cy.contains('Courses').click();
        cy.url().should('include', '/teachers/dashboard/lessons');
    });

    it('should log out the user when clicking "Logout"', () => {
        cy.contains('Logout').click();
        cy.url().should('not.include', '/teachers/dashboard');
        cy.window().then((win) => {
            expect(win.localStorage.getItem('token')).to.be.null;
        });
    });

    it('should display upcoming lessons', () => {
        cy.contains('Upcoming Lessons').should('be.visible');
        cy.contains('Introduction to React').should('be.visible');
        cy.contains('Advanced JavaScript Concepts').should('be.visible');
        cy.contains('CSS Flexbox and Grid').should('be.visible');
    });

    it('should display past lessons', () => {
        cy.contains('Past Lessons').should('be.visible');
        cy.contains('HTML Basics').should('be.visible');
        cy.contains('JavaScript Fundamentals').should('be.visible');
        cy.contains('Responsive Web Design').should('be.visible');
    });

    it('should display earnings chart', () => {
        cy.contains('Earnings Over Time').should('be.visible');
        cy.get('canvas').should('be.visible');
    });

    it('should navigate to create class page, fill the form, and create a class', () => {
        cy.contains('Courses').click();
        cy.url().should('include', '/teachers/dashboard/lessons');

        cy.contains('Crear nueva clase').click();
        cy.url().should('include', '/teachers/dashboard/createClass');

        cy.get('input[placeholder="Subject"]').type('New Class Subject');
        cy.get('input[placeholder="Link Meet"]').type('https://meet.link');
        cy.get('input[placeholder="Date"]').type('2023-10-15');
        cy.get('input[placeholder="Time"]').type('10:00');
        cy.get('textarea[placeholder="Description"]').type('This is a description of the new class.');
        cy.get('input[placeholder="Class Price"]').type('100');
        cy.get('input[placeholder="Quantity of instances"]').type('5');

        cy.intercept('POST', `${Cypress.env('NEXT_PUBLIC_API_URL')}/src/cl/create`, {
            statusCode: 201,
            body: { classId: 'new-class-id', message: 'Class created successfully' }
        }).as('createClass');

        cy.get('button[type="submit"]').click();
        cy.wait('@createClass');

        cy.url().should('include', '/teachers/dashboard/lessons');
    });
});