describe('Tela de entrar', () => {

    beforeEach(() => {
      cy.visit('src/pages/login.html');
    });

    it('Todos os campos preenchidos corretamente', () => {
      cy.get('#formLogin input[name="cpf"]')
        .type('12345678900')

      cy.get('#formLogin input[name="senha"]')
        .type('123456')
      
      cy.get('#formLogin button[type="submit"]')
        .click();
    });

     it('Os campos de CPF e senha não estão preenchidos', () => {
      cy.get('#formLogin input[name="cpf"]')
        .clear()

      cy.get('#formLogin input[name="senha"]')
        .clear()
      
      cy.get('#formLogin button[type="submit"]')
        .click();
    });
  });
