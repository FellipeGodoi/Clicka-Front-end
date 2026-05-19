import { alternativeLogin } from "../../support/commands"

it('plano B - Cliente fazendo pedido de reembolso', () => {
    cy.visit('/auth')
    alternativeLogin()
    
    cy.get('div.style_header__SzMoq div button.style_addButton__QmRIv').click();
    cy.get('div:nth-child(7)').click();
    cy.get('td:nth-child(1)').click();
    cy.get('button.buttons_base__sFI8P').click();
    cy.get('input[min="0"]').click();
    cy.get('div:nth-child(3) button.buttons_base__sFI8P').click();
})