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

cardNumber.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    e.target.value = value;
});

cardExpiry.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
});

cardCvv.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
});

const boletoCpf = document.getElementById('boletoCpf');
boletoCpf.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    e.target.value = value;
});

// ================= EVENTOS DE ENVIO / AÇÕES =================

document.getElementById('formCartao').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Pagamento com cartão processado com sucesso!');
});

document.getElementById('btnCopiarPix').addEventListener('click', () => {
    const inputPix = document.getElementById('pixCodigo');
    inputPix.select();
    inputPix.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(inputPix.value);
    alert('Código Pix copiado para a área de transferência!');
});

document.getElementById('btnConfirmarPix').addEventListener('click', () => {
    alert('Verificando recebimento do Pix... Seu acesso será liberado em instantes.');
});

document.getElementById('formBoleto').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Boleto gerado com sucesso! O arquivo PDF foi enviado para o seu e-mail.');
});