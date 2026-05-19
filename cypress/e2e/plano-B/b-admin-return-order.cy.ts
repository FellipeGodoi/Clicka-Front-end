import { admLogin } from "../../support/commands"

it('plano B - admin aceitando pedido de devolução completo', () => {
        cy.visit('/auth')
        admLogin()
        
        cy.visit('/refunds')
        cy.get('button.style_addButton__mmPUi').click();
        cy.get('div.absolute div:nth-child(2)').click();
        cy.get('#return-0 td:nth-child(1)').click();
        cy.get('#btn-approve').click();
        cy.get('div:nth-child(22) button:nth-child(2)').click();
        cy.get('#return-0 td:nth-child(4)').click();
        cy.get('#btn-sent').click();
        cy.get('button:nth-child(2)').click();
        cy.get('button.style_addButton__mmPUi').click();
        cy.get('div.absolute div:nth-child(4)').click();
        cy.get('#return-0 td:nth-child(3)').click();
        cy.get('#btn-approve').click();
        cy.get('button:nth-child(2)').click();
})