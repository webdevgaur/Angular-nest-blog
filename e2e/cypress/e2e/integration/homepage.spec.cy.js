describe('Homepage', () => {

    it('should load successfully', () => {
        cy.visit('/');
    });

    it('should have correct spelling', () => {
        cy.contains('Users');
        cy.contains('Admin');
        cy.contains('Login');
        cy.get('mat-select').click();
        cy.contains('Register');
    });

});