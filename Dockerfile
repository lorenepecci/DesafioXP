FROM node:16-alpine

WORKDIR /app/back

COPY package.json /app/back

RUN npm install

COPY . /app/back/

EXPOSE 3001

ARG JWT_SECRET
ARG DATABASE_URL

RUN npm run predev

CMD ["npm", "run", "dev"]

FROM node:16-alpine AS builder

WORKDIR /app/back

COPY package.json /app/back

RUN npm install

COPY . /app/back/

EXPOSE ${PORT}

ARG JWT_SECRET
ARG DATABASE_URL
ENV NODE_ENV development

RUN npm run build

CMD ["npm", "start"]
