FROM alpine:latest

RUN apk update && apk upgrade

RUN apk add mariadb mariadb-client nodejs npm sudo

# create node user for webserver
RUN addgroup -g 1001 node && adduser -u 1001 -G node -s /bin/sh -D node

# install the app
COPY --chown=node:node .npmrc package* svelte.config.js tsconfig.json vite.config.ts /project
COPY --chown=node:node src /project/src
COPY --chown=node:node prisma /project/prisma
COPY --chown=node:node static /project/static

RUN cd /project && sudo -u node npm install && npm audit fix

COPY --chmod=0755 infra/entrypoint.sh /entrypoint.sh
RUN cat /entrypoint.sh | tr '\r\n' '\n' > /entrypoint.new.sh && mv /entrypoint.new.sh /entrypoint.sh && chmod +x /entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]
