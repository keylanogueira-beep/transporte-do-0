// Aguarda o HTML carregar completamente
document.addEventListener("DOMContentLoaded", () => {
    
    // Seleciona todos os cards de planos e os botões de ação
    const planCards = document.querySelectorAll(".plan-card");
    const actionButtons = document.querySelectorAll(".btn-action");

    // Adiciona o evento de clique em cada botão
    actionButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            // Evita comportamentos padrão indesejados
            event.preventDefault();

            // Pega o card pai do botão que foi clicado
            const currentCard = button.closest(".plan-card");
            
            // Pega o nome do plano baseado no título <h2> dentro do card
            const planName = currentCard.querySelector(".plan-title").innerText;

            // Remove a classe de destaque de todos os cards
            planCards.forEach(card => card.classList.remove("selected-plan"));

            // Adiciona a classe de destaque apenas no card clicado
            currentCard.classList.add("selected-plan");

            // Simula a ação do plano
            if (planName.toLowerCase() === "gratuito") {
                window.location.href = "index.html";
            } else {
                // Extrai o valor do plano
                const priceElement = currentCard.querySelector(".plan-price");
                const price = priceElement ? priceElement.innerText.replace("R$ ", "").replace(",", ".") : "0";
                
                // Cria a URL com parâmetros do plano
                const params = new URLSearchParams();
                params.append("plano", planName.toLowerCase());
                params.append("valor", price);
                
                // Redireciona para pagamento.html
                window.location.href = `pagamento.html?${params.toString()}`;
            }
        });
    });
});