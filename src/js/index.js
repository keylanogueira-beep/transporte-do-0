// =========================================
//  BUSCA DE LINHAS DE ÔNIBUS  (Leaflet)
// =========================================

/* ── Base de dados ── */
var linhasDB = [
    {
        id: 'L001',
        nome: 'Linha 001 - Centro/Gleba A',
        bairros: ['Centro', 'Gleba A', 'Gleba B', 'Phoc I'],
        frequenciaMin: 30,
        centro: [-12.6916, -38.3213],
        zoom: 14,
        pontos: [
            { nome: 'Centro',  lat: -12.6880, lng: -38.3310, segundos: 17*60 },
            { nome: 'Gleba A', lat: -12.6920, lng: -38.3200, segundos: 27*60 },
            { nome: 'Gleba B', lat: -12.6960, lng: -38.3140, segundos:  2*60, chegando: true },
            { nome: 'Phoc I',  lat: -12.7010, lng: -38.3080, segundos: 12*60 }
        ],
        todosHorarios: ['05:30','06:00','06:30','07:00','07:30','08:00','08:30','09:00',
                        '09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00',
                        '13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00',
                        '17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00']
    },
    {
        id: 'L002',
        nome: 'Linha 002 - Centro/Abrantes',
        bairros: ['Centro', 'Abrantes', 'Catu de Abrantes'],
        frequenciaMin: 45,
        centro: [-12.7000, -38.3050],
        zoom: 13,
        pontos: [
            { nome: 'Centro',           lat: -12.6880, lng: -38.3310, segundos: 15*60 },
            { nome: 'Abrantes',         lat: -12.7050, lng: -38.2900, segundos: 30*60 },
            { nome: 'Catu de Abrantes', lat: -12.7200, lng: -38.2750, segundos: 45*60 }
        ],
        todosHorarios: ['06:00','06:45','07:30','08:15','09:00','09:45','10:30','11:15',
                        '12:00','12:45','13:30','14:15','15:00','15:45','16:30','17:15',
                        '18:00','18:45','19:30','20:15','21:00']
    },
    {
        id: 'L003',
        nome: 'Linha 003 - Polo Industrial',
        bairros: ['Centro', 'Polo Industrial', 'Gleba H', 'Gleba E'],
        frequenciaMin: 20,
        centro: [-12.6750, -38.3350],
        zoom: 13,
        pontos: [
            { nome: 'Centro',          lat: -12.6880, lng: -38.3310, segundos: 8*60, chegando: true },
            { nome: 'Gleba H',         lat: -12.6730, lng: -38.3400, segundos: 18*60 },
            { nome: 'Gleba E',         lat: -12.6650, lng: -38.3480, segundos: 26*60 },
            { nome: 'Polo Industrial', lat: -12.6560, lng: -38.3600, segundos: 41*60 }
        ],
        todosHorarios: ['05:00','05:20','05:40','06:00','06:20','06:40','07:00','07:20',
                        '07:40','08:00','08:20','08:40','09:00','09:20','09:40','10:00',
                        '10:20','10:40','11:00','11:20','11:40','12:00','12:20','12:40',
                        '13:00','13:20','13:40','14:00','14:20','14:40','15:00','15:20',
                        '15:40','16:00','16:20','16:40','17:00','17:20','17:40','18:00',
                        '18:20','18:40','19:00','19:20','19:40','20:00','20:20','21:00']
    },
    {
        id: 'L004',
        nome: 'Linha 004 - Arembepe/Centro',
        bairros: ['Arembepe', 'Monte Gordo', 'Itacimirim', 'Centro'],
        frequenciaMin: 60,
        centro: [-12.6600, -38.2900],
        zoom: 12,
        pontos: [
            { nome: 'Arembepe',    lat: -12.6380, lng: -38.2620, segundos: 60*60 },
            { nome: 'Monte Gordo', lat: -12.6490, lng: -38.2720, segundos: 45*60 },
            { nome: 'Itacimirim', lat: -12.6590, lng: -38.2820, segundos: 30*60 },
            { nome: 'Centro',     lat: -12.6880, lng: -38.3310, segundos: 10*60, chegando: true }
        ],
        todosHorarios: ['06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00',
                        '14:00','15:00','16:00','17:00','18:00','19:00','20:00']
    }
];

