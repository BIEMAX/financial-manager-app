## Release 1.2.5 - In development - 27, January, 2023

- Implementado a gestão de inadimplentes (criação, atualização, histórico e remoção)

![New screen](/assets/md/img_1.2.5/defaulters.png)

- Ajustado erros de datas, títulos e descrições nas novidades
- Alterado a criação de novas contas em forma de passos ao invés de abas
- Ao alterar o mês na listagem de contas, automaticamente consultar as despesas
- Agrupado ações em apenas uma coluna (anteriormente, eram em colunas separadas)

![Actions](/assets/md/img_1.2.5/actions.png)

- Implementado diversas melhorias visuais relacionadas às cores de interface
- Melhorado a criação de novos usuários em dispositivos mobile e web

![New users](/assets/md/img_1.2.5/new_user.png)

- Melhorado o acesso às configurações em dispotivos web e mobile
- Implementado o modo escuro e claro através de uma configuração

![Other settings](/assets/md/img_1.2.5/other_settings.png)

- Melhorado as telas para cadastros (novas contas, inadimplentes, tags, atualização cadastral, etc)
- Atualizado as bibliotecas do framework, trazendo melhorias no desempenho e correção de problemas
- Alterado as grades de dados, simplificando a visualização e ajustando o layout
- Adicionado a possibilidade de recolher ou exibir os filtros aplicados, melhorando a visualização

# Problemas corrigidos

- Resolvido o problema de não apresentar mensagem de erro ao usuário na tela de login em caso de servidor indisponível
- Resolvido um problema de não centralizar a barra de progresso circular em alguns dispositivos,
- Resolvido um problema de manter a senha salva após o logout do usuário
- Realizado uma nova bateria de testes e corrigidos diversos problemas em relação a usabilidade
- Resolvido o problema de ao atualizar uma conta como paga na tela inicial, as contas não eram atualizadas
- Resolvido o problema de visualização de novas versões em dispositivos mobile
- Resolvido a coloração dos ícones na tela inicial
- Resolvido erros durante a edição de inadimplentes
- Caso aconteça algum erro durante a criação do usuário, é apresentado um erro e retornado a tela de cadastro [#149](https://github.com/BIEMAX/financial-manager-app/issues/149)

# Problemas conhecidos

- Edição de tags ainda não é possível