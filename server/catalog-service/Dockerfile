FROM node:20-alpine

WORKDIR /usr/src/app

COPY server/catalog-service/package.json ./
COPY server/catalog-service/index.js ./
COPY server/catalog-service/controllers ./controllers
COPY server/catalog-service/models ./models
COPY server/catalog-service/routes ./routes
COPY shared-code ./shared-code

RUN npm install

EXPOSE 5001

CMD ["npm", "start"]
