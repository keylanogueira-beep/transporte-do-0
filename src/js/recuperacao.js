// Validação e manipulação da página de recuperação de senha
const formRecuperacao = document.getElementById("formRecuperacao");
const inputIdentificador = document.querySelector("#formRecuperacao input[name='identificador']");
const labelIdentificador = document.querySelector("#formRecuperacao label span");
const btnMetodoEmail = document.getElementById("btnMetodoEmail");
const btnMetodoTelefone = document.getElementById("btnMetodoTelefone");
let metodoSelecionado = "email";

function atualizarMetodoRecuperacao(metodo) {
    metodoSelecionado = metodo;
    if (labelIdentificador) {
        labelIdentificador.textContent = metodo === "telefone" ? "Telefone" : "Email";
    }
    if (inputIdentificador) {
        inputIdentificador.placeholder = metodo === "telefone" ? "(71) 99999-9999" : "seu@email.com";
        inputIdentificador.value = "";
    }
    if (btnMetodoEmail && btnMetodoTelefone) {
        btnMetodoEmail.classList.toggle("active", metodo === "email");
        btnMetodoTelefone.classList.toggle("active", metodo === "telefone");
    }
    const mensagemRecuperacao = document.getElementById('recuperacaoMensagem');
    if (mensagemRecuperacao) {
        mensagemRecuperacao.textContent = metodo === 'telefone'
            ? 'Enviaremos um código de recuperação para o seu número de telefone, verifique sua caixa de entrada.'
            : 'Enviaremos um código de recuperação para o seu email, verifique sua caixa de entrada.';
    }
}

if (btnMetodoEmail) {
    btnMetodoEmail.addEventListener("click", () => atualizarMetodoRecuperacao("email"));
}

if (btnMetodoTelefone) {
    btnMetodoTelefone.addEventListener("click", () => atualizarMetodoRecuperacao("telefone"));
}

if (formRecuperacao && inputIdentificador) {
    inputIdentificador.addEventListener("input", (e) => {
        if (metodoSelecionado === "telefone") {
            e.target.value = e.target.value.replace(/[^0-9\(\)\s\-]/g, "");
        } else {
            e.target.value = e.target.value.replace(/[^a-záéíóúàâêôãõñç0-9@.\-_]/gi, "");
        }
    });

    formRecuperacao.addEventListener("submit", (e) => {
        e.preventDefault();
        // Integração com API será feita aqui
        console.log("Recuperação solicitada por", metodoSelecionado, ":", e.target.identificador.value);
    });
}

atualizarMetodoRecuperacao("email");
