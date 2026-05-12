import { admLogin } from "../support/commands"

 it('O administrador aceitar ou negar a troca / devolução;', () => {
        cy.visit('/auth')
            
        admLogin()
        
        cy.visit('/refunds')
        cy.wait(4000)
        
        cy.get('button.style_addButton__mmPUi').click();
        cy.get('div.absolute div:nth-child(2)').click();
        cy.get('#return-0 td:nth-child(3)').click();
        cy.get('#btn-approve').click();
        cy.get('div:nth-child(22) button:nth-child(2)').click();
        cy.get('#return-0 td:nth-child(2)').click();
        cy.get('#btn-sent').click();
        cy.get('button:nth-child(2)').click();
        cy.get('#return-0 td:nth-child(4)').click();
        cy.get('#btn-approve').click();
        cy.get('button:nth-child(2)').click();
        cy.get('#return-0 td:nth-child(3)').click();
 })