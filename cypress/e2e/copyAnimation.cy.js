describe("Copy Animation", () => {
  beforeEach(() => {
    cy.visit("/index.html");
  });

  it("should show copy message when email is clicked", () => {
    cy.get("#email-link").click();
    cy.get(".copy-message")
      .should("be.visible")
      .and("contain", "Email copied!");
  });

  it("should show copy message when phone is clicked", () => {
    cy.get("#phone-link").click();
    cy.get(".copy-message")
      .should("be.visible")
      .and("contain", "Phone number copied!");
  });
});
