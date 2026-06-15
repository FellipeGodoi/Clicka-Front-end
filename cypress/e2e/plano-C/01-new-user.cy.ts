import { alternativeLogin } from "../../support/commands";
const timer = 1000
it('Plano B - create new user', () => {
    cy.visit('/auth');
    cy.wait(timer);
    
    cy.get('div.login-content_tabs__m3yUE button:nth-child(2)').click();
    cy.wait(timer);
    
    cy.get('[name="nomeCompleto"]').click();
    cy.wait(timer);

    cy.get('[name="nomeCompleto"]').type('Novo usuario');
    cy.wait(timer);

    cy.get('[name="documento"]').click();
    cy.wait(timer);

    cy.get('[name="documento"]').type('123.123.333-55');
    cy.wait(timer);

    cy.get('[name="email"]').click();
    cy.wait(timer);

    cy.get('[name="email"]').type('novoUsuario02@email.com');
    cy.wait(timer);

    cy.get('[name="senha"]').click();
    cy.wait(timer);

    cy.get('[name="senha"]').type('123@Abcd');
    cy.wait(timer);

    cy.get('button.absolute').click();
    cy.wait(timer);
    
    cy.get('button.button_button__h2TC_').click();
    cy.wait(timer);


    cy.visit('/auth');
    cy.wait(timer);
    
    alternativeLogin();

    

})