import { alternativeLogin } from "../../support/commands";

it('Plano B - new full buy', () => {
    
    cy.visit('/auth');
    alternativeLogin();
    
    cy.visit('/');
    
    cy.get('div:nth-child(2) div.style_wrapper__TqQp4 div.style_container__HQY4x div:nth-child(1) h3.product-card_name__oT90L').click();
    cy.get('#add-to-cart').click();
    cy.get('#cart-button svg').click();
    cy.get('#add-address').click();
    cy.get('#nickname').click();
    cy.get('#nickname').type('Novo endereco');
    cy.get('#zipcode').click();
    cy.get('#zipcode').type('08557-500');
    cy.get('#number').click();
    cy.get('#number').type('12');
    cy.get('#submit').click();
    cy.get('#add-phone').click();
    cy.get('#nickname').click();
    cy.get('#nickname').type('novo phone');
    cy.get('#number').click();
    cy.get('#number').type('(11) 12345-1234');
    cy.get('#submit').click();
    cy.get('#coupon-field').click();
    cy.get('#coupon-field').type('DESC10');
    cy.get('#apply-coupon').click();
    cy.get('#go-to-payment').click();
    cy.get('#add-payment').click();
    cy.get('#cancel-card-button').click();
    cy.get('#add-card').click();
    cy.get('#nickname').click();
    cy.get('#nickname').type('CARTAO 1');
    cy.get('#number').click();
    cy.get('#number').type('123456');
    cy.get('#validate').click();
    cy.get('#validate').type('12/30');
    cy.get('#cvv').click();
    cy.get('#cvv').type('123');
    cy.get('#submit').click();
    cy.get('#add-card').click();
    cy.get('#nickname').click();
    cy.get('#nickname').type('CARTAO 2');
    cy.get('#number').click();
    cy.get('#number').type('654321');
    cy.get('#cvv').click();
    cy.get('#cvv').type('321');
    cy.get('#validate').click();
    cy.get('#validate').type('12/30');
    cy.get('#submit').click();
    cy.get('#value-0').click();
    cy.get('#value-0').type('R$ 131,91');
    cy.get('#value-1').click();
    cy.get('#value-1').type('R$ 10,00');
    cy.get('#finish-payment').click();
})