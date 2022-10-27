# Release 1.0.0 - August 31, 2022

- Implementado menu lateral para facilitar navegação.

![Interface](/assets/md/img_1.0.0/financials_list.png)

- Implementado listagem de finanças através dos filtros 'descrição' e 'mês e ano'.
- Adicionado opção para editar uma finança
- Adicionado opção para excluir uma finança

![Financials](/assets/md//img_1.0.0/financials_list.png)

- Implementado interface para cadastro de novas finanças
- Implementado campo para definir se o gasto foi de saída (débito) ou de entrada (crédito)
- Adicionado campo 'prestações'
- Adicionado listagem de tags

![New financial](/assets/md//img_1.0.0/new_financial.png)

# Melhorias futuras

- Desenvolver filtro por para pesquisar através de tags
- Salvar novas tags por usuário
- Adicionar campo na criação de nova finança para definir se a conta já foi paga
- Desenvolver interface para inadimplentes (devedores)
- Página inicial está duplicando componentes
- Desenvolver relatórios sobre custos e gastos mensais
- Melhorar mensagens de erro e avisos
- Implementar deploys automatizados

# Problemas conhecidos

- Em alguns casos excepcionais, não é salvo as tags definidas
- Em alguns casos durante o login, é apresentado mensagem de erro e sucesso
- Sistema não divide o valor total da conta pelo número de prestações
- É possível de se acessar páginas sem efetuar o login
- Possível brecha encontrada após efetuar o login
- Em alguns casos, mensagens de erro/aviso não são possíveis de ler
- Em alguns casos, é enviado dados da conta vazio e a mesma acaba sendo perdida
- Em alguns casos onde a conta possui valores decimais, o sistema acaba arredondando o valor