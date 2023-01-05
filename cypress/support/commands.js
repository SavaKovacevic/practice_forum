// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
    cy.visit('https://forum.benchmark.rs/')
    cy.get('.p-navgroup-link--logIn').eq(0).click()
    cy.get('[name="login"]').type(username, {delay: 0})
    cy.get('[name="password"]').type(password, {delay: 0})
    cy.get('.button--icon--login').click()
    cy.url().should('contain', 'https://forum.benchmark.rs/')
  })