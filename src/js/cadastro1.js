const form = document.getElementById("cadastroPasso1");
const inputNome = document.querySelector("input[name='nome']");
const inputCPF = document.querySelector("input[name='cpf']");

// captura plano vindo da URL
const urlParams = new URLSearchParams(window.location.search);
const selectedPlan = urlParams.get("plano");
const selectedValor = urlParams.get("valor");

// salva plano no sessionStorage
if (selectedPlan && selectedValor) {
    sessionStorage.setItem("plano", selectedPlan);
    sessionStorage.setItem("valor", selectedValor);
}

// atualiza badge
function atualizarPlano() {
    const plan = sessionStorage.getItem("plano");
    const value = sessionStorage.getItem("valor");

    const el = document.querySelector(".plan-badge strong");
    if (!el || !plan || !value) return;

    const periodo =
        plan === "mensal" ? "/mês" :
        plan === "anual" ? "/ano" : "";

    el.textContent = `${plan} (R$ ${value}${periodo})`;
}

atualizarPlano();

// CPF format
function formatCPF(value) {
    const digits = value.replace(/\D/g, "").slice(0, 11);

    return digits
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
}

inputNome?.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^a-záéíóúàâêôãõçñ\s]/gi, "");
});

inputCPF?.addEventListener("input", (e) => {
    e.target.value = formatCPF(e.target.value);
});

form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = inputNome.value.trim();
    const cpf = inputCPF.value.replace(/\D/g, "");

    if (!nome || cpf.length !== 11) {
        alert("Preencha corretamente os campos.");
        return;
    }

    sessionStorage.setItem("cadastro_nome", nome);
    sessionStorage.setItem("cadastro_cpf", cpf);

    window.location.href = "cadastro2.html";
});