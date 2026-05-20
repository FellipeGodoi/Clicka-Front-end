import { admLogin } from "../../support/commands"

const time = 1500

it('plano B - admin aceitando pedido de devolução completo', () => {

    cy.visit('/auth')
    cy.wait(time)

    admLogin()
    cy.wait(time)

    cy.visit('/refunds')
    cy.wait(time)

    cy.get('button.style_addButton__mmPUi').click()
    cy.wait(time)

    cy.get('div.absolute div:nth-child(2)').click()
    cy.wait(time)

    cy.get('#return-0 td:nth-child(1)').click()
    cy.wait(time)

    cy.get('#btn-approve').click()
    cy.wait(time)

    cy.get('div:nth-child(22) button:nth-child(2)').click()
    cy.wait(time)

    cy.get('#return-0 td:nth-child(4)').click()
    cy.wait(time)

    cy.get('#btn-sent').click()
    cy.wait(time)

    cy.get('button:nth-child(2)').click()
    cy.wait(time)

    cy.get('button.style_addButton__mmPUi').click()
    cy.wait(time)

    cy.get('div.absolute div:nth-child(4)').click()
    cy.wait(time)

    cy.get('#return-0 td:nth-child(3)').click()
    cy.wait(time)

    cy.get('#btn-approve').click()
    cy.wait(time)

    cy.get('button:nth-child(2)').click()
    cy.wait(time)
})