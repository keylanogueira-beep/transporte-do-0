const formRecuperacao = document.getElementById("formRecuperacao");
const inputTelefone = document.querySelector(
    "#formRecuperacao input[name='identificador']"
);

const btnMetodoEmail = document.getElementById("btnMetodoEmail");

// Alternar para página de email
if (btnMetodoEmail) {
    btnMetodoEmail.addEventListener("click", () => {
        window.location.href = "recuperacao_email.html";
    });
}

// Validação do telefone
if (inputTelefone) {
    inputTelefone.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(
            /[^0-9()\s-]/g,
            ""
        );
    });
}

// Submit
if (formRecuperacao) {
    formRecuperacao.addEventListener("submit", (e) => {
        e.preventDefault();

        console.log(
            "Recuperação solicitada por telefone:",
            inputTelefone.value
        );

        // Chamar API aqui
    });
}