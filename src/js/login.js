const btnEntrar = document.getElementById("btnEntrar");
const btnCriar = document.getElementById("btnCriar");

const formLogin = document.getElementById("formLogin");
const formCadastro = document.getElementById("formCadastro");

btnEntrar.addEventListener("click", () => {

    formLogin.classList.remove("hidden");
    formCadastro.classList.add("hidden");

    btnEntrar.classList.add("active");
    btnCriar.classList.remove("active");

});

btnCriar.addEventListener("click", () => {

    formCadastro.classList.remove("hidden");
    formLogin.classList.add("hidden");

    btnCriar.classList.add("active");
    btnEntrar.classList.remove("active");

});

// Validação de Campos - Formulário de Cadastro
const inputNome = document.querySelector("#formCadastro input[name='nome']");
const inputCPF = document.querySelector("#formCadastro input[name='cpf']");
const inputLoginCPF = document.querySelector("#formLogin input[name='cpf']");

const formatCPF = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    return digits
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
};

const urlParams = new URLSearchParams(window.location.search);
const selectedPlan = urlParams.get('plano');
const selectedValor = urlParams.get('valor');
const planBadgeStrong = document.querySelector('.plan-badge strong');

if (selectedPlan && selectedValor && planBadgeStrong) {
    const textoPeriodo = selectedPlan === 'mensal' ? '/mês' : selectedPlan === 'anual' ? '/ano' : '';
    planBadgeStrong.textContent = `${selectedPlan} (R$ ${selectedValor}${textoPeriodo})`;
}

function redirectAfterAuth() {
    if (selectedPlan && selectedValor) {
        window.location.href = `pagamento.html?plano=${encodeURIComponent(selectedPlan)}&valor=${encodeURIComponent(selectedValor)}`;
    } else {
        window.location.href = "Dashboard.html";
    }
}

// Permitir apenas letras e espaços no campo de nome
inputNome.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^a-záéíóúàâêôãõñç\s]/gi, "");
});

// Permitir apenas números no campo de CPF
inputCPF.addEventListener("input", (e) => {
    e.target.value = formatCPF(e.target.value);
});

// Permitir apenas números no campo de CPF do login
if (inputLoginCPF) {
    inputLoginCPF.addEventListener("input", (e) => {
        e.target.value = formatCPF(e.target.value);
    });
}

// Ação de Envio - Formulário de Login
formLogin.addEventListener("submit", (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    redirectAfterAuth();
});

// Ação de Envio - Formulário de Cadastro
formCadastro.addEventListener("submit", (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    redirectAfterAuth();
});