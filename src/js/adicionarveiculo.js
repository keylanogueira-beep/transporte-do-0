document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Controle do Nome do Arquivo no Upload
    const fileInput = document.getElementById("vehiclePhoto");
    const fileNameDisplay = document.getElementById("fileNameDisplay");

    fileInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
            fileNameDisplay.innerText = e.target.files[0].name;
            fileNameDisplay.style.color = "#2D3748";
        } else {
            fileNameDisplay.innerText = "(Nenhum arquivo escolhido)";
            fileNameDisplay.style.color = "#718096";
        }
    });

    // 2. Configuração e Inicialização do Mapa (Leaflet)
    const camacariCoords = [-12.6975, -38.3242]; 
    const map = L.map('map').setView(camacariCoords, 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    let markers = [];
    let isAddingPoints = false;
    const pointCountSpan = document.getElementById("pointCount");
    const addPointBtn = document.getElementById("addPointBtn");

    // Alternar o modo de adicionar pontos
    addPointBtn.addEventListener("click", () => {
        isAddingPoints = !isAddingPoints;
        if (isAddingPoints) {
            addPointBtn.style.backgroundColor = "#E2ECFF";
            addPointBtn.style.borderColor = "#1D5BF2";
            addPointBtn.style.color = "#1D5BF2";
        } else {
            resetAddPointButton();
        }
    });

    // Evento de clique no mapa para criar pontos
    map.on('click', (e) => {
        if (!isAddingPoints) return;

        const nextNumber = markers.length + 1;
        
        const customIcon = L.divIcon({
            className: 'custom-marker-icon',
            html: nextNumber,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        });

        const newMarker = L.marker(e.latlng, { icon: customIcon }).addTo(map);
        markers.push(newMarker);
        
        updatePointCount();
        resetAddPointButton(); 
    });

    // Remover o último ponto adicionado
    document.getElementById("removePointBtn").addEventListener("click", () => {
        if (markers.length > 0) {
            const lastMarker = markers.pop();
            map.removeLayer(lastMarker);
            updatePointCount();
        }
    });

    // Botão Salvar Mapa - CORRIGIDO (Uso de crases)
    document.getElementById("saveMapBtn").addEventListener("click", () => {
        alert( `Mapa salvo com sucesso com ${markers.length} pontos configurados!`);
    });

    // Envio do formulário completo - CORRIGIDO (Uso de crases)
    document.getElementById("vehicleForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const vName = document.getElementById("vehicleName").value;
        const vPlate = document.getElementById("vehiclePlate").value;

        if (markers.length === 0) {
            alert("Por favor, adicione pelo menos um ponto de encontro no mapa.");
            return;
        }

        alert( `Veículo "${vName}" (Placa: ${vPlate}) cadastrado com sucesso com ${markers.length} paradas!`);
    });

    // Funções auxiliares
    function updatePointCount() {
        pointCountSpan.innerText = markers.length;
    }

    function resetAddPointButton() {
        isAddingPoints = false;
        addPointBtn.style.backgroundColor = "#FFFFFF";
        addPointBtn.style.borderColor = "#CBD5E0";
        addPointBtn.style.color = "#2D3748";
    }
    
    // Eventos do botão cancelar ou fechar - CORRIGIDO (Prevenção de erro nulo)
    const btnCancel = document.querySelector(".btn-cancel");
    if (btnCancel) btnCancel.addEventListener("click", closeModal);

    const closeX = document.querySelector(".close-x");
    if (closeX) closeX.addEventListener("click", closeModal);

    function closeModal() {
        alert("Ação cancelada. Fechando modal.");
    }
});