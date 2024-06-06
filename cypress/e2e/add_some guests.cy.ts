describe('Add some guestsz', () => {
  it('should add some guests', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-cy=guest-row-container]').should('not.have.descendants', '[data-cy=guest-row]');
    cy.get('[data-testid="addGuest"]').click();

    cy.get('[data-cy=guest-row-container]').should('have.descendants', '[data-cy=guest-row]');
    cy.contains('Nom');
    cy.contains('Age');
  });
});
