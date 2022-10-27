# Release 1.1.0 - September 02, 2022

# Melhorias futuras

- Desenvolver filtro por para pesquisar através de tags
- Salvar novas tags por usuário
- Adicionar campo na criação de nova finança para definir se a conta já foi paga
- Desenvolver interface para inadimplentes (devedores)
- Página inicial está duplicando componentes
- Desenvolver relatórios sobre custos e gastos mensais
- Melhorar mensagens de erro e avisos
- Implementar deploys automatizados


# Problemas corrigidos

- [#5 Implementado autenticação JWT no login](https://github.com/BIEMAX/financial-manager-api/issues/5)
- [#4 Implementado auto deploys em novas versões](https://github.com/BIEMAX/financial-manager-api/issues/4)
- [#18 Ajustado formatação de data](https://github.com/BIEMAX/financial-manager-api/issues/18)
- [#14 Adicionado validação a fim de evitar a adição da mesma tag na criação de uma nova fatura](https://github.com/BIEMAX/financial-manager-app/issues/14)
- [#19 É possível de se acessar páginas sem efetuar o login](https://github.com/BIEMAX/financial-manager-app/issues/19)
- [#21 Clicar no botão da página inicial retorna à página de login](https://github.com/BIEMAX/financial-manager-app/issues/22)
- [#23 Pesquisa de contas está enviando um mês anterior ao corrente](https://github.com/BIEMAX/financial-manager-app/issues/23)
- [#24 Não é possível pesquisar contas sem uma data selecionada](https://github.com/BIEMAX/financial-manager-app/issues/24)
- [#25 Ao efetuar login, é apresentado mensagem de erro e sucesso](https://github.com/BIEMAX/financial-manager-app/issues/25)

# Problemas conhecidos

- Em alguns casos excepcionais, não é salvo as tags definidas
- Sistema não divide o valor total da conta pelo número de prestações
- Em alguns casos, mensagens de erro/aviso não são possíveis de ler
- Em alguns casos, é enviado dados da conta vazio e a mesma acaba sendo perdida
- Em alguns casos onde a conta possui valores decimais, o sistema acaba arredondando o valor