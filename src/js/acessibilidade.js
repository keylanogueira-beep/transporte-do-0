// 1. INICIALIZAÇÃO DO VLIBRAS
function inicializarVLibras() {
    // Cria o elemento container exigido pelo VLibras
    const vlibrasDiv = document.createElement('div');
    vlibrasDiv.setAttribute('vw', '');
    vlibrasDiv.classList.add('enabled');

    vlibrasDiv.innerHTML = `
        <div vw-access-button class="active"></div>
        <div vw-plugin-wrapper>
            <div class="vw-plugin-top-wrapper"></div>
        </div>
    `;
    document.body.appendChild(vlibrasDiv);

    // Carrega o script oficial do VLibras dinamicamente
    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.onload = () => {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
    };
    document.head.appendChild(script);
}

// 2. FUNÇÕES ADICIONAIS DE ACESSIBILIDADE (Opcional, mas recomendado)
let tamanhoAtual = 100; // em porcentagem

function alterarFonte(acao) {
    if (acao === 'aumentar' && tamanhoAtual < 130) {
        tamanhoAtual += 10;
    } else if (acao === 'diminuir' && tamanhoAtual > 90) {
        tamanhoAtual -= 10;
    } else if (acao === 'resetar') {
        tamanhoAtual = 100;
    }
    document.documentElement.style.fontSize = `${tamanhoAtual}%`;
}

// Executa assim que a página terminar de carregar
window.addEventListener('DOMContentLoaded', () => {
    inicializarVLibras();
});