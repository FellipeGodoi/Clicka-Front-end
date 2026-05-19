import { alternativeLogin } from "../../support/commands";

it('Plano B - create new user', () => {
    cy.visit('/auth')
    
    cy.get('div.login-content_tabs__m3yUE button:nth-child(2)').click();
    cy.get('[name="nomeCompleto"]').click();
    cy.get('[name="nomeCompleto"]').type('Novo usuario');
    cy.get('[name="documento"]').click();
    cy.get('[name="documento"]').type('123.123.333-33');
    cy.get('[name="email"]').click();
    cy.get('[name="email"]').type('novoUsuario@email.com');
    cy.get('[name="senha"]').click();
    cy.get('[name="senha"]').type('123@Abcd');
    cy.get('button.absolute').click();
    
    cy.get('button.button_button__h2TC_').click();


    cy.visit('/auth');
    alternativeLogin();

    

})