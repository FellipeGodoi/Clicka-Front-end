import { alternativeLogin } from "../../support/commands"
const time = 1500
it('plano B - Cliente fazendo pedido de reembolso', () => {
    cy.visit('/auth');
    cy.wait(time);
    
    alternativeLogin();
    cy.wait(time);
    
    cy.get('div.style_header__SzMoq div button.style_addButton__QmRIv').click();
    cy.wait(time);
    
    cy.get('div:nth-child(7)').click();
    cy.wait(time);
    
    
    cy.get('tr:nth-child(1) td:nth-child(1)').click();
    cy.wait(time);
    
    cy.get('button.buttons_base__sFI8P').click();
    cy.wait(time);
    cy.get('input[min="0"]').click();
    cy.wait(time);
    cy.get('input[min="0"]').type('1');
    cy.wait(time);
    cy.get('div:nth-child(3) button.buttons_base__sFI8P').click();
    cy.wait(time);
    cy.get('button.buttons_base__sFI8P').click();
    cy.wait(time);
    cy.end
})