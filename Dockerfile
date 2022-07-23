FROM node:16-alpine AS deps
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install


FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build



FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/dist  ./dist

COPY --from=builder /app/node_modules ./node_modules

EXPOSE ${PORT}

ENV PORT ${PORT}
ENV JWT_SECRET ${JWT_SECRET}
ENV DATABASE_URL ${DATABASE_URL}

CMD ["npm", "start"]
