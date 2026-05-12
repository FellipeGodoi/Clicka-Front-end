import { login } from "../support/commands"

const id = '33a6b5d3-55ce-4fee-9cd0-497e4f5635b8'

it('Cliente pode registrar novo cartão durante pagamento', () => {
    cy.visit('/auth')

    login()

    cy.get('#order-button-' + id).click()
    cy.contains('Status: Aguardando pagamento')

    cy.get('#add-card').click()

    cy.get('#nickname').type('teste13')
    cy.get('#number').type('123456')
    cy.get('#validate').type('12/30')
    cy.get('#cvv').type('333')

    cy.get('#submit').click()

    cy.get('#finish-payment').click()
    cy.contains('Status: Aguardando aprovação')

})