/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

 export function login() {
    cy.get('[name="email"]').type('user@clicka.com')
    cy.get('[name="password"]').type('123456')
    cy.get('button[type="submit"]').click()
  }

   export function admLogin() {
    cy.get('[name="email"]').type('admin@clicka.com')
    cy.get('[name="password"]').type('123456')
    cy.get('button[type="submit"]').click()
  }

    export function alternativeLogin() {
    cy.get('[name="email"]').type('novoUsuario@email.com')
    cy.get('[name="password"]').type('123@Abcd')
    cy.get('button[type="submit"]').click()
  }

      export function alternativeLogin02() {
    cy.get('[name="email"]').type('novoUsuarioA@email.com')
    cy.get('[name="password"]').type('123@Abcd')
    cy.get('button[type="submit"]').click()
  }

  export function randomName(prefix: string) {
    const random = Math.floor(Math.random() * 100000)

    return `${prefix}-${random}`
}