function voltarParaHome() {
    localStorage.setItem('usuarioVeioDoPrivado', 'true');
    window.location.href = 'index.html';
}

function trocarTabDash(aba) {
        document.getElementById('tabUsuarios').classList.toggle('active', aba === 'usuarios');
        document.getElementById('tabVeiculos').classList.toggle('active', aba === 'veiculos');
        document.getElementById('painelUsuarios').style.display = aba === 'usuarios' ? 'flex' : 'none';
        document.getElementById('painelVeiculos').style.display = aba === 'veiculos' ? 'flex' : 'none';
    }




    // Funções do Modal de Usuário
    function abrirModalAdicionarUsuario() { document.getElementById('modalAdicionarUsuario').style.display = 'flex'; }
    function fecharModalAdicionarUsuario() { document.getElementById('modalAdicionarUsuario').style.display = 'none'; }




    // Funções do Novo Modal de Veículo
    function abrirModalAdicionarVeiculo() { document.getElementById('modalAdicionarVeiculo').style.display = 'flex'; }
    function fecharModalAdicionarVeiculo() { document.getElementById('modalAdicionarVeiculo').style.display = 'none'; }

