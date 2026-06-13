describe('Tela de entrar', () => {

    beforeEach(() => {
      cy.visit('src/pages/recuperacao.html');
    });

    it('Os campos de email e telefone deve estar preenchidos corretamente', () => {
      cy.get('#formRecuperacao input[name="identificador"]')
        .type('usuario@email.com')

      cy.get('#formRecuperacao input[name="senha"]')
        .type('123456')
      
      cy.get('#formRecuperacao button[type="submit"]')
        .click();
    });

     it('Os campos de email e telefone não estão preenchidos', () => {
      cy.get('#formRecuperacao input[name="identificador"]')
        .clear()

      cy.get('#formRecuperacao input[name="senha"]')
        .clear()
      
      cy.get('#formRecuperacao button[type="submit"]')
        .click();
    });
  });