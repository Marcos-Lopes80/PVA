# PVA SPED Web Dashboard

Um aplicativo web interativo para validação de arquivos SPED (Sistema Público de Escrituração Digital) brasileiro.

## Funcionalidades

- Upload de arquivos SPED (.txt)
- Dashboard com status de validação:
  - **Vermelho**: Erros críticos
  - **Amarelo**: Avisos com sugestões de IA
  - **Verde**: Validado
- Visualizações gráficas dos blocos e status
- Sugestões automáticas baseadas em IA simples

## Como Usar

1. Abra o `index.html` em um navegador web.
2. Clique em "Escolher Arquivo" e selecione um arquivo SPED.
3. Clique em "Processar SPED" para analisar o arquivo.
4. Visualize o status, gráficos e sugestões.

## Hospedagem Pública

Para tornar público, hospede os arquivos em um servidor web ou use GitHub Pages.

1. Faça upload dos arquivos para um repositório GitHub.
2. Ative GitHub Pages nas configurações do repositório.
3. O app estará disponível em `https://seu-usuario.github.io/seu-repo/`.

## Dependências

- Chart.js (incluído via CDN)

## Troubleshooting

- Certifique-se de que o arquivo SPED é um .txt válido.
- Se o navegador bloquear o upload, verifique as configurações de segurança.