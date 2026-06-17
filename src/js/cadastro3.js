const form = document.getElementById("cadastroPasso3");

const btnVoltar = document.getElementById("btnVoltarPasso2");

const inputSenha = document.querySelector("input[name='senha']");
const inputSenhaConfirm = document.querySelector("input[name='senhaConfirm']");
const passwordError = document.getElementById("passwordError");

const toggleButtons = document.querySelectorAll(".password-toggle");

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

// toggle senha
toggleButtons.forEach((btn) => {
    const input = document.querySelector(
        `input[name="${btn.dataset.target}"]`
    );

    btn.addEventListener("click", () => {
        const show = input.type === "password";
        input.type = show ? "text" : "password";
        btn.textContent = show ? "Ocultar" : "Mostrar";
    });
});

// voltar
btnVoltar?.addEventListener("click", () => {
    window.location.href = "cadastro2.html";
});

// finalizar cadastro
form?.addEventListener("submit", (e) => {
    e.preventDefault();

    passwordError.textContent = "";

    const senha = inputSenha.value.trim();
    const confirm = inputSenhaConfirm.value.trim();

    if (!senha || senha !== confirm) {
        passwordError.textContent = "Senhas não conferem.";
        return;
    }

    const dados = {
        nome: sessionStorage.getItem("cadastro_nome"),
        cpf: sessionStorage.getItem("cadastro_cpf"),
        telefone: sessionStorage.getItem("cadastro_telefone"),
        email: sessionStorage.getItem("cadastro_email"),
        senha
    };

    console.log("Cadastro completo:", dados);

    sessionStorage.clear();

    const plan = sessionStorage.getItem("plano");
    const value = sessionStorage.getItem("valor");

    if (plan && value) {
        window.location.href =
            `pagamento.html?plano=${plan}&valor=${value}`;
    } else {
        window.location.href = "pagamento.html";
    }
});