describe('Cadastro - Passo 2', () => {

  beforeEach(() => {
    cy.visit('src/pages/cadastro2.html');
  });

  it('Todos os campos preenchidos corretamente', () => {
    cy.get('input[name="telefone"]')
      .type('71999999999');

    cy.get('input[name="email"]')
      .type('teste@email.com');

    cy.get('button[type="submit"]')
      .click();
  });

  it('Todos os campos vazios', () => {
    cy.get('input[name="telefone"]').clear();

    cy.get('input[name="email"]').clear();

    cy.get('button[type="submit"]')
      .click();
  });

});