#!/bin/bash

source ./.env.shell

serverless invoke local -f subscribe --data '{"body": "{\"email\":\"'$EMAIL'\"}"}' --stage production
serverless invoke local -f validateEmail --data '{"Records": [{"body": "{\"email\":\"'$EMAIL'\"}"}]}' --stage production
serverless invoke local -f confirm -d "{\"queryStringParameters\": {\"token\": \"$TOKEN\"}}" --stage production
serverless invoke local -f verifyEmail -d '{"Records": [{"body": "{\"email\":\"'$EMAIL'\"}"}]}' --stage production
serverless invoke local -f contact --data '{"body": "{\"name\":\"John Doe\", \"email\":\"x@x.com\", \"subject\":\"Assunto do Contato\", \"message\":\"Mensagem de teste.\"}"}' --stage production
serverless invoke local -f sendContactEmail -d '{"Records": [{"body": "{\"name\":\"John Doe\", \"email\":\"x@x.com\", \"subject\":\"Assunto do Contato\", \"message\":\"Mensagem de teste.\"}"}]}' --stage production




