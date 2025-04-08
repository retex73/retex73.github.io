describe("Dark Mode Toggle", () => {
  beforeEach(() => {
    cy.visit("/index.html");
  });

  it("should toggle dark mode when button is clicked", () => {
    cy.get("html").should("not.have.class", "dark-mode");
    cy.get(".dark-mode-toggle").click();
    cy.get("html").should("have.class", "dark-mode");
    cy.get(".dark-mode-toggle").click();
    cy.get("html").should("not.have.class", "dark-mode");
  });
});
