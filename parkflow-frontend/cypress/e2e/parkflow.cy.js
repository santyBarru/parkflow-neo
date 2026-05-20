describe('ParkFlow NEO - Pruebas de GUI', () => {
  
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Debe cargar la página de login', () => {
    cy.url().should('include', 'localhost:3000')
    cy.get('input').should('exist')
  })

  it('Debe mostrar error con credenciales incorrectas', () => {
    cy.get('input[type="text"], input[placeholder*="user"], input[name*="user"]')
      .first()
      .type('usuariofalso')
    cy.get('input[type="password"]')
      .type('clavefalsa')
    cy.get('button[type="submit"], button').last().click()
    cy.wait(2000)
    cy.get('body').should('not.contain', 'Dashboard')
  })

  it('Debe hacer login exitoso con admin', () => {
    cy.get('input[type="text"], input[placeholder*="user"], input[name*="user"]')
      .first()
      .type('admin')
    cy.get('input[type="password"]')
      .type('admin123')
    cy.get('button[type="submit"], button').last().click()
    cy.wait(3000)
    cy.url().should('not.equal', 'http://localhost:3000/')
  })

})