FROM node:20-alpine

WORKDIR /usr/src/app

COPY server/api-gateway/package.json ./
COPY server/api-gateway/index.js ./
COPY server/api-gateway/routes ./routes
COPY server/api-gateway/middleware ./middleware
COPY shared-code ./shared-code

RUN npm install

EXPOSE 5000

CMD ["npm", "start"]
