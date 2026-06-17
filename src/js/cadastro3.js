const form = document.getElementById("cadastroPasso3");
const btnVoltar = document.getElementById("btnVoltarPasso2");

const inputSenha = document.querySelector("input[name='senha']");
const inputSenhaConfirm = document.querySelector("input[name='senhaConfirm']");
const passwordError = document.getElementById("passwordError");

const toggleButtons = document.querySelectorAll(".password-toggle");

// Atualizar plano exibido na tela
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

// Mostrar/Ocultar senha
toggleButtons.forEach((btn) => {
    const input = document.querySelector(
        `input[name="${btn.dataset.target}"]`
    );

    if (!input) return;

    btn.addEventListener("click", () => {
        const mostrar = input.type === "password";
        input.type = mostrar ? "text" : "password";
        btn.textContent = mostrar ? "Ocultar" : "Mostrar";
    });
});

// Botão voltar
btnVoltar?.addEventListener("click", () => {
    window.location.href = "cadastro2.html";
});

// Finalizar cadastro
form?.addEventListener("submit", (e) => {
    e.preventDefault();

    passwordError.textContent = "";

    const senha = inputSenha.value.trim();
    const confirmacao = inputSenhaConfirm.value.trim();

    if (!senha || senha !== confirmacao) {
        passwordError.textContent = "Senhas não conferem.";
        return;
    }

    // Salva os dados para uso futuro (API, por exemplo)
    const dados = {
        nome: sessionStorage.getItem("cadastro_nome"),
        cpf: sessionStorage.getItem("cadastro_cpf"),
        telefone: sessionStorage.getItem("cadastro_telefone"),
        email: sessionStorage.getItem("cadastro_email"),
        senha
    };

    console.log("Cadastro completo:", dados);

    // Recupera plano ANTES de limpar o sessionStorage
    const plan = sessionStorage.getItem("plano");
    const value = sessionStorage.getItem("valor");

    // Se quiser limpar apenas os dados do cadastro:
    sessionStorage.removeItem("cadastro_nome");
    sessionStorage.removeItem("cadastro_cpf");
    sessionStorage.removeItem("cadastro_telefone");
    sessionStorage.removeItem("cadastro_email");

    if (plan && value) {
        window.location.href =
            `pagamento.html?plano=${encodeURIComponent(plan)}&valor=${encodeURIComponent(value)}`;
    } else {
        window.location.href = "pagamento.html";
    }
});