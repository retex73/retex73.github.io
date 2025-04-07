describe("Dark Mode Toggle", () => {
  beforeEach(() => {
    cy.visit("/index.html");
  });

  it("should toggle dark mode when button is clicked", () => {
    cy.get("body").should("not.have.class", "dark-mode");
    cy.get(".dark-mode-toggle").click();
    cy.get("body").should("have.class", "dark-mode");
    cy.get(".dark-mode-toggle").click();
    cy.get("body").should("not.have.class", "dark-mode");
  });
});
