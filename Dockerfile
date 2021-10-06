FROM node:16-alpine

RUN mkdir -p /usr/src/main
WORKDIR /usr/src/main

ENV NPM_CONFIG_LOGLEVEL warn
COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install
COPY . .
CMD ["npm", "start"]