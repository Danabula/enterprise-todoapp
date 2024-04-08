FROM alpine:latest

RUN apk update && apk upgrade

RUN apk add mariadb mariadb-client nodejs npm

# install the app
COPY .env .npmrc package* svelte.config.js tsconfig.json vite.config.ts /project
COPY src /project/src
COPY node_modules /project/node_modules
COPY prisma /project/prisma
COPY static /project/static

COPY --chmod=0755 infra/entrypoint.sh /entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]
