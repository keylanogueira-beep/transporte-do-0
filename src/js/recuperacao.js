// Validação e manipulação da página de recuperação de senha
const formRecuperacao = document.getElementById("formRecuperacao");
const inputIdentificador = document.querySelector("#formRecuperacao input[name='identificador']");

if (formRecuperacao) {
    // Permitir letras, números, pontos, hífens e @ para email/CPF
    inputIdentificador.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^a-záéíóúàâêôãõñç0-9@.\-]/gi, "");
    });

    // Ação de Envio
    formRecuperacao.addEventListener("submit", (e) => {
        e.preventDefault();
        // Integração com API será feita aqui
        console.log("Recuperação solicitada para:", e.target.identificador.value);
    });
}
