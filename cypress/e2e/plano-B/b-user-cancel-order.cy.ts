import { alternativeLogin } from "../../support/commands"

it('plano B - usuario cancelando pedido de compra', () => {
        
        cy.visit('/auth')
        
        alternativeLogin()
        
        cy.visit('/')
        cy.get('img[alt="Mouse Gamer Basic"]').click();
        cy.get('#add-to-cart').click();
        cy.get('#cart-button svg').click();
        cy.get('#go-to-payment').click();
        cy.get('#add-payment').click();
        cy.get('#select-card-0 p:nth-child(2)').click();
        cy.get('#select-card-0 input').check();
        cy.get('#confirm-card-button').click();
        cy.get('#finish-payment').click();
        cy.get('button.buttons_base__sFI8P').click();
        cy.get('div:nth-child(1) div:nth-child(1) div button:nth-child(2)').click();
        cy.get('#profile-button svg').click();
        cy.get('div.style_grid__mHd5v').click();
})