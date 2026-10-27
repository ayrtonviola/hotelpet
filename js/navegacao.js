const MENU_POR_TELA = {
  'nav-pets':           ['pets', 'cadastrarPet', 'editarPet', 'visualizarPet'],
  'nav-usuarios':       ['usuarios', 'cadastrarUsuario', 'editarPerfil'],
  'nav-configuracoes':  ['configuracoes'],
  'nav-reservas':       ['reservas', 'fazerReserva', 'editReservaEmAndamento', 'verReserva']
};

function navigateTo(pageId, id) {
  document.querySelectorAll('.standalone-page, .page').forEach(p => p.classList.remove('active-page'));

  if (pageId === 'login' || pageId === 'criarConta') {
    document.getElementById('app-layout').style.display = 'none';
    document.getElementById(pageId).classList.add('active-page');
  } else {
    document.getElementById('app-layout').style.display = 'flex';

    const tela = document.getElementById(pageId);
    if (tela) tela.classList.add('active-page');

    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    for (const [menuId, telas] of Object.entries(MENU_POR_TELA)) {
      if (telas.includes(pageId)) {
        document.getElementById(menuId)?.classList.add('active');
      }
    }
  }

  window.scrollTo(0, 0);
}
