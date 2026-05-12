import { login } from "../support/commands"

it('Cliente pode registrar novo cartão durante pagamento', () => {
    cy.visit('/auth')
    
    login()
    
    
    
    cy.get('div.style_header__SzMoq div button.style_addButton__QmRIv').click();
    cy.get('div:nth-child(7)').click();
    cy.get('tr:nth-child(3) td:nth-child(2)').click();
    cy.get('button.buttons_base__sFI8P').click();
    cy.get('input[min="0"]').click();
    cy.get('input[min="0"]').type('1');
    cy.get('div:nth-child(3) button.buttons_base__sFI8P').click();
    cy.get('button.buttons_base__sFI8P').click();
    cy.get('div:nth-child(22)').click();
})