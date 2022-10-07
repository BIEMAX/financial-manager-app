# Release 1.1.1 - September 09, 2022

# Melhorias futuras

- Desenvolver filtro por para pesquisar através de tags
- Salvar novas tags por usuário
- Adicionar campo na criação de nova finança para definir se a conta já foi paga
- Desenvolver interface para inadimplentes (devedores)
- Desenvolver relatórios sobre custos e gastos mensais
- Melhorar mensagens de erro e avisos
- Implementar deploys automatizados

# Problemas corrigidos

- Corrigido o problema na página inicial estar duplicando componentes
- Corrigido o problema de não salvar as tags criadas/selecionadas nas novas contas
- Corrigido o problema de não conseguir alterar tags na edição de contas
- Ajustado maioria das mensagens de erro para serem interpretadas
- Resolvido o problema de enviar dados da conta vazio

# Problemas conhecidos

- Em alguns casos excepcionais, não é salvo as tags definidas
- Sistema não divide o valor total da conta pelo número de prestações
- Em alguns casos onde a conta possui valores decimais, o sistema acaba arredondando o valor