describe('Recuperação por telefone', () => {

  beforeEach(() => {
    cy.visit('src/pages/recuperacao_telefone.html');
  });

  it('Telefone preenchido corretamente', () => {
    cy.get('input[name="identificador"]')
      .type('71999999999');

    cy.get('button[type="submit"]')
      .click();
  });

  it('Telefone vazio', () => {
    cy.get('input[name="identificador"]')
      .clear();

    cy.get('button[type="submit"]')
      .click();
  });

  it('Alternar para recuperação por email', () => {
    cy.get('#btnMetodoEmail')
      .click();
  });

});