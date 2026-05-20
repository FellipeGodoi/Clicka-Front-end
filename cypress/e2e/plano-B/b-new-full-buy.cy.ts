import { alternativeLogin, randomName } from "../../support/commands";

const time = 1500

const log = () => {
    return (alternativeLogin())
}

it('Plano B - new full buy', () => {

    cy.visit('/auth');
    cy.wait(time);

    log();
    cy.wait(time);

    cy.visit('/');
    cy.wait(time);

    cy.get('div:nth-child(2) div.style_wrapper__TqQp4 div.style_container__HQY4x div:nth-child(1) h3.product-card_name__oT90L').click();
    cy.wait(time);

    cy.get('#add-to-cart').click();
    cy.wait(time);

    cy.get('#cart-button svg').click();
    cy.wait(time);

    cy.get('#add-address').click();
    cy.wait(time);

    cy.get('#nickname').click();
    cy.wait(time);

    cy.get('#nickname').type(randomName('endereco'));
    cy.wait(time);

    cy.get('#zipcode').click();
    cy.wait(time);

    cy.get('#zipcode').type('08557-500');
    cy.wait(time);

    cy.get('#number').click();
    cy.wait(time);

    cy.get('#number').type('12');
    cy.wait(time);

    cy.get('#submit').click();
    cy.wait(time);

    cy.get('#add-phone').click();
    cy.wait(time);

    cy.get('#nickname').click();
    cy.wait(time);

    cy.get('#nickname').type(randomName('phone'));
    cy.wait(time);

    cy.get('#number').click();
    cy.wait(time);

    cy.get('#number').type('(11) 12345-1234');
    cy.wait(time);

    cy.get('#submit').click();
    cy.wait(time);

    cy.get('#coupon-field').click();
    cy.wait(time);

    cy.get('#coupon-field').type('DESC10');
    cy.wait(time);

    cy.get('#apply-coupon').click();
    cy.wait(time);

    cy.get('#go-to-payment').click();
    cy.wait(time);

    cy.get('#add-payment').click();
    cy.wait(time);

    cy.get('#cancel-card-button').click();
    cy.wait(time);

    cy.get('#add-card').click();
    cy.wait(time);

    cy.get('#nickname').click();
    cy.wait(time);

    cy.get('#nickname').type(randomName('cartao'));
    cy.wait(time);

    cy.get('#number').click();
    cy.wait(time);

    cy.get('#number').type('123456');
    cy.wait(time);

    cy.get('#validate').click();
    cy.wait(time);

    cy.get('#validate').type('12/30');
    cy.wait(time);

    cy.get('#cvv').click();
    cy.wait(time);

    cy.get('#cvv').type('123');
    cy.wait(time);

    cy.get('#submit').click();
    cy.wait(time);

    cy.get('#add-card').click();
    cy.wait(time);

    cy.get('#nickname').click();
    cy.wait(time);

    cy.get('#nickname').type(randomName('cartao'));
    cy.wait(time);

    cy.get('#number').click();
    cy.wait(time);

    cy.get('#number').type('654321');
    cy.wait(time);

    cy.get('#cvv').click();
    cy.wait(time);

    cy.get('#cvv').type('321');
    cy.wait(time);

    cy.get('#validate').click();
    cy.wait(time);

    cy.get('#validate').type('12/30');
    cy.wait(time);

    cy.get('#submit').click();
    cy.wait(time);

    cy.get('#value-0').click();
    cy.wait(time);

    cy.get('#value-0').type('R$ 131,91');
    cy.wait(time);

    cy.get('#value-1').click();
    cy.wait(time);

    cy.get('#value-1').type('R$ 10,00');
    cy.wait(time);

    cy.get('#finish-payment').click();
    cy.wait(time);
})