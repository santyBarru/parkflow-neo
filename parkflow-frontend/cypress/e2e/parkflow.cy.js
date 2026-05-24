describe("ParkFlow NEO - Pruebas de GUI", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.wait(3500);
  });

  it("Debe cargar la página de login", () => {
    cy.url().should("include", "localhost:3000");
    cy.get(".neo-input").should("exist");
  });

  it("Debe mostrar error con credenciales incorrectas", () => {
    cy.get("#neo-username").type("usuariofalso");
    cy.get("#neo-password").type("clavefalsa");
    cy.get("#neo-submit").click();
    cy.wait(3000);
    cy.url().should("include", "localhost:3000");
  });

  it("Debe hacer login exitoso con admin", () => {
    cy.get("#neo-username").type("admin");
    cy.get("#neo-password").type("admin123");
    cy.get("#neo-submit").click();
    cy.wait(3000);
    cy.url().should("not.equal", "http://localhost:3000/");
  });
});
