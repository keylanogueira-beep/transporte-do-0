describe('Tela de Login e Cadastro', () => {

  describe('Login', () => {

    beforeEach(() => {
      cy.visit('src/pages/login.html');
    });

    it('Os campos de CPF e senha deve estar preenchidos corretamente', () => {
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

    // em montagem
    it('Link de redirecionamento para pagina de esqueceu a senha e voltar para login', () => {
      cy.get('#formLogin di')
        .click();
        
    });

    it('Redirecionamento para pagina de esqueceu senha junto com o campo de email preenchido', () => {
      cy.get('#loginAvisoPremium')
        .should('be.visible');
    });

    it('Deve possuir link para recuperação de senha', () => {
      cy.get('.forgot-password a')
        .should('have.attr', 'href', 'recuperacao.html');
    });

  });

  describe('Cadastro', () => {

    beforeEach(() => {
      cy.visit('src/pages/login.html?mode=criar');
    });

    it('Deve abrir no modo cadastro', () => {
      cy.get('#formCadastro')
        .should('be.visible');

      cy.get('#formLogin')
        .should('have.class', 'hidden');
    });

    it('Deve preencher o passo 1 e avançar', () => {
      cy.get('#formCadastro input[name="nome"]')
        .type('Eduardo Silva');

      cy.get('#formCadastro input[name="cpf"]')
        .type('12345678900');

      cy.get('[data-next="2"]').click();

      cy.get('[data-step="2"]')
        .should('have.class', 'active');
    });

    it('Deve preencher o passo 2 e avançar', () => {

      cy.get('#formCadastro input[name="nome"]')
        .type('Eduardo Silva');

      cy.get('#formCadastro input[name="cpf"]')
        .type('12345678900');

      cy.get('[data-next="2"]').click();

      cy.get('#formCadastro input[name="telefone"]')
        .type('71999999999');

      cy.get('#formCadastro input[name="email"]')
        .type('eduardo@email.com');

      cy.get('[data-next="3"]').click();

      cy.get('[data-step="3"]')
        .should('have.class', 'active');
    });

    it('Deve mostrar e ocultar senha', () => {

      cy.get('#formCadastro input[name="nome"]')
        .type('Eduardo Silva');

      cy.get('#formCadastro input[name="cpf"]')
        .type('12345678900');

      cy.get('[data-next="2"]').click();

      cy.get('#formCadastro input[name="telefone"]')
        .type('71999999999');

      cy.get('#formCadastro input[name="email"]')
        .type('eduardo@email.com');

      cy.get('[data-next="3"]').click();

      cy.get('[data-step="3"] input[name="senha"]')
        .should('have.attr', 'type', 'password');

      cy.get('[data-step="3"] .password-toggle')
        .first()
        .click();

      cy.get('[data-step="3"] input[name="senha"]')
        .should('have.attr', 'type', 'text');

      cy.get('[data-step="3"] .password-toggle')
        .first()
        .click();

      cy.get('[data-step="3"] input[name="senha"]')
        .should('have.attr', 'type', 'password');
    });

    it('Deve preencher cadastro completo', () => {

      cy.get('#formCadastro input[name="nome"]')
        .type('Eduardo Silva');

      cy.get('#formCadastro input[name="cpf"]')
        .type('12345678900');

      cy.get('[data-next="2"]').click();

      cy.get('#formCadastro input[name="telefone"]')
        .type('71999999999');

      cy.get('#formCadastro input[name="email"]')
        .type('eduardo@email.com');

      cy.get('[data-next="3"]').click();

      cy.get('[data-step="3"] input[name="senha"]')
        .type('Senha123');

      cy.get('[data-step="3"] input[name="senhaConfirm"]')
        .type('Senha123');

      cy.get('#formCadastro')
        .should('exist');
    });

    it('Deve voltar para o passo anterior', () => {

      cy.get('#formCadastro input[name="nome"]')
        .type('Eduardo Silva');

      cy.get('#formCadastro input[name="cpf"]')
        .type('12345678900');

      cy.get('[data-next="2"]').click();

      cy.get('[data-prev="1"]').click();

      cy.get('[data-step="1"]')
        .should('have.class', 'active');
    });

  });

});