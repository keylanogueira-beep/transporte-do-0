//

describe('TransCamaçari - Painel de Rotas Privadas', () => {

   
    beforeEach(() => {
        
        cy.visit('../../src/pages/DashboardV.html') 
    })

    context('Interface Inicial', () => {
        it('Deve exibir o cabeçalho e as informações da empresa corretamente', () => {
            
            cy.title().should('eq', 'TransCamaçari - Rotas Privadas')

            
            cy.get('.nav-logo-text strong').should('contain', 'TransCamaçari')
  
            cy.get('.empresa-handle').should('have.text', 'LinkaTech')
        })

        it('Deve verificar se a aba "Usuários Autorizados" inicia ativa', () => {
            cy.get('#tabUsuarios').should('have.class', 'active')
            cy.get('#painelUsuarios').should('be.visible')
            cy.get('#painelVeiculos').should('not.be.visible')
        })
    })

    // --- BLOCO 2: ALTERNÂNCIA DE ABAS (TABS) ---
    context('Navegação entre Abas', () => {
        it('Deve alternar corretamente para a aba de Veículos e voltar', () => {
            // Clica na aba Veículos
            cy.get('#tabVeiculos').click()

            // Valida as mudanças visuais na tela
            cy.get('#tabVeiculos').should('have.class', 'active')
            cy.get('#tabUsuarios').should('not.have.class', 'active')
            
            cy.get('#painelVeiculos').should('be.visible')
            cy.get('#painelUsuarios').should('not.be.visible')
        })
    })

    // --- BLOCO 3: FLUXO DO MODAL DE USUÁRIOS ---
    context('Modal - Adicionar Usuário', () => {
        it('Deve abrir, preencher o formulário de usuário e fechar o modal', () => {
            // 1. Abre o modal
            cy.get('#painelUsuarios').contains('Adicionar Usuário').click()
            cy.get('#modalAdicionarUsuario').should('be.visible')

            // 2. Preenche os campos do formulário
            cy.get('#addNome').type('Diego Cavalcante')
            cy.get('#addCpf').type('123.456.789-00')
            cy.get('#addTelefone').type('(71) 98888-7777')
            cy.get('#addExpiracao').type('31/12/2026')

            // 3. Clica em Cancelar para fechar (evitando disparar o submit real neste teste)
            cy.get('#modalAdicionarUsuario').contains('Cancelar').click()
            
            // 4. Garante que o modal sumiu da tela
            cy.get('#modalAdicionarUsuario').should('not.be.visible')
        })
    })

    // --- BLOCO 4: FLUXO DO MODAL DE VEÍCULOS ---
    context('Modal - Adicionar Veículo', () => {
        it('Deve abrir o modal de veículos e validar a presença dos campos obrigatórios', () => {
            // 1. Vai para a aba de veículos
            cy.get('#tabVeiculos').click()

            // 2. Abre o modal de adicionar veículo
            cy.get('#painelVeiculos').contains('Adicionar Veículo').click()
            cy.get('#modalAdicionarVeiculo').should('be.visible')

            // 3. Testa o preenchimento dos inputs de identificação
            cy.get('#addNomeVeiculo').type('Ônibus Rota 05 - Polo')
            cy.get('#addPlacaVeiculo').type('NZN-5A21')

            // 4. Verifica se os botões do mapa e a imagem do mapa estão visíveis
            cy.get('.map-actions-row').should('be.visible')
            cy.get('.mock-map-img').should('be.visible')

            // 5. Clica no botão de fechar (o "X" do topo do modal)
            cy.get('#modalAdicionarVeiculo .modal-close-dark').click()
            cy.get('#modalAdicionarVeiculo').should('not.be.visible')
        })
    })
})