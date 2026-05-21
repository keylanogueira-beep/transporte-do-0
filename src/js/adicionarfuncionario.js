// Capturando os elementos
const modal = document.getElementById('modalOverlay');
const btnAbrir = document.getElementById('btnAbrirModal');
const btnFecharX = document.getElementById('btnFecharX');
const btnCancelar = document.getElementById('btnCancelar');
const formUsuario = document.getElementById('formUsuario');

// Funções para abrir e fechar
btnAbrir.addEventListener('click', () => {
    modal.style.display = 'flex';
});

const fecharModal = () => {
    modal.style.display = 'none';
    formUsuario.reset(); // Limpa o formulário ao fechar
};

btnFecharX.addEventListener('click', fecharModal);
btnCancelar.addEventListener('click', fecharModal);

// Fechar se clicar fora do card branco
window.addEventListener('click', (e) => {
    if (e.target === modal) fecharModal();
});

// Ação de Salvar (O navegador cuida da mensagem "Preencha este campo")
formUsuario.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    // Se chegou aqui, a validação do HTML passou!
    const dados = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        tel: document.getElementById('telefone').value,
        expiracao: document.getElementById('expiracao').value
    };

    console.log("Dados salvos com sucesso no sistema TremCamaçari:", dados);
    alert("Usuário " + dados.nome + " adicionado!");
    
    fecharModal();
});