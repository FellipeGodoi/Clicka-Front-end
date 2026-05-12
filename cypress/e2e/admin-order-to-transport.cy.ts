import { admLogin } from "../support/commands"

 it('O administrador define que o produto está EM TRANSPORTE', () => {
        cy.visit('/auth')
            
        admLogin()
        
        cy.visit('/orders')
        
        cy.get('button.style_addButton__mmPUi').click();
        cy.get('div.absolute div:nth-child(5)').click();
        cy.get('#order-0 td:nth-child(4)').click();
        cy.get('button.buttons_base__sFI8P').click();
        cy.get('div:nth-child(22) button:nth-child(2)').click();
        cy.get('button.style_addButton__mmPUi').click();
        cy.get('div:nth-child(6)').click();
        
        
        cy.get('#order-0 td:nth-child(3)').click();
        cy.get('button.buttons_base__sFI8P').click();
        cy.get('div:nth-child(22) button:nth-child(2)').click();
        cy.get('div.h-full').click();
        cy.get('button.style_addButton__mmPUi').click();
        cy.get('div:nth-child(7)').click();
 })