/* ── Estado dos timers ── */
var _timersContagem = {};
var _mapaInstancias = {};

function scrollToContato() {
    var target = document.getElementById('contato');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function scrollToSearch() {
    var target = document.querySelector('.search-section');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function scrollToSobre() {
    var target = document.getElementById('sobre');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/* ── Busca ── */
function buscarLinhas() {
    var termo = document.getElementById('inputBairro').value.trim().toLowerCase();
    var container = document.getElementById('searchResults');
    var lista = document.getElementById('srLista');

    Object.keys(_timersContagem).forEach(function(id) {
        clearInterval(_timersContagem[id]);
    });
    _timersContagem = {};
    _mapaInstancias = {};

    if (!termo) { container.style.display = 'none'; lista.innerHTML = ''; return; }

    var encontradas = linhasDB.filter(function(l) {
        return l.bairros.some(function(b) { return b.toLowerCase().includes(termo); });
    });

    container.style.display = 'block';
    setTimeout(function() {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);

    document.getElementById('srContagem').textContent =
        'Encontramos ' + encontradas.length + ' linha(s):';
    var tp = encontradas.reduce(function(a, l) { return a + l.pontos.length; }, 0);
    document.getElementById('srTotal').textContent = encontradas.length > 0 ? tp + ' pontos no total' : '';

    if (encontradas.length === 0) {
        lista.innerHTML = '<div class="sr-vazio"><strong>Nenhuma linha encontrada</strong>Tente outro bairro ou verifique a ortografia.</div>';
        return;
    }

    encontradas.forEach(function(linha) {
        linha._segs = linha.pontos.map(function(p) { return p.segundos; });
    });

    lista.innerHTML = encontradas.map(renderLinhaCard).join('');

    setTimeout(function() {
        encontradas.forEach(function(linha) {
            montarMapa(linha);
            iniciarTimer(linha);
        });
    }, 100);
}

/* ── Render do card ── */
function renderLinhaCard(linha) {
    var tagsHTML = linha.bairros.map(function(b) {
        return '<span class="sr-tag">' + b + '</span>';
    }).join('');

    var seqHTML = linha.sequencia
        ? linha.sequencia.map(function(b, i) {
            return b + (i < linha.sequencia.length - 1 ? ' <span style="color:#9ca3af">→</span> ' : '');
          }).join('')
        : linha.pontos.map(function(p, i) {
            return p.nome + (i < linha.pontos.length - 1 ? ' <span style="color:#9ca3af">→</span> ' : '');
          }).join('');

    var pontosHTML = linha.pontos.map(function(p, i) {
        var chegando = p.chegando ? 'chegando' : '';
        var badgeClass = p.chegando ? 'chegando' : 'normal';
        var segsInicial = p.segundos;
        var proxHora = calcProximoHorario(segsInicial);
        var chegandoBadge = p.chegando ? '<span class="sr-badge-chegando-label">CHEGANDO</span>' : '';
        return '<div class="sr-ponto-item ' + chegando + '" id="ponto-' + linha.id + '-' + i + '">' +
            '<div class="sr-ponto-esq">' +
                '<div class="sr-ponto-icon">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="currentColor" viewBox="0 0 16 16"><path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/><path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/></svg>' +
                '</div>' +
                '<div class="sr-ponto-info">' +
                    '<span class="sr-ponto-nome">' + p.nome + '</span>' +
                    '<span class="sr-ponto-proximo" id="prox-' + linha.id + '-' + i + '">Próximo às ' + proxHora + '</span>' +
                '</div>' +
            '</div>' +
            '<div class="sr-ponto-dir">' +
                '<span id="badge-cheg-' + linha.id + '-' + i + '">' + chegandoBadge + '</span>' +
                '<span class="sr-badge-tempo ' + badgeClass + '" id="tempo-' + linha.id + '-' + i + '">' + formatarTempo(segsInicial) + '</span>' +
            '</div>' +
        '</div>';
    }).join('');

    var horaAtual = new Date().toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'});

    return '<div class="sr-linha-card">' +
        '<div class="sr-linha-header">' +
            '<div class="sr-linha-icon">' +
                '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 16 16"><path d="M5 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0m8 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-6-1a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2zm1-6c-1.876 0-3.426.109-4.552.226A.5.5 0 0 0 3 4.723v3.554a.5.5 0 0 0 .448.497C4.574 8.891 6.124 9 8 9s3.426-.109 4.552-.226A.5.5 0 0 0 13 8.277V4.723a.5.5 0 0 0-.448-.497A44 44 0 0 0 8 4m0-1c-1.837 0-3.353.107-4.448.22a.5.5 0 1 1-.104-.994A44 44 0 0 1 8 2c1.837 0 3.426.109 4.552.226a.5.5 0 1 1-.104.994A43 43 0 0 0 8 3"/><path d="M15 8a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1V2.64c0-1.188-.845-2.232-2.064-2.372A44 44 0 0 0 8 0C5.9 0 4.208.136 3.064.268 1.845.408 1 1.452 1 2.64V4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v3.5c0 .818.393 1.544 1 2v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V14h6v1.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2c.607-.456 1-1.182 1-2zM8 1c2.056 0 3.71.134 4.822.261.676.078 1.178.66 1.178 1.379v8.86a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 11.5V2.64c0-.72.502-1.301 1.178-1.379A43 43 0 0 1 8 1"/></svg>' +
            '</div>' +
            '<span class="sr-linha-nome">' + linha.nome + '</span>' +
        '</div>' +
        '<div class="sr-linha-body">' +
            '<div class="sr-col-mapa">' +
                '<p class="sr-mapa-label">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="#6b7280" viewBox="0 0 16 16"><path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/></svg>' +
                    ' Mapa da Rota' +
                '</p>' +
                '<div id="mapa-' + linha.id + '" class="sr-mapa-frame"></div>' +
                '<p class="sr-bairros-label" style="margin-top:12px;">&#9679; Bairros atendidos:</p>' +
                '<div class="sr-bairros-tags">' + tagsHTML + '</div>' +
                '<p class="sr-seq-label">Sequência da rota:</p>' +
                '<p class="sr-seq-rota">' + seqHTML + '</p>' +
            '</div>' +
            '<div class="sr-col-horarios">' +
                '<div class="sr-horarios-top">' +
                    '<span class="sr-horarios-titulo">Próximos Horários</span>' +
                    '<span class="sr-atualizado" id="atualiz-' + linha.id + '">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#9ca3af" viewBox="0 0 16 16"><path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9"/><path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"/></svg>' +
                        ' Atualizado: ' + horaAtual +
                    '</span>' +
                '</div>' +
                '<div class="sr-frequencia">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="#166534" viewBox="0 0 16 16"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/></svg>' +
                    ' <strong>Frequência:</strong> A cada ' + linha.frequenciaMin + ' min' +
                '</div>' +
                pontosHTML +
                '<button class="sr-ver-todos" onclick="abrirTodosHorarios(\'' + linha.id + '\')">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg>' +
                    ' Ver todos os horários do dia' +
                '</button>' +
            '</div>' +
        '</div>' +
    '</div>';
}

/* ── Leaflet: monta mapa com marcadores numerados e polyline ── */
function montarMapa(linha) {
    var elId = 'mapa-' + linha.id;
    var el = document.getElementById(elId);
    if (!el) return;

    var map = L.map(elId, { zoomControl: true, scrollWheelZoom: false })
                .setView(linha.centro, linha.zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 19
    }).addTo(map);

    var coords = linha.pontos.map(function(p) { return [p.lat, p.lng]; });

    if (coords.length > 1) {
        desenharRotaReal(map, coords).catch(function() {
            L.polyline(coords, { color: '#2563eb', weight: 4, opacity: 0.85 }).addTo(map);
        });
    }

    linha.pontos.forEach(function(p, i) {
        var num = i + 1;
        var isChegando = p.chegando;
        var cor = isChegando ? '#16a34a' : '#2563eb';
        var iconHtml =
            '<div style="' +
                'width:28px;height:28px;border-radius:50%;' +
                'background:' + cor + ';' +
                'border:3px solid #fff;' +
                'box-shadow:0 2px 6px rgba(0,0,0,0.35);' +
                'display:flex;align-items:center;justify-content:center;' +
                'color:#fff;font-weight:800;font-size:13px;font-family:Inter,sans-serif;' +
            '">' + num + '</div>';

        var icon = L.divIcon({
            html: iconHtml,
            className: '',
            iconSize: [28, 28],
            iconAnchor: [14, 14]
        });

        L.marker([p.lat, p.lng], { icon: icon })
            .addTo(map)
            .bindPopup(
                '<strong>' + p.nome + '</strong><br>' +
                (isChegando ? '<span style="color:#16a34a;font-weight:700;">CHEGANDO</span>' : formatarTempo(p.segundos))
            );
    });

    var bounds = L.latLngBounds(linha.pontos.map(function(p) { return [p.lat, p.lng]; }));
    map.fitBounds(bounds, { padding: [30, 30] });

    _mapaInstancias[linha.id] = map;
}

/* ── Rotas reais via OSRM ── */
function desenharRotaReal(map, coords) {
    var waypointString = coords.map(function(c) {
        return c[1] + ',' + c[0];
    }).join(';');
    var url = 'https://router.project-osrm.org/route/v1/driving/' + waypointString +
        '?overview=full&geometries=geojson&steps=false&annotations=false';

    return fetch(url).then(function(response) {
        if (!response.ok) throw new Error('Não foi possível gerar a rota.');
        return response.json();
    }).then(function(data) {
        if (!data.routes || !data.routes[0] || !data.routes[0].geometry) {
            throw new Error('Rota inválida retornada pelo servidor.');
        }

        var routeLayer = L.geoJSON(data.routes[0].geometry, {
            style: { color: '#2563eb', weight: 4, opacity: 0.85 }
        }).addTo(map);

        if (routeLayer.getBounds && routeLayer.getBounds().isValid()) {
            map.fitBounds(routeLayer.getBounds(), { padding: [30, 30] });
        }
    });
}

/* ── Timer: conta regressiva em tempo real ── */
function iniciarTimer(linha) {
    linha._segs = linha.pontos.map(function(p) { return p.segundos; });
    var frequenciaSegs = linha.frequenciaMin * 60;

    var tick = setInterval(function() {
        var agora = new Date().toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'});

        linha._segs = linha._segs.map(function(s) { return s - 1; });

        linha._segs.forEach(function(segs, i) {
            if (segs <= 0) {
                linha._segs[i] = frequenciaSegs;
                segs = frequenciaSegs;
            }

            var tempoEl     = document.getElementById('tempo-' + linha.id + '-' + i);
            var badgeChegEl = document.getElementById('badge-cheg-' + linha.id + '-' + i);
            var pontoEl     = document.getElementById('ponto-' + linha.id + '-' + i);
            var proxEl      = document.getElementById('prox-' + linha.id + '-' + i);
            if (!tempoEl) return;

            var chegando = segs <= 120;

            tempoEl.textContent = formatarTempo(segs);
            tempoEl.className   = 'sr-badge-tempo ' + (chegando ? 'chegando' : 'normal');

            if (badgeChegEl) {
                badgeChegEl.innerHTML = chegando
                    ? '<span class="sr-badge-chegando-label">CHEGANDO</span>' : '';
            }

            if (pontoEl) {
                pontoEl.classList.toggle('chegando', chegando);
            }

            if (proxEl) {
                proxEl.textContent = 'Próximo às ' + calcProximoHorario(segs);
            }
        });

        var atEl = document.getElementById('atualiz-' + linha.id);
        if (atEl) atEl.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#9ca3af" viewBox="0 0 16 16"><path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9"/><path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"/></svg>' +
            ' Atualizado: ' + agora;

    }, 1000);

    _timersContagem[linha.id] = tick;
}

/* ── Helpers de tempo ── */
function formatarTempo(segs) {
    if (segs <= 60) return 'Em 1 min';
    var m = Math.ceil(segs / 60);
    return 'Em ' + m + ' min';
}

function calcProximoHorario(segs) {
    var d = new Date();
    d.setSeconds(d.getSeconds() + segs);
    return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

/* ── Modal todos os horários ── */
function abrirTodosHorarios(linhaId) {
    var linha = linhasDB.find(function(l) { return l.id === linhaId; });
    if (!linha) return;

    document.getElementById('modalHorariosTitle').textContent = linha.nome;

    var agora = new Date();
    var hAtual = agora.getHours().toString().padStart(2,'0') + ':' + agora.getMinutes().toString().padStart(2,'0');

    var grid = document.getElementById('modalHorariosGrid');
    grid.innerHTML = linha.todosHorarios.map(function(h) {
        var atual = h === hAtual ? 'atual' : '';
        return '<div class="horario-chip ' + atual + '">' + h + '</div>';
    }).join('');

    document.getElementById('modalHorarios').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function fecharModalHorarios() {
    document.getElementById('modalHorarios').style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.addEventListener('click', function(e) {
    var mH = document.getElementById('modalHorarios');
    if (e.target === mH) fecharModalHorarios();
});


// =========================================
//  MODAL DE LOGIN / CADASTRO
// =========================================

const emailsCadastrados = ['teste@email.com', 'usuario@transcamacari.com'];

const planosConfig = {
    mensal: 'mensal (R$ 26,90/mês)',
    anual:  'anual (R$ 225,00/ano)'
};

function abrirModalLogin(plano) {
    fecharModalPlanos();
    document.getElementById('loginPlanoTexto').textContent = planosConfig[plano] || plano;
    trocarAba('entrar');
    mostrarTela('telaLogin');
    document.getElementById('modalLogin').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function fecharModalLogin() {
    document.getElementById('modalLogin').style.display = 'none';
    document.body.style.overflow = 'auto';
    limparErros();
}

function mostrarTela(id) {
    ['telaLogin', 'telaRecuperacao', 'telaCodigo'].forEach(function(t) {
        document.getElementById(t).style.display = (t === id) ? 'block' : 'none';
    });
}

function abrirRecuperacao() {
    limparErros();
    document.getElementById('recEmail').value = '';
    mostrarTela('telaRecuperacao');
}

function voltarLogin() {
    limparErros();
    mostrarTela('telaLogin');
}

function voltarRecuperacao() {
    limparErros();
    mostrarTela('telaRecuperacao');
}

function trocarAba(aba) {
    document.getElementById('tabEntrar').classList.toggle('active', aba === 'entrar');
    document.getElementById('tabCriar').classList.toggle('active', aba === 'criar');
    document.getElementById('formEntrar').style.display = aba === 'entrar' ? 'flex' : 'none';
    document.getElementById('formCriar').style.display  = aba === 'criar'  ? 'flex' : 'none';
    limparErros();
}

function setErro(id, msg) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg;
}

function setInputErro(inputId, temErro) {
    const el = document.getElementById(inputId);
    if (!el) return;
    el.classList.toggle('input-error', temErro);
}

function limparErros() {
    ['errEntrarEmail','errEntrarSenha',
     'errCriarNome','errCriarCpf','errCriarEmail','errCriarSenha',
     'errRecEmail','errRecCodigo'].forEach(function(id) {
        const el = document.getElementById(id);
        if (el) el.textContent = '';
    });
    document.querySelectorAll('.input-error').forEach(function(el) {
        el.classList.remove('input-error');
    });
}

function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function submitEntrar(e) {
    e.preventDefault();
    limparErros();
    var email = document.getElementById('entrarEmail').value.trim();
    var senha = document.getElementById('entrarSenha').value;
    var ok = true;

    if (!email) {
        setErro('errEntrarEmail', 'Preencha o e-mail.');
        setInputErro('entrarEmail', true);
        ok = false;
    } else if (!validarEmail(email)) {
        setErro('errEntrarEmail', 'E-mail inválido.');
        setInputErro('entrarEmail', true);
        ok = false;
    }
    if (!senha) {
        setErro('errEntrarSenha', 'Preencha a senha.');
        setInputErro('entrarSenha', true);
        ok = false;
    }
    if (ok) {
        fecharModalLogin();
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "Dashboard.html";
    }
}

function submitCriar(e) {
    e.preventDefault();
    limparErros();
    var nome  = document.getElementById('criarNome').value.trim();
    var cpf   = document.getElementById('criarCpf').value.trim();
    var email = document.getElementById('criarEmail').value.trim();
    var senha = document.getElementById('criarSenha').value;
    var ok = true;

    if (!nome) {
        setErro('errCriarNome', 'Preencha o nome completo.');
        setInputErro('criarNome', true);
        ok = false;
    }
    if (!cpf) {
        setErro('errCriarCpf', 'Preencha o CPF.');
        setInputErro('criarCpf', true);
        ok = false;
    }
    if (!email) {
        setErro('errCriarEmail', 'Preencha o e-mail.');
        setInputErro('criarEmail', true);
        ok = false;
    } else if (!validarEmail(email)) {
        setErro('errCriarEmail', 'E-mail inválido.');
        setInputErro('criarEmail', true);
        ok = false;
    }
    if (!senha) {
        setErro('errCriarSenha', 'Preencha a senha.');
        setInputErro('criarSenha', true);
        ok = false;
    } else if (senha.length < 6) {
        setErro('errCriarSenha', 'A senha deve ter pelo menos 6 caracteres.');
        setInputErro('criarSenha', true);
        ok = false;
    }
    if (ok) {
        fecharModalLogin();
        window.location.href = "Dashboard.html";
    }
}

function submitRecuperacao(e) {
    e.preventDefault();
    limparErros();
    var email = document.getElementById('recEmail').value.trim();

    if (!email) {
        setErro('errRecEmail', 'Preencha o e-mail.');
        setInputErro('recEmail', true);
        return;
    }
    if (!validarEmail(email)) {
        setErro('errRecEmail', 'E-mail inválido.');
        setInputErro('recEmail', true);
        return;
    }
    if (!emailsCadastrados.includes(email.toLowerCase())) {
        setErro('errRecEmail', 'Este e-mail não está cadastrado.');
        setInputErro('recEmail', true);
        return;
    }

    document.getElementById('emailDestino').textContent = email;
    document.getElementById('recCodigo').value = '';
    mostrarTela('telaCodigo');
}

function reenviarCodigo() {
    setErro('errRecCodigo', '');
    var btn = document.querySelector('#telaCodigo .link-esqueceu');
    var original = btn.textContent;
    btn.textContent = 'Código reenviado!';
    btn.disabled = true;
    setTimeout(function() {
        btn.textContent = original;
        btn.disabled = false;
    }, 3000);
}

function submitCodigo(e) {
    e.preventDefault();
    limparErros();
    var codigo = document.getElementById('recCodigo').value.trim();

    if (!codigo) {
        setErro('errRecCodigo', 'Insira o código recebido.');
        setInputErro('recCodigo', true);
        return;
    }
    if (codigo.length < 6) {
        setErro('errRecCodigo', 'O código deve ter 6 dígitos.');
        setInputErro('recCodigo', true);
        return;
    }
    alert('Código verificado! Agora você pode redefinir sua senha.');
    fecharModalLogin();
}

window.addEventListener('click', function(event) {
    const modalLogin = document.getElementById('modalLogin');
    if (event.target === modalLogin) fecharModalLogin();
});


// =========================================
//  MODAL DE PLANOS
// =========================================

function abrirModalPlanos() {
    window.location.href = 'Premium.html';
}

function fecharModalPlanos() {
    document.getElementById('modalPlanos').style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.addEventListener('click', function(event) {
    const modal = document.getElementById('modalPlanos');
    if (event.target === modal) fecharModalPlanos();
});


// =========================================
//  HERO SLIDER AUTOMÁTICO
// =========================================

(function() {
    const slider = document.getElementById('hero-master');
    if (!slider) return;

    let onSecondSlide = false;

    setInterval(function() {
        if (!onSecondSlide) {
            slider.style.transform = 'translateX(-50%)';
        } else {
            slider.style.transform = 'translateX(0)';
        }
        onSecondSlide = !onSecondSlide;
    }, 10000);
})();


// =========================================
//  AUTOCOMPLETE DE BAIRROS
// =========================================

(function() {
    const bairros = [
        "Abrantes", "Alto da Cruz", "Alto do Cruzeiro", "Alto do Triângulo", "Areias",
        "Arembepe", "Barra do Jacuípe", "Barra do Pojuca", "Camaçari de Dentro", "Catu de Abrantes",
        "Centro", "Coqueiros de Arembepe", "Ficam", "Gleba A", "Gleba B", "Gleba C", "Gleba E",
        "Gleba H", "Gravatá", "Itacimirim", "Jauá", "Lama Preta", "Machadinho", "Monte Gordo",
        "Nova Vitória", "Parafuso", "Parque Nascente do Rio Capivara", "Piaçaveira",
        "Ponto Certo", "Phoc I", "Phoc II", "Phoc III", "Polo Industrial", "Santa Maria", "Verdes Horizontes"
    ];

    const inputBairro = document.getElementById('inputBairro');
    const autocompleteList = document.getElementById('autocomplete-list');

    if (!inputBairro || !autocompleteList) return;

    inputBairro.addEventListener('input', function() {
        const val = this.value.trim();
        autocompleteList.innerHTML = '';

        if (!val) {
            autocompleteList.style.display = 'none';
            return;
        }

        const filtrados = bairros.filter(function(b) {
            return b.toLowerCase().startsWith(val.toLowerCase());
        });

        if (filtrados.length > 0) {
            autocompleteList.style.display = 'block';

            filtrados.forEach(function(bairro) {
                const item = document.createElement('div');
                item.className = 'autocomplete-item';
                item.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#3b82f6" viewBox="0 0 16 16">
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                    </svg>
                    <span>${bairro}</span>
                `;

                item.addEventListener('click', function() {
                    inputBairro.value = bairro;
                    autocompleteList.style.display = 'none';
                });

                item.addEventListener('mouseover', function() { item.style.background = '#f3f4f6'; });
                item.addEventListener('mouseout',  function() { item.style.background = '#fff'; });

                autocompleteList.appendChild(item);
            });
        } else {
            autocompleteList.style.display = 'none';
        }
    });

    document.addEventListener('click', function(e) {
        if (e.target !== inputBairro) autocompleteList.style.display = 'none';
    });
})();


// =========================================
//  BUSCAR ROTAS PRIVADAS (por CPF)
// =========================================

function buscarRotasPrivadas() {
    const cpf = document.getElementById("inputCpf").value.trim();
    const resultado = document.getElementById("rotasPrivadasResultado");
    const empresaNome = document.getElementById("empresaNome");
    const veiculoInfo = document.getElementById("veiculoInfo");
    const mapaDiv = document.getElementById("mapaRotaPrivada");

    if (!cpf) {
        alert("Digite um CPF válido.");
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuariosCadastrados") || "[]");
    const usuario = usuarios.find(u => u.cpf === cpf);

    if (!usuario) {
        resultado.style.display = "block";
        empresaNome.textContent = "Nenhuma empresa cadastrou este CPF.";
        veiculoInfo.textContent = "";
        mapaDiv.innerHTML = "";
        return;
    }

    resultado.style.display = "block";
    empresaNome.textContent = "@Empresa: " + usuario.empresa;

    if (usuario.veiculo) {
        veiculoInfo.textContent = "Veículo: " + usuario.veiculo.nome + " - Placa: " + usuario.veiculo.placa;

        const map = L.map("mapaRotaPrivada").setView([-12.6916, -38.3213], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap"
        }).addTo(map);

        if (usuario.veiculo.rota) {
            L.polyline(usuario.veiculo.rota, { color: "#2563eb", weight: 4 }).addTo(map);
        }
    } else {
        veiculoInfo.textContent = "Nenhum veículo cadastrado.";
        mapaDiv.innerHTML = "";
    }
}