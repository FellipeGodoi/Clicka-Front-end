import { admLogin } from "../support/commands"

 it('O administrador confirma o pagamento', () => {
        cy.visit('/auth')
            
        admLogin()
        
        cy.visit('/orders')
        cy.get('button.style_addButton__mmPUi').click();
        cy.get('div.absolute div:nth-child(4)').click();
        cy.get('#order-0 td:nth-child(3)').click();
        cy.get('button:nth-child(2)').click();
        cy.get('div:nth-child(22) button:nth-child(2)').click();
 })