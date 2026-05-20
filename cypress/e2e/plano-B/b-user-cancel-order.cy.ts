import { alternativeLogin } from "../../support/commands"

const time = 1500
it('plano B - usuario cancelando pedido de compra', () => {
        
        cy.visit('/auth');
        cy.wait(time);
        alternativeLogin();
        cy.wait(time);
        
        cy.visit('/');
        cy.wait(time);

        cy.get('img[alt="Mouse Gamer Basic"]').click();
        cy.wait(time);

        cy.get('#add-to-cart').click();
        cy.wait(time);

        cy.get('#cart-button svg').click();
        cy.wait(time);

        cy.get('#go-to-payment').click();
        cy.wait(time);

        cy.get('#add-payment').click();
        cy.wait(time);

        cy.get('#select-card-0 p:nth-child(2)').click();
        cy.wait(time);

        cy.get('#select-card-0 input').check();
        cy.wait(time);

        cy.get('#confirm-card-button').click();
        cy.wait(time);

        cy.get('#finish-payment').click();
        cy.wait(time);

        cy.get('button.buttons_base__sFI8P').click();
        cy.wait(time);

        cy.get('div:nth-child(1) div:nth-child(1) div button:nth-child(2)').click();
        cy.wait(time);

        cy.get('#profile-button svg').click();
        cy.wait(time);

        cy.get('div.style_grid__mHd5v').click();
        cy.wait(time);
        cy.end()
})