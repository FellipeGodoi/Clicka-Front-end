const valueCard1 = ' 774.70'
const valueCard2 = '10.00'

const id = '1db20754-1415-4af5-8f81-1e12a596c10a'

const url = '/profile/order/'

  function login() {
    cy.get('[name="email"]').type('user@clicka.com')
    cy.get('[name="password"]').type('123456')
    cy.get('button[type="submit"]').click()
  }

it('Deve realizar o pagamento', () => {
    //home
    cy.visit('/')

    //clique no icone profile 
    cy.get('#profile-button').click()

    login()
    cy.contains('Dados pessoais')

    cy.get('#order-button-' + id).click()
    cy.contains('Status: Aguardando pagamento')

    //adicionar pagamento
    cy.get('#add-payment').click()

    //seleciona cartao
    cy.get('#select-card-0').click()
    cy.get('#select-card-1').click()
    
    cy.get('#confirm-card-button').click()


    //adiciona o valor
    cy.get('#value-0').click().type(valueCard1)
    cy.get('#value-1').click().type(valueCard2)

    //finalizar
    cy.get('#finish-payment').click()
    cy.contains('Status: Aguardando aprovação')
    cy.end()
})