import { login } from "../support/commands"

const valueCard1 = ' 774.70'
const valueCard2 = '10.00'

const id = 'a0c92d17-9b76-4750-9c44-d53e1dd764eb'

const url = '/profile/order/'

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