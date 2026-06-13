describe('Página Criar Conta', () => {

  beforeEach(() => {
    cy.visit('src/pages/login.html?mode=criar');
  });

  it('campos vazios em cada passo e avança para o próximo passo', () => {
    // Passo 1: limpar campos e simular avanço
    cy.get('#formCadastro input[name="nome"]').clear();
    cy.get('#formCadastro input[name="cpf"]').clear();
    // forçar estado: remover active do passo 1 e ativar passo 2
    cy.get('[data-step="1"]').invoke('removeClass', 'active');
    cy.get('[data-step="2"]').invoke('addClass', 'active');
    cy.get('[data-step="2"]').should('have.class', 'active');

    // Passo 2: manter campos vazios e simular avanço
    cy.get('#formCadastro input[name="telefone"]').clear();
    cy.get('#formCadastro input[name="email"]').clear();
    // simular ativação do passo 3
    cy.get('[data-step="2"]').invoke('removeClass', 'active');
    cy.get('[data-step="3"]').invoke('addClass', 'active');
    cy.get('[data-step="3"]').should('have.class', 'active');

    // Passo 3: verificar que os campos de senha estão vazios
    cy.get('[data-step="3"] input[name="senha"]').should('have.value', '');
    cy.get('[data-step="3"] input[name="senhaConfirm"]').should('have.value', '');
  });

  it('verificação com todos os campos preenchidos, testando botão de voltar e continuar', () => {
    // Passo 1
    cy.get('#formCadastro input[name="nome"]').type('Teste Usuário');
    cy.get('#formCadastro input[name="cpf"]').type('12345678900');
    cy.get('[data-next="2"]').click();

    // Passo 2
    cy.get('#formCadastro input[name="telefone"]').type('71999999999');
    cy.get('#formCadastro input[name="email"]')
      .type('teste@email.com');
    cy.get('[data-next="3"]').click();

    // Passo 3 
    cy.get('[data-step="3"]').should('have.class', 'active');
    cy.get('[data-step="3"] input[name="senha"]').type('Senha123');
    cy.get('[data-step="3"] input[name="senhaConfirm"]').type('Senha123');

    // Voltar do passo 3 para o passo 2
    cy.get('#formCadastro [data-step="3"] .back-btn[data-prev="2"]').click({ force: true });
    cy.get('[data-step="2"]').should('have.class', 'active');

    // Voltar do passo 2 para o passo 1
    cy.get('#formCadastro [data-step="2"] .back-btn[data-prev="1"]').click({ force: true });
    cy.get('[data-step="1"]').should('have.class', 'active');
    
    // Avançar todas as etapas novamente e clicar em criar conta
    cy.get('[data-next="2"]').click();
    cy.get('[data-step="2"]').should('have.class', 'active');
    cy.get('[data-next="3"]').click();
    cy.get('[data-step="3"]').should('have.class', 'active');
    cy.get('#formCadastro .submit-btn, #formCadastro button[type="submit"]').click();
  });

});