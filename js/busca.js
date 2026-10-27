function contem(valor, termo) {
  return !termo || normalizar(valor).includes(normalizar(termo));
}

function linhaVazia(colunas) {
  return `<tr><td colspan="${colunas}" style="text-align:center;padding:16px;">Nenhum resultado encontrado.</td></tr>`;
}

function ligarFiltro(secaoId, pesquisar, limpar) {
  const secao = document.getElementById(secaoId);
  secao.querySelector('.form-actions .btn-primary').addEventListener('click', pesquisar);
  secao.querySelector('.form-actions .btn-secondary').addEventListener('click', limpar);

  // Enter dentro de um campo também pesquisa
  secao.querySelectorAll('.filter-card input').forEach(campo => {
    campo.addEventListener('keydown', e => { if (e.key === 'Enter') pesquisar(); });
  });

  // checkbox do cabeçalho marca/desmarca todas as linhas
  const marcarTodos = secao.querySelector('thead input[type="checkbox"]');
  marcarTodos.checked = false;
  marcarTodos.addEventListener('change', () => {
    secao.querySelectorAll('tbody input[type="checkbox"]').forEach(c => c.checked = marcarTodos.checked);
  });
}

function limparCampos(secaoId) {
  document.querySelectorAll(`#${secaoId} .filter-card input, #${secaoId} .filter-card select`)
    .forEach(campo => campo.value = '');
}

// ==========================================
// PETS
// ==========================================
function renderPets(lista) {
  const tbody = document.querySelector('#pets tbody');
  if (lista.length === 0) { tbody.innerHTML = linhaVazia(7); return; }

  tbody.innerHTML = lista.map(p => `
    <tr data-id="${p.id}">
      <td><input type="checkbox"></td>
      <td>${p.id}</td>
      <td>${escapeHtml(p.nome)}</td>
      <td>${escapeHtml(p.tipo)}</td>
      <td>${escapeHtml(p.raca)}</td>
      <td>${escapeHtml(p.tamanho)}</td>
      <td class="table-actions">
        <a href="#" onclick="navigateTo('editarPet', '${p.id}'); return false;">Editar</a>
        <a href="#" onclick="navigateTo('visualizarPet', '${p.id}'); return false;">Visualizar</a>
      </td>
    </tr>`).join('');
}

function pesquisarPets() {
  const id      = document.getElementById('pet-id').value;
  const raca    = document.getElementById('pet-raca').value;
  const nome    = document.getElementById('pet-nome').value;
  const tamanho = document.getElementById('pet-tamanho').value;

  renderPets(pets.filter(p =>
    contem(p.id, id) && contem(p.raca, raca) && contem(p.nome, nome) && contem(p.tamanho, tamanho)
  ));
}

function limparPets() { limparCampos('pets'); renderPets(pets); }

// ==========================================
// USUÁRIOS
// ==========================================
const NOME_FUNCAO = { gerente: 'Gerente', funcionario: 'Funcionário', cliente: 'Cliente' };

function renderUsuarios(lista) {
  const tbody = document.querySelector('#usuarios tbody');
  if (lista.length === 0) { tbody.innerHTML = linhaVazia(8); return; }

  tbody.innerHTML = lista.map(u => `
    <tr data-id="${u.id}">
      <td><input type="checkbox"></td>
      <td><div class="avatar-circle">👤</div></td>
      <td>${escapeHtml(u.email)}</td>
      <td>${escapeHtml(u.nome)}</td>
      <td>${NOME_FUNCAO[u.funcao]}</td>
      <td><span class="badge ${u.status === 'ativo' ? 'badge-success' : 'badge-danger'}">${u.status === 'ativo' ? 'Ativo' : 'Inativo'}</span></td>
      <td>${formatarData(u.criadoEm)}</td>
      <td class="table-actions">
        <a href="#" onclick="navigateTo('editarPerfil', '${u.id}'); return false;">Editar</a>
        <a href="#" onclick="navigateTo('editarPerfil', '${u.id}'); return false;">Visualizar</a>
      </td>
    </tr>`).join('');
}

function pesquisarUsuarios() {
  const id     = document.getElementById('usr-id').value;
  const email  = document.getElementById('usr-email').value;
  const nome   = document.getElementById('usr-nome').value;
  const status = document.getElementById('usr-status').value;
  const funcao = document.getElementById('usr-funcao').value;
  const [de, ate] = [...document.querySelectorAll('#usuarios .date-inputs input')].map(i => i.value);

  renderUsuarios(usuarios.filter(u =>
    contem(u.id, id) &&
    contem(u.email, email) &&
    contem(u.nome, nome) &&
    (!status || u.status === status) &&
    (!funcao || u.funcao === funcao) &&
    (!de  || u.criadoEm >= de) &&
    (!ate || u.criadoEm <= ate)
  ));
}

function limparUsuarios() { limparCampos('usuarios'); renderUsuarios(usuarios); }

// ==========================================
// RESERVAS
// ==========================================
const BADGE_RESERVA = {
  reservada:    { classe: 'badge-reservada',  texto: 'Reservada' },
  em_progresso: { classe: 'badge-progresso',  texto: 'Em progresso' },
  finalizada:   { classe: 'badge-finalizada', texto: 'Finalizada' }
};

function renderReservas(lista) {
  const tbody = document.querySelector('#reservas tbody');
  if (lista.length === 0) { tbody.innerHTML = linhaVazia(8); return; }

  tbody.innerHTML = lista.map(r => `
    <tr data-id="${r.id}">
      <td><input type="checkbox"></td>
      <td>${r.id}</td>
      <td>${escapeHtml(r.pet)}</td>
      <td>${formatarData(r.chegada)}</td>
      <td>${formatarData(r.partida)}</td>
      <td><span class="badge ${BADGE_RESERVA[r.status].classe}">${BADGE_RESERVA[r.status].texto}</span></td>
      <td>${formatarMoeda(r.total)}</td>
      <td class="table-actions">
        <a href="#" onclick="navigateTo('editReservaEmAndamento', '${r.id}'); return false;">Editar</a>
        <a href="#" onclick="navigateTo('verReserva', '${r.id}'); return false;">Visualizar</a>
      </td>
    </tr>`).join('');
}

function pesquisarReservas() {
  const id           = document.getElementById('res-id').value;
  const proprietario = document.getElementById('res-proprietario').value;
  const status       = document.getElementById('res-status').value;
  const pet          = document.getElementById('res-pet').value;

  const duplos = document.querySelectorAll('#reservas .double-inputs');
  const [de, ate] = [...duplos[0].querySelectorAll('input')].map(i => i.value);
  const [min, max] = [...duplos[1].querySelectorAll('input')].map(i => lerMoeda(i.value));

  renderReservas(reservas.filter(r =>
    contem(r.id, id) &&
    contem(r.proprietario, proprietario) &&
    contem(r.pet, pet) &&
    (!status || r.status === status) &&
    (!de  || r.chegada >= de) &&
    (!ate || r.partida <= ate) &&
    (min === null || r.total >= min) &&
    (max === null || r.total <= max)
  ));
}

function limparReservas() { limparCampos('reservas'); renderReservas(reservas); }

// ==========================================
// INICIALIZAÇÃO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // remove os valores de exemplo ("R$ 0,00") dos campos de total
  limparCampos('reservas');

  ligarFiltro('pets', pesquisarPets, limparPets);
  ligarFiltro('usuarios', pesquisarUsuarios, limparUsuarios);
  ligarFiltro('reservas', pesquisarReservas, limparReservas);

  renderPets(pets);
  renderUsuarios(usuarios);
  renderReservas(reservas);
});
