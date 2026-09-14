# Segunda conversão do Diagnóstico Nexo

## Alterações
- Manter intacta a conversão comercial existente `D8I4CkEX5PccENj7jNdE` no formulário “Fale com a Nexo”.
- Adicionar uma função de conversão separada para o Diagnóstico Nexo usando o rótulo `22RYCIjv6PccENj7jNdE` e a mesma tag `AW-18436275672`.
- Disparar essa nova conversão somente quando o salvamento do lead do diagnóstico retornar sucesso.
- Não disparar no acesso à página, início do diagnóstico, cliques ou em caso de falha ao salvar.

## Validação
- Confirmar que cada formulário usa apenas seu próprio rótulo de conversão.
- Verificar que o site continua compilando sem erros.
