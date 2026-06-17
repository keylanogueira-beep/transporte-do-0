const formRecuperacao = document.getElementById("formRecuperacao");
const inputEmail = document.querySelector(
    "#formRecuperacao input[name='identificador']"
);

const btnMetodoTelefone = document.getElementById("btnMetodoTelefone");

// Alternar para página de telefone
if (btnMetodoTelefone) {
    btnMetodoTelefone.addEventListener("click", () => {
        window.location.href = "recuperacao_telefone.html";
    });
}

// Validação do email
if (inputEmail) {
    inputEmail.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(
            /[^a-zA-ZÀ-ÿ0-9@._-]/g,
            ""
        );
    });
}

// Submit
if (formRecuperacao) {
    formRecuperacao.addEventListener("submit", (e) => {
        e.preventDefault();

        console.log(
            "Recuperação solicitada por email:",
            inputEmail.value
        );

        // Chamar API aqui
    });
}