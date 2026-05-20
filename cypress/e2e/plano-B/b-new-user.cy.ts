import { alternativeLogin } from "../../support/commands";

it('Plano B - create new user', () => {
    cy.visit('/auth');
    cy.wait(3000);
    
    cy.get('div.login-content_tabs__m3yUE button:nth-child(2)').click();
    cy.wait(3000);
    
    cy.get('[name="nomeCompleto"]').click();
    cy.wait(3000);

    cy.get('[name="nomeCompleto"]').type('Novo usuario');
    cy.wait(3000);

    cy.get('[name="documento"]').click();
    cy.wait(3000);

    cy.get('[name="documento"]').type('123.123.333-33');
    cy.wait(3000);

    cy.get('[name="email"]').click();
    cy.wait(3000);

    cy.get('[name="email"]').type('novoUsuario@email.com');
    cy.wait(3000);

    cy.get('[name="senha"]').click();
    cy.wait(3000);

    cy.get('[name="senha"]').type('123@Abcd');
    cy.wait(3000);

    cy.get('button.absolute').click();
    cy.wait(3000);
    
    cy.get('button.button_button__h2TC_').click();
    cy.wait(3000);


    cy.visit('/auth');
    cy.wait(3000);
    
    alternativeLogin();

    

})