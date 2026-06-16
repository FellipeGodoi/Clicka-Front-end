import { admLogin } from "../../support/commands"

const time = 1500

it('plano b - Admin aceitando todas as etapas da entrega', () => {
    
    cy.visit('/auth')
    cy.wait(time)
    
    admLogin()
    cy.wait(time)
    
    cy.visit('/orders')
    cy.wait(time)
    
    cy.get('input.text-input_input__Kcqqy').click()
    cy.wait(time)
    
    cy.get('input.text-input_input__Kcqqy').type('123')
    cy.wait(time)
    
    cy.get('#order-0 td:nth-child(3)').click()
    cy.wait(time)
    
    cy.get('button:nth-child(2)').click()
    cy.wait(time)
    
    cy.get('div:nth-child(22) button:nth-child(2)').click()
    cy.wait(time)
    
    cy.get('button.style_addButton__mmPUi').click()
    cy.wait(time)
    
    cy.get('div.absolute div:nth-child(5)').click()
    cy.wait(time)
    
    cy.get('#order-0 td:nth-child(1)').click()
    cy.wait(time)
    
    cy.get('button.buttons_base__sFI8P').click()
    cy.wait(time)
    
    cy.get('div:nth-child(22) button:nth-child(2)').click()
    cy.wait(time)
    
    cy.get('button.style_addButton__mmPUi').click()
    cy.wait(time)
    
    cy.get('div:nth-child(6)').click()
    cy.wait(time)
    
    cy.get('#order-0 td:nth-child(3)').click()
    cy.wait(time)
    
    cy.get('button.buttons_base__sFI8P').click()
    cy.wait(time)
    
    cy.get('div:nth-child(22) button:nth-child(2)').click()
    cy.wait(time)
    
    cy.get('button.style_addButton__mmPUi').click()
    cy.wait(time)
    
    cy.get('div:nth-child(7)').click()
    cy.wait(time)
    
    cy.get('input.text-input_input__Kcqqy').type('123')
    cy.wait(time)
    
    cy.get('#order-0 td:nth-child(4)').click()
    cy.wait(time)
})