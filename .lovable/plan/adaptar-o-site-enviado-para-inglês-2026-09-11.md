# Adaptar o site enviado para inglês

## Objetivo
Recriar a experiência do arquivo enviado preservando sua estrutura visual e fluxo, traduzindo todo o conteúdo público para inglês e substituindo o checkout antigo pelo novo endereço fornecido.

## Alterações
- Manter o visual escuro, identidade militar, sequência do questionário, imagens e comportamento em etapas.
- Traduzir para inglês natural todos os títulos, perguntas, respostas, diagnósticos, mensagens de carregamento, resultados, botões e textos legais exibidos ao visitante.
- Substituir todas as ocorrências do checkout antigo por `https://seguroamplopay.com/checkout/cmtvzevt9002k01psfvnz7p0i?offer=F7NZQ6X`.
- Preservar os parâmetros de campanha do visitante ao abrir o novo checkout quando aplicável.
- Ajustar tamanhos, espaçamentos e controles para celulares sem alterar a composição original.
- Configurar os metadados da página em inglês e remover identificações genéricas do template.
- Preparar a configuração de publicação para Netlify com navegação funcionando em acesso direto.

## Verificação
- Percorrer o questionário no celular e no computador até o botão final.
- Confirmar que não resta texto público em espanhol ou português.
- Confirmar que nenhum link aponta para o checkout antigo e que o novo endereço abre corretamente.
- Executar os testes automáticos do projeto e validar a configuração de publicação.

## Detalhes técnicos
- Implementação em React/TanStack Start usando os arquivos de imagem recuperados do site original.
- Assets locais/gerenciados para evitar dependência visual do domínio antigo.
- Página principal com metadados próprios em inglês e estrutura semântica acessível.
