export let ResponseStatus = (status_code: number) => {
  switch (status_code) {
    case 0: return 'Servidor indisponível no momento';
    case 404: return 'Registro não encontrado com base nos filtros determinados';
    case 500: return 'Erro interno do servidor';
  }
}