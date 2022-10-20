/**
 * Translate a message by http status code
 * @param statusCode http status code
 * @returns String with message
 */
export let ResponseStatusCode = (statusCode: String) => {
  if (statusCode.startsWith('0')) return 'Servidor indisponível no momento';
  if (statusCode.startsWith('401')) return 'Não autorizado';
  if (statusCode.startsWith('404')) return 'Registro não encontrado com base nos filtros determinados';
  if (statusCode.startsWith('500')) return 'Erro interno do servidor';
  else return 'Parece que algo deu errado';
}

/**
 * Translate a message by 'exception.error' or 'exception.message'
 * @param exception Exception error or message property
 * @returns String with message
 */
export let ExceptionMessageResponse = (error: String) => {
  if (error.startsWith('JWT expired at')) return 'Sua sessão expirou. Faça novamente o login';
  if (error.includes('Unauthorized')) return 'Não autorizado';
  else return 'Parece que algo deu errado';
}

/**
 * Get a solution (for user do) by a message
 * @param error 
 * @returns String with message
 */
export let ExceptionSolutioResponse = (errorMessage: String) => {
  if (errorMessage.toUpperCase().trim().includes('Senha inválida ou diferente do cadastrado'))
    return 'Verifique sua senha e tente novamente. Caso ainda possuir dificuldades, recomendamos trocar sua senha.';
  else if (errorMessage.toUpperCase().trim().includes('')) return ''
  else return '';
}