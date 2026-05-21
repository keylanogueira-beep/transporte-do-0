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