const formLogin = document.getElementById("formLogin");
const formCadastro = document.getElementById("formCadastro");

// Validação de Campos - Formulário de Cadastro
const inputNome = document.querySelector("#formCadastro input[name='nome']");
const inputCPF = document.querySelector("#formCadastro input[name='cpf']");
const inputTelefone = document.querySelector("#formCadastro input[name='telefone']");
const inputEmail = document.querySelector("#formCadastro input[name='email']");
const inputSenha = document.querySelector("#formCadastro input[name='senha']");
const inputSenhaConfirm = document.querySelector("#formCadastro input[name='senhaConfirm']");
const passwordError = document.getElementById('passwordError');
const stepIndicator = document.getElementById('stepIndicator');
const closeButton = document.querySelector('.close-btn');
const formSteps = Array.from(document.querySelectorAll('#formCadastro .form-step'));
const nextButtons = Array.from(document.querySelectorAll('#formCadastro .next-btn'));
const backButtons = Array.from(document.querySelectorAll('#formCadastro .back-btn'));
const passwordToggleButtons = Array.from(document.querySelectorAll('.password-toggle'));
const inputLoginCPF = document.querySelector("#formLogin input[name='cpf']");

function getErrorSpan(name) {
    return document.querySelector(`#formCadastro .field-error[data-error-for="${name}"]`);
}

// Clear individual field error on input
[inputNome, inputCPF, inputTelefone, inputEmail, inputSenha, inputSenhaConfirm].forEach((el) => {
    if (!el) return;
    el.addEventListener('input', () => {
        const span = getErrorSpan(el.name);
        if (span) span.textContent = '';
        if (passwordError && (el.name === 'senha' || el.name === 'senhaConfirm')) passwordError.textContent = '';
        if (typeof el.setCustomValidity === 'function') {
            el.setCustomValidity('');
        }
    });
});

passwordToggleButtons.forEach((button) => {
    const targetName = button.dataset.target;
    const targetInput = document.querySelector(`#formCadastro input[name="${targetName}"]`);
    if (!targetInput) return;
    button.addEventListener('click', () => {
        const isHidden = targetInput.type === 'password';
        targetInput.type = isHidden ? 'text' : 'password';
        button.textContent = isHidden ? 'Ocultar' : 'Mostrar';
        button.setAttribute('aria-label', isHidden ? 'Ocultar senha' : 'Mostrar senha');
    });
});

const formatCPF = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    return digits
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
};

const urlParams = new URLSearchParams(window.location.search);
const mode = urlParams.get('mode');
const selectedPlan = urlParams.get('plano');
const selectedValor = urlParams.get('valor');
const planBadgeStrong = document.querySelector('.plan-badge strong');

if (selectedPlan && selectedValor && planBadgeStrong) {
    const textoPeriodo = selectedPlan === 'mensal' ? '/mês' : selectedPlan === 'anual' ? '/ano' : '';
    planBadgeStrong.textContent = `${selectedPlan} (R$ ${selectedValor}${textoPeriodo})`;
}

function redirectAfterAuth() {
    if (selectedPlan && selectedValor) {
        window.location.href = `pagamento.html?plano=${encodeURIComponent(selectedPlan)}&valor=${encodeURIComponent(selectedValor)}`;
    } else {
        window.location.href = "DashboardV.html";
    }
}

function configurarModo() {
    const planBadge = document.querySelector('.plan-badge');
    const avisoPremium = document.getElementById('loginAvisoPremium');
    const headerTitle = document.querySelector('.card-top h1');
    const headerDesc = document.querySelector('.card-top p');

    if (mode === 'criar' || (selectedPlan && selectedValor)) {
        if (headerTitle) headerTitle.textContent = 'Criar conta';
        if (headerDesc) headerDesc.textContent = 'Crie sua conta Premium para acessar as rotas privadas e gerenciar o plano escolhido.';
        if (planBadge) planBadge.style.display = 'block';
        if (avisoPremium) avisoPremium.style.display = 'none';
        formLogin.classList.add('hidden');
        formCadastro.classList.remove('hidden');
        showStep(1);
    } else {
        if (headerTitle) headerTitle.textContent = 'Entrar';
        if (headerDesc) headerDesc.textContent = 'Faça login para acessar sua conta Premium e continuar usando as rotas privadas.';
        if (planBadge) planBadge.style.display = 'none';
        if (avisoPremium) avisoPremium.style.display = 'block';
        formLogin.classList.remove('hidden');
        formCadastro.classList.add('hidden');
    }
}

