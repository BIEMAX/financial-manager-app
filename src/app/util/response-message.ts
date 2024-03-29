/**
 * Translate a message by http status code
 * @param statusCode http status code
 * @returns String with message
 */
export let ResponseStatusCode = (statusCode: string) => {
  if (statusCode.trim() == '0') return 'Servidor indisponível no momento';
  if (statusCode.includes('401')) return 'Não autorizado';
  if (statusCode.trim() == '404') return 'Registro não encontrado com base nos filtros determinados';
  if (statusCode.trim() == '500') return 'Erro interno do servidor';
  else return '';
}

/**
 * Translate a message by 'exception.error' or 'exception.message'
 * @param exception Exception error or message property
 * @returns String with message
 */
export let ExceptionMessageResponse = (error: string) => {
  if (error.startsWith('JWT expired at')) return 'Sua sessão expirou. Faça novamente o login';
  if (error.includes('Unauthorized')) return 'Não autorizado';
  else return 'Parece que algo deu errado';
}

/**
 * Get a solution (for user do) by a message
 * @param error 
 * @returns String with message
 */
export let ExceptionSolutionResponse = (errorMessage: string) => {
  if (errorMessage.toLowerCase().trim().includes('senha inválida ou diferente do cadastrado'))
    return 'Verifique sua senha e tente novamente. Caso ainda possuir problemas, recomendamos trocar sua senha.';
  else if (errorMessage.toLowerCase().trim().includes('não pode ser vazio ou nulo'))
    return 'Preencha o campo informado corretamente e tente novamente';
  else if (errorMessage.toLowerCase().trim().includes('token do usuario expirado'))
    return 'Recarregue a página ou efetue novamente o login';
  else return 'Infelizmente ainda não há uma solução para este problema';
}