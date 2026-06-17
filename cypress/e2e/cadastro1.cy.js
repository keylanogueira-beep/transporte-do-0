describe('Cadastro - Passo 1', () => {

  beforeEach(() => {
    cy.visit('src/pages/cadastro1.html');
  });

  it('Todos os campos preenchidos corretamente', () => {
    cy.get('input[name="nome"]')
      .type('João da Silva');

    cy.get('input[name="cpf"]')
      .type('12345678900');

    cy.get('button[type="submit"]')
      .click();
  });

  it('Todos os campos vazios', () => {
    cy.get('input[name="nome"]').clear();

    cy.get('input[name="cpf"]').clear();

    cy.get('button[type="submit"]')
      .click();
  });

});