configurarModo();

// Permitir apenas letras e espaços no campo de nome
inputNome.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^a-záéíóúàâêôãõñç\s]/gi, "");
});

// Permitir apenas números no campo de CPF
inputCPF.addEventListener("input", (e) => {
    e.target.value = formatCPF(e.target.value);
});

// Permitir apenas números no campo de CPF do login
if (inputLoginCPF) {
    inputLoginCPF.addEventListener("input", (e) => {
        e.target.value = formatCPF(e.target.value);
    });
}

function showStep(stepNumber) {
    formSteps.forEach((step) => {
        step.classList.toggle('active', step.dataset.step === String(stepNumber));
    });
    if (stepIndicator) {
        if (stepNumber === 1) {
            stepIndicator.parentElement.style.display = 'none';
        } else {
            stepIndicator.parentElement.style.display = 'block';
            stepIndicator.textContent = `Passo ${stepNumber} de 3`;
        }
    }
    if (closeButton) {
        closeButton.classList.toggle('hidden', stepNumber !== 1);
    }
}

function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateStep(stepNumber) {
    // clear custom validity on all registration fields
    [inputNome, inputCPF, inputTelefone, inputEmail, inputSenha, inputSenhaConfirm].forEach((input) => {
        if (input) input.setCustomValidity('');
    });
    passwordError.textContent = '';

    if (stepNumber === 1) {
        const nome = inputNome.value.trim();
        const cpf = inputCPF.value.replace(/\D/g, '');
        if (!nome) {
            inputNome.setCustomValidity('Preencha este campo.');
            inputNome.reportValidity();
            return false;
        }
        if (cpf.length !== 11) {
            inputCPF.setCustomValidity('CPF inválido.');
            inputCPF.reportValidity();
            return false;
        }
        return true;
    }

    if (stepNumber === 2) {
        const telefone = inputTelefone.value.trim();
        const email = inputEmail.value.trim();
        if (!telefone || telefone.length < 10) {
            inputTelefone.setCustomValidity('Telefone inválido.');
            inputTelefone.reportValidity();
            return false;
        }
        if (!validateEmail(email)) {
            inputEmail.setCustomValidity('Email inválido.');
            inputEmail.reportValidity();
            return false;
        }
        return true;
    }

    if (stepNumber === 3) {
        const senha = inputSenha.value.trim();
        const senhaConfirm = inputSenhaConfirm.value.trim();
        if (!senha) {
            inputSenha.setCustomValidity('Preencha este campo.');
            inputSenha.reportValidity();
            return false;
        }
        if (!senhaConfirm) {
            inputSenhaConfirm.setCustomValidity('Preencha este campo.');
            inputSenhaConfirm.reportValidity();
            return false;
        }
        if (senha !== senhaConfirm) {
            inputSenhaConfirm.setCustomValidity('As senhas não se conferem.');
            inputSenhaConfirm.reportValidity();
            return false;
        }
        inputSenha.setCustomValidity('');
        inputSenhaConfirm.setCustomValidity('');
        return true;
    }

    return false;
}

nextButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const nextStep = Number(button.dataset.next);
        const currentStep = Number(button.closest('.form-step').dataset.step);
        if (validateStep(currentStep)) {
            showStep(nextStep);
        }
    });
});

backButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const prevStep = Number(button.dataset.prev);
        showStep(prevStep);
        passwordError.textContent = '';
    });
});

// Ação de Envio - Formulário de Login
formLogin.addEventListener("submit", (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    redirectAfterAuth();
});

// Ação de Envio - Formulário de Cadastro
formCadastro.addEventListener("submit", (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    if (!validateStep(3)) {
        showStep(3);
        return;
    }
    redirectAfterAuth();
});

function fecharLogin() {
    const isPremiumFlow = mode === 'criar' || (selectedPlan && selectedValor);
    if (isPremiumFlow) {
        window.location.href = 'index.html?openPremium=1';
    } else {
        window.location.href = 'index.html';
    }
}