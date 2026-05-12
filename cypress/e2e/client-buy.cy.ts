
describe('Criar um pedido de compra', () => {

  function login() {
    cy.get('[name="email"]').type('user@clicka.com')
    cy.get('[name="password"]').type('123456')
    cy.get('button[type="submit"]').click()
  }

  it('deve gerar um pedido', () => {
    cy.visit('/')

    // produto
    cy.contains('Teclado Gamer Basic').click()

    // add carrinho
    cy.get('#add-to-cart').click()

    // login
    login()

    // valida que logou 
    cy.contains('Dados pessoais') 

    // voltar home
    cy.visit('/')

    // adicionar de novo
    cy.contains('Teclado Gamer Basic').click()
    cy.get('#add-to-cart').click()

    // carrinho
    cy.get('#cart-button').click()

    // endereço
    cy.get('[name="address"]').last().check()

    // cupom
    cy.get('#coupon-field').click().type('DESC10')
    cy.get('#apply-coupon').click()

    // continuar
    cy.get('#go-to-payment').click()
    cy.contains('Status: Aguardando pagamento') 
    cy.end()
  })
})