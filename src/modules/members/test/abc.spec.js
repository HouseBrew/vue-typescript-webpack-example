const getStore = () => cy.window().its('app').its('$store')

context('TDD illustration', () => {
  beforeEach(() => {
    cy.server()
    cy.route('POST', '/api/submit', 'fixture:submit.json').as('submit')
  })
  beforeEach(() => {
    cy.visit('/')
  })

  it('should have h1 title', () => {
    cy.get('h1.title')
      .should('have.text', 'vueJS is AwesomE!!')
  })

  it('should have username input', () => {
    cy.get('.username')
      .should('be.visible')
  })

  it('should have password input', () => {
    cy.get('.password')
      .should('be.visible')
      .should('have.attr', 'type', 'password')
  })

  it('should have submit button', () => {
    cy.get('.username').type('hochiho')
    cy.get('.password').type('123456')
    cy.get('.submit')
      .click()
      .wait('@submit')
    cy.get('.result')
      .should('have.class', 'success')
      .and('contain', 'successful!')
    cy.get('.username').should('have.value', '')
    cy.get('.password').should('have.value', '')
  })
})
