describe('Cadastro - Passo 3', () => {

  beforeEach(() => {
    cy.visit('src/pages/cadastro3.html');
  });

  it('Senhas iguais', () => {
    cy.get('input[name="senha"]')
      .type('123456');

    cy.get('input[name="senhaConfirm"]')
      .type('123456');

    cy.get('button[type="submit"]')
      .click();
  });

  it('Senhas diferentes', () => {
    cy.get('input[name="senha"]')
      .type('123456');

    cy.get('input[name="senhaConfirm"]')
      .type('654321');

    cy.get('button[type="submit"]')
      .click();
  });

});