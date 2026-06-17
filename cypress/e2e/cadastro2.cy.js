describe('Cadastro - Passo 2', () => {

  beforeEach(() => {
    cy.visit('src/pages/cadastro2.html');
  });

  it('Telefone e email preenchidos corretamente', () => {
    cy.get('input[name="telefone"]')
      .type('71999999999');

    cy.get('input[name="email"]')
      .type('teste@email.com');

    cy.get('button[type="submit"]')
      .click();
  });

  it('Telefone e email vazios', () => {
    cy.get('input[name="telefone"]').clear();

    cy.get('input[name="email"]').clear();

    cy.get('button[type="submit"]')
      .click();
  });

});