## Newsletter Inscrição: AWS Serverless

<p align="center">
<br/>
<a href="https://www.serverless.com/"><img src="https://img.shields.io/badge/Serverless-Framework-ff4785?style=flat&logo=serverless" alt="Serverless Framework" /></a>
<a href="https://vitest.dev/"><img src="https://img.shields.io/badge/vitest-testing-green?style=flat&logo=vitest&logoColor=green" alt="Vitest" /></a>
<a href="https://aws.amazon.com/lambda/"><img src="https://img.shields.io/badge/AWS-Lambda-ff9900?style=flat&logo=amazon-aws" alt="AWS Lambda" /></a>
<a href="https://aws.amazon.com/api-gateway/"><img src="https://img.shields.io/badge/AWS-API%20Gateway-ff9900?style=flat&logo=amazon-aws" alt="AWS API Gateway" /></a>
<a href="https://aws.amazon.com/sqs/"><img src="https://img.shields.io/badge/AWS-SQS-ff9900?style=flat&logo=amazon-aws" alt="AWS SQS" /></a>
<a href="https://aws.amazon.com/dynamodb/"><img src="https://img.shields.io/badge/AWS-DynamoDB-ff9900?style=flat&logo=amazon-aws" alt="AWS DynamoDB" /></a>
<a href="https://aws.amazon.com/ses/"><img src="https://img.shields.io/badge/AWS-SES-ff9900?style=flat&logo=amazon-aws" alt="AWS SES" /></a>
<br/>
<br/>
</p>

## Introdução

Neste projeto, utilizamos o AWS Serverless Framework para criar um sistema de inscrição em newsletter e formulario de contato para o portal de notícias [Exploradores Modernos](https://exploradoresmodernos.com.br). Integrando serviços AWS como Lambda, API Gateway, SQS, DynamoDB e SES, conseguimos construir um fluxo eficiente conforme descrito abaixo.

## Regras de negócio

### Newsletter

1. **Primeira requisição (API Gateway):**
   Uma API Gateway da AWS é configurada para receber uma requisição POST com o e-mail de um usuário que deseja se inscrever na newsletter.

2. **Primeira Fila (SQS):**
   O e-mail recebido é adicionado a uma fila do SQS.

3. **Lambda de Validação:**
   Esta fila aciona uma função Lambda que:

   - Valida o formato do e-mail.
   - Cria um token JWT com validade de 24 horas.
   - Envia um e-mail de confirmação para o endereço fornecido, contendo um link com o token JWT.

4. **Clique no Link:**
   O usuário recebe o e-mail e clica no link de confirmação que contém o token JWT.

5. **Segunda requisição (API Gateway):**
   Ao clicar no link, a API Gateway é acionada para receber uma requisição GET com o token, verifica sua validade e, se for válido, envia o e-mail para a segunda fila.

6. **Segunda Fila (SQS):**
   Esta segunda fila dispara uma nova função Lambda de verificação.

7. **Lambda de Verificação:**
   O e-mail é salvo no DynamoDB como um inscrito confirmado.
8. **Terceira Fila (SQS):**
   Após falha de 5 tentativas as menssagens são enviadas para uma fila de DLQ.

### Formulário de Contato

1. **Requisição (API Gateway):**
   - Uma API Gateway da AWS é configurada para receber uma requisição POST do formulário de contato.
   - Os campos típicos incluem nome, e-mail, assunto e mensagem.
2. **Lambda de Processamento:**
   - A requisição aciona esta função Lambda.
   - Valida os campos recebidos, como formato do e-mail e presença de todos os campos obrigatórios.
   - Prepara a mensagem formatada para envio por e-mail e a coloca em uma fila SQS para processamento posterior.
3. **Fila de Contato (SQS):**
   - A mensagem formatada é adicionada a esta fila.
   - O processamento assíncrono garante rápida resposta ao usuário no front-end.
4. **Lambda de Envio de E-mail:**
   - Acionada pela mensagem na fila.
   - Usa o Amazon SES para enviar a mensagem ao destinatário apropriado (por exemplo, equipe de suporte ou administrador do site).
5. **Fila DLQ (SQS):**
   - Em caso de falhas no envio do e-mail após várias tentativas, a mensagem é enviada para esta fila.
   - Análise e ação corretiva podem ser tomadas para mensagens nesta fila.

## Iniciar

Instale as dependências e execute o comando abaixo no terminal:

```bash
npm install && serverless deploy --stage production
```

Após a execução do comando, será exibido no terminal as variáveis de ambiente como rotas, chave de api, etc. Guarde a chave de API pois ela será exibida apenas uma vez. Para encontrar a chave novamente acesse a AWS e procure pelo serviço API Gateway.

## Configuração

Após a instalação, configure as variáveis de ambiente e renomeie os arquivos de exemplo.

1. `.env.example -> .env`
2. `.env.example.shell -> .env.shell`
3. `credentials.example -> credentials`

## Rotas

Para visualizar as rotas disponíveis, execute o comando abaixo no terminal:

```bash
serverless info --stage production
```

## Testes

Para executar os testes do vite para alguns serviços usados pelas funções lambdas, execute o comando abaixo no terminal:

```bash
npm test
```

## Teste Local das Funções Lambda

Para testar as funções lambda localmente, execute o comando abaixo no terminal:

```bash
./test.sh
```

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENÇA](./LICENCE.MD) para mais detalhes.
