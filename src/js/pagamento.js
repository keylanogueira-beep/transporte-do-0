// ================= LEITURA DOS PARÂMETROS DO PLANO =================
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const plano = urlParams.get("plano");
    const valor = urlParams.get("valor");

    if (plano && valor) {
        // Formata o texto do plano
        let textoPeriodo = plano === "mensal" ? "/mês" : "/ano";
        let bannerText = `Plano selecionado: ${plano} (R$ ${valor}${textoPeriodo})`;
        
        // Atualiza o banner
        const bannerPlano = document.getElementById("bannerPlano");
        if (bannerPlano) {
            bannerPlano.innerText = bannerText;
        }
    }
});

// ================= FUNÇÃO PARA PROCESSAR PAGAMENTO =================
function processarPagamento() {
    // Mostra o modal de carregamento
    const modal = document.getElementById('modalPagamento');
    if (modal) {
        modal.classList.add('ativo');
    }

    // Simula o processamento por 3 segundos
    setTimeout(() => {
        // Redireciona para DashboardV.html
        window.location.href = 'DashboardV.html';
    }, 3000);
}

// ================= INTERMUTABILIDADE DE ABAS =================
const abas = document.querySelectorAll('.aba-btn');
const conteudos = document.querySelectorAll('.conteudo-aba');

abas.forEach(aba => {
    aba.addEventListener('click', () => {
        abas.forEach(a => a.classList.remove('ativa'));
        conteudos.forEach(c => c.classList.remove('ativo'));

        aba.classList.add('ativa');
        const idAlvo = `conteudo-${aba.getAttribute('data-alvo')}`;
        document.getElementById(idAlvo).classList.add('ativo');
    });
});

// ================= MÁSCARAS E VALIDAÇÕES =================

const cardNumber = document.getElementById('cardNumber');
const cardExpiry = document.getElementById('cardExpiry');
const cardCvv = document.getElementById('cardCvv');

if (cardNumber) {
    cardNumber.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        e.target.value = value;
    });
}

if (cardExpiry) {
    cardExpiry.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });
}

if (cardCvv) {
    cardCvv.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    });
}

const boletoCpf = document.getElementById('boletoCpf');
if (boletoCpf) {
    boletoCpf.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        }
        e.target.value = value;
    });
}

// ================= EVENTOS DE ENVIO / AÇÕES =================

const formCartao = document.getElementById('formCartao');
if (formCartao) {
    formCartao.addEventListener('submit', (e) => {
        e.preventDefault();
        processarPagamento();
    });
}

const btnCopiarPix = document.getElementById('btnCopiarPix');
if (btnCopiarPix) {
    btnCopiarPix.addEventListener('click', () => {
        const inputPix = document.getElementById('pixCodigo');
        inputPix.select();
        inputPix.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(inputPix.value);
        alert('Código Pix copiado para a área de transferência!');
    });
}

const btnConfirmarPix = document.getElementById('btnConfirmarPix');
if (btnConfirmarPix) {
    btnConfirmarPix.addEventListener('click', () => {
        processarPagamento();
    });
}

const formBoleto = document.getElementById('formBoleto');
if (formBoleto) {
    formBoleto.addEventListener('submit', (e) => {
        e.preventDefault();
        processarPagamento();
    });
}

const btnFechar = document.querySelector('.btn-fechar');
if (btnFechar) {
    btnFechar.addEventListener('click', () => {
        window.location.href = 'login.html';
    });
}
