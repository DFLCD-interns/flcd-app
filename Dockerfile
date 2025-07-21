FROM node:23.9.0 AS builder

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build
RUN npm prune --production

FROM node:23.9.0 AS deployer

WORKDIR /app

COPY --from=builder /app/build build/
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

ENV NODE_ENV=production

CMD [ "node", "build" ]