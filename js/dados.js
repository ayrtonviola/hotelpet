const pets = [
  { id: '12349984501', nome: 'Max',    tipo: 'Cachorro', raca: 'Pastor Alemão', tamanho: 'Grande',  proprietario: 'José da Silva' },
  { id: '12349984502', nome: 'Ginger', tipo: 'Gato',     raca: 'Não definida',  tamanho: 'Pequeno', proprietario: 'Ana Souza' },
  { id: '12349984503', nome: 'Thor',   tipo: 'Cachorro', raca: 'Labrador',      tamanho: 'Grande',  proprietario: 'Carlos Lima' },
  { id: '12349984504', nome: 'Mel',    tipo: 'Cachorro', raca: 'Poodle',        tamanho: 'Pequeno', proprietario: 'Ana Souza' },
  { id: '12349984505', nome: 'Luna',   tipo: 'Gato',     raca: 'Siamês',        tamanho: 'Pequeno', proprietario: 'Beatriz Alves' },
  { id: '12349984506', nome: 'Bob',    tipo: 'Cachorro', raca: 'Bulldog',       tamanho: 'Médio',   proprietario: 'José da Silva' },
  { id: '12349984507', nome: 'Nina',   tipo: 'Outro',    raca: 'Coelho Anão',   tamanho: 'Pequeno', proprietario: 'Carlos Lima' }
];

const usuarios = [
  { id: '1001', email: 'joaodasilva@pet.com', nome: 'João da Silva',  funcao: 'gerente',     status: 'ativo',   criadoEm: '2020-02-19' },
  { id: '1002', email: 'maria@pet.com',       nome: 'Maria da Silva', funcao: 'funcionario', status: 'inativo', criadoEm: '2020-02-19' },
  { id: '1003', email: 'jose@pet.com',        nome: 'José da Silva',  funcao: 'cliente',     status: 'ativo',   criadoEm: '2020-05-10' },
  { id: '1004', email: 'ana@pet.com',         nome: 'Ana Souza',      funcao: 'cliente',     status: 'ativo',   criadoEm: '2021-01-15' },
  { id: '1005', email: 'carlos@pet.com',      nome: 'Carlos Lima',    funcao: 'cliente',     status: 'inativo', criadoEm: '2021-03-22' },
  { id: '1006', email: 'beatriz@pet.com',     nome: 'Beatriz Alves',  funcao: 'funcionario', status: 'ativo',   criadoEm: '2021-06-30' }
];

// status possíveis: reservada | em_progresso | finalizada
const reservas = [
  { id: '12349984501', pet: 'Max',    proprietario: 'José da Silva', chegada: '2021-05-02', partida: '2021-05-07', status: 'reservada',    total: 40 },
  { id: '12349984502', pet: 'Ginger', proprietario: 'Ana Souza',     chegada: '2021-05-02', partida: '2021-05-07', status: 'em_progresso', total: 40 },
  { id: '12349984503', pet: 'Thor',   proprietario: 'Carlos Lima',   chegada: '2021-04-10', partida: '2021-04-15', status: 'finalizada',   total: 50 },
  { id: '12349984504', pet: 'Mel',    proprietario: 'Ana Souza',     chegada: '2021-06-01', partida: '2021-06-04', status: 'reservada',    total: 30 },
  { id: '12349984505', pet: 'Luna',   proprietario: 'Beatriz Alves', chegada: '2021-03-05', partida: '2021-03-12', status: 'finalizada',   total: 70 },
  { id: '12349984506', pet: 'Bob',    proprietario: 'José da Silva', chegada: '2021-05-20', partida: '2021-05-25', status: 'em_progresso', total: 50 }
];

// Configurações (usadas na semana 3)
const configuracoes = { valorDiaria: 10, vagasDisponiveis: 3 };

// ---------- helpers ----------
function formatarData(iso) {
  if (!iso) return '';
  const [a, m, d] = iso.split('-');
  return `${d}/${m}/${a}`;
}

function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// "R$ 1.234,50" -> 1234.5 ; vazio -> null
function lerMoeda(texto) {
  const limpo = String(texto).replace(/[^\d,]/g, '').replace(',', '.');
  return limpo === '' ? null : parseFloat(limpo);
}

// minúsculas e sem acento: "Pastor Alemão" -> "pastor alemao"
function normalizar(texto) {
  return String(texto).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function escapeHtml(texto) {
  return String(texto).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}
