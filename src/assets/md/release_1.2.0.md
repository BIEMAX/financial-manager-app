## Release 1.2.0 - In development, October, 2022

- Redesenhado a interface do usuário em relação à novas contas

![Img](/assets/md/img_1.2.0/redesign_ux_new_bill.png)

- Redesenhado a interface de login

- [#33 Adicionado um botão para visualizar a senha na tela de login](https://github.com/BIEMAX/financial-manager-app/issues/33)

![Img](/assets/md/img_1.2.0/show_pass_login_screen.png)

- [#39 Adicionado submenus no menu lateral](https://github.com/BIEMAX/financial-manager-app/issues/39)
- [#52 Ao criar uma nova conta, carregar a data de hoje no campo 'data de vencimento'](https://github.com/BIEMAX/financial-manager-app/issues/52)

- Implementado interface para cadastro de nova conta

![Img](/assets/md/img_1.2.0/new_account.png)

- Implementado interface para atualização cadastral

![Img](/assets/md/img_1.2.0/update_account.png)

- [#47 Implementado notas sobre novas versões](https://github.com/BIEMAX/financial-manager-app/issues/47)

- [#54 Apresentado mensagem de erro caso alguma informação não tenha sido preenchida na criação de novas contas](https://github.com/BIEMAX/financial-manager-app/issues/54)


# Melhorias futuras

- Salvar novas tags por usuário
- Desenvolver interface para inadimplentes (devedores)
- Desenvolver um gráfico que demonstra a relação de 'gasto' e 'ganho' através dos meses (de uma maneira geral)

# Problemas corrigidos

- Em alguns casos excepcionais, não é salvo as tags definidas
- [#29 Menu lateral de opções é apresentado antes do login](https://github.com/BIEMAX/financial-manager-app/issues/29)
- [#32 Ao pressionar a tecla enter na tela de login, não acontece nada](https://github.com/BIEMAX/financial-manager-app/issues/32)
- [#40 Ao alterar a dimensão da tela, os relatórios não se auto ajustam](https://github.com/BIEMAX/financial-manager-app/issues/38)
- [#40 Adicionado campo para dividir valor total da conta pelo número de prestações](https://github.com/BIEMAX/financial-manager-api/issues/40)
- [#41 Adicionado campo para definir se a conta já foi paga](https://github.com/BIEMAX/financial-manager-api/issues/41)
- [#42 Ajustado mensagens de retorno](https://github.com/BIEMAX/financial-manager-api/issues/42)
- [#26 Consultas por datas não estão trazendo os resultados esperados](https://github.com/BIEMAX/financial-manager-api/issues/26)
- Corrigido o problema do sistema não dividir o valor total da conta pelo número de prestações
- Corrigido o problema de em algumas situações onde a conta possui valores decimais e o sistema acababa arredondando o valor
- [#44 Relatório de dinheiro restante - Relatório quebrando quando não havia dinheiro de entrada](https://github.com/BIEMAX/financial-manager-api/issues/44)
- [#45 Relatório de dinheiro restante - Valores errados eram mostrandos quando não havia dinheiro de entrada](https://github.com/BIEMAX/financial-manager-api/issues/45)
- Implementado filtro por tags e descrição nas contas mensais

# Problemas conhecidos

- 