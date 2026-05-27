const btnEntrar = document.getElementById("btnEntrar");
const btnCriar = document.getElementById("btnCriar");

const formLogin = document.getElementById("formLogin");
const formCadastro = document.getElementById("formCadastro");

btnEntrar.addEventListener("click", () => {

    formLogin.classList.remove("hidden");
    formCadastro.classList.add("hidden");

    btnEntrar.classList.add("active");
    btnCriar.classList.remove("active");

});

btnCriar.addEventListener("click", () => {

    formCadastro.classList.remove("hidden");
    formLogin.classList.add("hidden");

    btnCriar.classList.add("active");
    btnEntrar.classList.remove("active");

});

// Validação de Campos - Formulário de Cadastro
const inputNome = document.querySelector("#formCadastro input[name='nome']");
const inputCPF = document.querySelector("#formCadastro input[name='cpf']");

// Permitir apenas letras e espaços no campo de nome
inputNome.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^a-záéíóúàâêôãõñç\s]/gi, "");
});

// Permitir apenas números no campo de CPF
inputCPF.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
});

// Ação de Envio - Formulário de Login
formLogin.addEventListener("submit", (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    // O navegador cuida da mensagem "Preencha este campo"
});

// Ação de Envio - Formulário de Cadastro
formCadastro.addEventListener("submit", (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    // O navegador cuida da mensagem "Preencha este campo"
});