import { login } from "../support/commands"

it('Cliente pode registrar novo endereço de entrega no ato da compra', () => {

    cy.visit('/')

    // produto
    cy.contains('Teclado Gamer Basic').click()

    // add carrinho
    cy.get('#add-to-cart').click()

    // login
    login()

    // valida login
    cy.contains('Dados pessoais')

    // voltar home
    cy.visit('/')

    // add produto novamente
    cy.contains('Teclado Gamer Basic').click()

    cy.get('#add-to-cart').click()

    // carrinho
    cy.get('#cart-button').click()

    // add telefone
    cy.get('#add-phone').click()
    cy.get('#nickname').type('teste de telefone 2')
    cy.get('#number').type('11123451234')
    cy.get('#submit').click()

    // add endereço
    cy.get('#add-address').click()
    cy.get('#nickname').type('Casa para teste')
    cy.get('#zipcode').type('08673-000')
    cy.wait(4000)
    cy.get('#number').type('120')
    cy.get('#submit').click()

    // seleciona endereço criado
    cy.get('[name="address"]').last().check()

    // cupom
    cy.get('#coupon-field').type('DESC10')

    cy.get('#apply-coupon').click()

})