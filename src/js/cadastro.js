const formCadastro = document.getElementById("formCadastro");

const inputNome = document.querySelector("input[name='nome']");
const inputCPF = document.querySelector("input[name='cpf']");
const inputTelefone = document.querySelector("input[name='telefone']");
const inputEmail = document.querySelector("input[name='email']");
const inputSenha = document.querySelector("input[name='senha']");
const inputSenhaConfirm = document.querySelector("input[name='senhaConfirm']");

const passwordError = document.getElementById("passwordError");
const stepIndicator = document.getElementById("stepIndicator");

const formSteps = [...document.querySelectorAll(".form-step")];
const nextButtons = [...document.querySelectorAll(".next-btn")];
const backButtons = [...document.querySelectorAll(".back-btn")];
const passwordToggleButtons = [...document.querySelectorAll(".password-toggle")];

const urlParams = new URLSearchParams(window.location.search);
const selectedPlan = urlParams.get("plano");
const selectedValor = urlParams.get("valor");

const planBadgeStrong = document.querySelector(".plan-badge strong");

if (selectedPlan && selectedValor && planBadgeStrong) {
const periodo =
selectedPlan === "mensal"
? "/mês"
: selectedPlan === "anual"
? "/ano"
: "";

planBadgeStrong.textContent =
    `${selectedPlan} (R$ ${selectedValor}${periodo})`;

}

function formatCPF(value) {
const digits = value.replace(/\D/g, "").slice(0, 11);

return digits
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");

}

function validateEmail(email) {
return /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email);
}

function showStep(stepNumber) {

formSteps.forEach((step) => {
    step.classList.toggle(
        "active",
        Number(step.dataset.step) === stepNumber
    );
});

if (stepIndicator) {
    stepIndicator.textContent = `Passo ${stepNumber} de 3`;
}

}

showStep(1);

inputNome?.addEventListener("input", (e) => {
e.target.value =
e.target.value.replace(/[^a-záéíóúàâêôãõçñ\s]/gi, "");
});

inputCPF?.addEventListener("input", (e) => {
e.target.value = formatCPF(e.target.value);
});

passwordToggleButtons.forEach((button) => {

const targetInput =
    document.querySelector(
        `input[name="${button.dataset.target}"]`
    );

if (!targetInput) return;

button.addEventListener("click", () => {

    const show = targetInput.type === "password";

    targetInput.type = show ? "text" : "password";

    button.textContent = show
        ? "Ocultar"
        : "Mostrar";
});

});

function validateStep(step) {

if (step === 1) {

    const nome = inputNome.value.trim();
    const cpf = inputCPF.value.replace(/\D/g, "");

    if (!nome) {
        alert("Informe seu nome.");
        return false;
    }

    if (cpf.length !== 11) {
        alert("CPF inválido.");
        return false;
    }

    return true;
}

if (step === 2) {

    if (inputTelefone.value.trim().length < 10) {
        alert("Telefone inválido.");
        return false;
    }

    if (!validateEmail(inputEmail.value.trim())) {
        alert("Email inválido.");
        return false;
    }

    return true;
}

if (step === 3) {

    if (inputSenha.value !== inputSenhaConfirm.value) {

        if (passwordError) {
            passwordError.textContent =
                "As senhas não coincidem.";
        }

        return false;
    }

    return true;
}

return true;

}

nextButtons.forEach((button) => {

button.addEventListener("click", () => {

    const currentStep =
        Number(
            button.closest(".form-step").dataset.step
        );

    const nextStep =
        Number(button.dataset.next);

    if (validateStep(currentStep)) {
        showStep(nextStep);
    }
});

});

backButtons.forEach((button) => {

button.addEventListener("click", () => {

    const prevStep =
        Number(button.dataset.prev);

    showStep(prevStep);
});

});

function redirectAfterAuth() {

if (selectedPlan && selectedValor) {

    window.location.href =
        `pagamento.html?plano=${encodeURIComponent(selectedPlan)}&valor=${encodeURIComponent(selectedValor)}`;

} else {

    window.location.href =
        "DashboardV.html";
}

}

formCadastro?.addEventListener("submit", (e) => {

e.preventDefault();

if (!validateStep(3)) return;

// aqui você poderá salvar no banco futuramente

redirectAfterAuth();

});