export let ResponseStatus = (status_code: String) => {
  if (status_code.startsWith('JWT expired at')) return 'Sua sessão expirou. Faça novamente o login';
  if (status_code.startsWith('0')) return 'Servidor indisponível no momento';
  if (status_code.startsWith('404')) return 'Registro não encontrado com base nos filtros determinados';
  if (status_code.startsWith('500')) return 'Erro interno do servidor';
}