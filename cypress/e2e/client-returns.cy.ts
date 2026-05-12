import { login } from "../support/commands"

 it('deve gerar um pedido de devolução', () => {
        cy.visit('/auth')
            
        login()
        cy.get('div.style_header__SzMoq div button.style_addButton__QmRIv').click();
        cy.get('div:nth-child(7)').click();
 })