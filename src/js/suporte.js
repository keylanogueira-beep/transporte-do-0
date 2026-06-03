document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('supportForm');
    const feedback = document.getElementById('formFeedback');


    form.addEventListener('submit', (e) => {
        e.preventDefault();


        const name = document.getElementById('name').value;
        const profile = document.getElementById('profile').value;


        const submitBtn = form.querySelector('.btn-submit');
        submitBtn.textContent = 'Processando dados de mobilidade...';
        submitBtn.disabled = true;


        // Simulação de envio seguro para a base de dados
        setTimeout(() => {
            submitBtn.textContent = 'Enviar para Análise';
            submitBtn.disabled = false;


            let customMessage = '';


            // Lógica de resposta dinâmica atualizada
            if (profile === 'usuario') {
                customMessage = `Obrigado, ${name}. Sua validação de intenção de uso e feedback de rotas nos bairros foi registrada com sucesso!`;
            } else if (profile === 'empresa') {
                customMessage = `Olá, ${name}. Nossa equipe operacional entrará em contato para detalhar o gerenciamento de frotas e controle logístico do Polo.`;
            } else if (profile === 'financeiro') {
                customMessage = `Olá, ${name}. Sua solicitação sobre cobrança foi recebida. Um analista enviará os detalhes do modelo SaaS ou per capita solicitado.`;
            }


            // Exibe a mensagem de feedback na interface
            feedback.textContent = customMessage;
            feedback.classList.remove('hidden');
            feedback.classList.add('success');


            // Reseta os campos do formulário
            form.reset();


            // Oculta a mensagem automaticamente após 7 segundos
            setTimeout(() => {
                feedback.classList.add('hidden');
                feedback.classList.remove('success');
            }, 7000);


        }, 1500);
    });
});

