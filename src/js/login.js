const formLogin = document.getElementById("formLogin");
const inputLoginCPF = document.querySelector("#formLogin input[name='cpf']");

const urlParams = new URLSearchParams(window.location.search);
const selectedPlan = urlParams.get("plano");
const selectedValor = urlParams.get("valor");

const planBadgeStrong = document.querySelector(".plan-badge strong");

function formatCPF(value) {
const digits = value.replace(/\D/g, "").slice(0, 11);

return digits
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");

}

if (inputLoginCPF) {
inputLoginCPF.addEventListener("input", (e) => {
e.target.value = formatCPF(e.target.value);
});
}

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

function redirectAfterAuth() {
if (selectedPlan && selectedValor) {
window.location.href =
    `pagamento.html?plano=${encodeURIComponent(selectedPlan)}&valor=${encodeURIComponent(selectedValor)}`;
} else {
window.location.href = "DashboardV.html";
}
}

if (formLogin) {
formLogin.addEventListener("submit", (e) => {
e.preventDefault();

    // aqui você poderá colocar sua autenticação futuramente

    redirectAfterAuth();
});

}

function fecharLogin() {
window.location.href = "index.html";
}