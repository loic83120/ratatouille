describe("Add some guests to the table", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the title", () => {
    cy.contains("h5", "Invités").should("exist");
  });

  it("should add some new guests then remove one of them", () => {
    cy.get("[data-cy=guests]").should("exist");
    cy.findAllByTestId("guest-row").should("have.length", 0);

    cy.get("[data-cy=add-guest]").click();
    cy.findAllByTestId("guest-row").should("have.length", 1);

    cy.get('[data-cy="add-guest"]').click();
    cy.findAllByTestId("guest-row").should("have.length", 2);

    cy.get('[data-cy="remove-guest"]').first().click();
    cy.findAllByTestId("guest-row").should("have.length", 1);
  });
});
