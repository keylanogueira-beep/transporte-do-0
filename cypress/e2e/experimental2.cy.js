describe('TransCamaçari - Página Inicial', () => {

  beforeEach(() => {
    cy.visit('../../src/pages/index.html')
  })

  // BOTÕES
  describe('Botões', () => {
    it('botão "Entrar" está visível', () => {
      cy.get('#btnEntrarHome').should('be.visible')
    })

    it('botão "Acessar Rotas Privadas" está visível', () => {
      cy.get('#btnAcessarRotas').should('be.visible')
    })

    it('botão "Acessar Rotas Privadas" abre o modal de planos', () => {
      cy.get('#btnAcessarRotas').click()
      cy.get('#modalPlanos').should('be.visible')
    })

    it('botão de fechar o modal de login funciona', () => {
      cy.get('#modalLogin').invoke('css', 'display', 'flex')
      cy.get('#modalLogin').should('be.visible')
      cy.get('#modalLogin .modal-close-dark').click()
      cy.get('#modalLogin').should('not.be.visible')
    })

    it('botão "Buscar" linhas está visível', () => {
      cy.get('.search-section').first().find('.btn-search').should('be.visible')
    })

    it('botão "Buscar" rotas privadas está visível', () => {
      cy.get('#buscarRotasPrivadas .btn-search').should('be.visible')
    })
  })

  // BARRA DE PESQUISA
  describe('Barra de Pesquisa', () => {
    it('campo de busca por bairro está visível', () => {
      cy.get('#inputBairro').should('be.visible')
    })

    it('aceita digitação no campo de bairro', () => {
      cy.get('#inputBairro').type('Centro').should('have.value', 'Centro')
    })

    it('aciona busca ao pressionar Enter', () => {
      cy.get('#inputBairro').type('Centro{enter}')
    })

    it('aciona busca ao clicar no botão', () => {
      cy.get('#inputBairro').type('Gleba A')
      cy.get('.search-section').first().find('.btn-search').click()
    })
  })

  // CAMPOS DE PREENCHIMENTO
  describe('Campos de Preenchimento', () => {
    it('campo de CPF está visível', () => {
      cy.get('#inputCpf').should('be.visible')
    })

    it('aceita digitação no campo de CPF', () => {
      cy.get('#inputCpf').type('123.456.789-00').should('have.value', '123.456.789-00')
    })

    it('campo de e-mail do login existe', () => {
      cy.get('#entrarEmail').should('exist')
    })

    it('campo de senha do login existe', () => {
      cy.get('#entrarSenha').should('exist')
    })

    it('campo de e-mail aceita digitação', () => {
      cy.get('#modalLogin').invoke('css', 'display', 'flex')
      cy.get('#modalLogin').should('be.visible')
      cy.get('#entrarEmail').type('teste@email.com').should('have.value', 'teste@email.com')
    })

    it('campo de senha aceita digitação', () => {
      cy.get('#modalLogin').invoke('css', 'display', 'flex')
      cy.get('#modalLogin').should('be.visible')
      cy.get('#entrarSenha').type('senha123').should('have.value', 'senha123')
    })

    it('campos de criar conta existem (nome, cpf, email, senha)', () => {
      cy.get('#modalLogin').invoke('css', 'display', 'flex')
      cy.get('#modalLogin').should('be.visible')
      cy.get('#tabCriar').click()
      cy.get('#criarNome').should('be.visible')
      cy.get('#criarCpf').should('be.visible')
      cy.get('#criarEmail').should('be.visible')
      cy.get('#criarSenha').should('be.visible')
    })

    it('campo de e-mail da recuperação de senha existe', () => {
      cy.get('#modalLogin').invoke('css', 'display', 'flex')
      cy.get('#modalLogin').should('be.visible')
      cy.get('#formEntrar .link-esqueceu').should('be.visible').click()
      cy.get('#recEmail').should('be.visible')
    })
  })

})