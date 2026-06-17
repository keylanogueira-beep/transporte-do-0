const form = document.getElementById("cadastroPasso2");
const btnVoltar = document.getElementById("btnVoltarPasso1");

const inputTelefone = document.querySelector("input[name='telefone']");
const inputEmail = document.querySelector("input[name='email']");

// atualizar plano
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

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

btnVoltar?.addEventListener("click", () => {
    window.location.href = "cadastro1.html";
});

form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const telefone = inputTelefone.value.trim();
    const email = inputEmail.value.trim();

    if (telefone.length < 10 || !validateEmail(email)) {
        alert("Preencha corretamente os dados.");
        return;
    }

    sessionStorage.setItem("cadastro_telefone", telefone);
    sessionStorage.setItem("cadastro_email", email);

    window.location.href = "cadastro3.html";
});