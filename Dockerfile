FROM node:16-alpine

WORKDIR /app/back

COPY package.json /app/back

RUN npm install

COPY . /app/back/

EXPOSE 3001

ARG JWT_SECRET
ARG DATABASE_URL

RUN npm run build

CMD ["npm", "run", "start"]

