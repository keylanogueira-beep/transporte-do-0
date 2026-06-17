describe('Recuperação por email', () => {

  beforeEach(() => {
    cy.visit('src/pages/recuperacao_email.html');
  });

  it('Email preenchido corretamente', () => {
    cy.get('input[name="identificador"]')
      .type('teste@email.com');

    cy.get('button[type="submit"]')
      .click();
  });

  it('Email vazio', () => {
    cy.get('input[name="identificador"]')
      .clear();

    cy.get('button[type="submit"]')
      .click();
  });

  it('Alternar para recuperação por telefone', () => {
    cy.get('#btnMetodoTelefone')
      .click();
  });

});