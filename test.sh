#!/bin/bash

source ./.env.shell

# Subscriptions

#serverless invoke local -f subscription --data '{"body": "{\"email\":\"'$EMAIL'\", \"action\":\"subscribe\"}"}' --stage production
#serverless invoke local -f validateEmail --data '{"Records": [{"body": "{\"email\":\"'$EMAIL'\", \"action\":\"subscribe\"}"}]}' --stage production
#serverless invoke local -f confirm -d "{\"queryStringParameters\": {\"token\": \"$TOKEN\"}}" --stage production


## Funções de contato
#serverless invoke local -f contact --data '{"body": "{\"name\":\"John Doe\", \"email\":\"x@x.com\", \"subject\":\"Assunto do Contato\", \"message\":\"Mensagem de teste.\"}"}' --stage production
#serverless invoke local -f sendContactEmail -d '{"Records": [{"body": "{\"name\":\"John Doe\", \"email\":\"x@x.com\", \"subject\":\"Assunto do Contato\", \"message\":\"Mensagem de teste.\"}"}]}' --stage production
