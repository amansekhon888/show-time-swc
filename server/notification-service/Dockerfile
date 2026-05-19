FROM node:20-alpine

WORKDIR /usr/src/app

COPY server/notification-service/package.json ./
COPY server/notification-service/index.js ./
COPY shared-code ./shared-code

RUN npm install

CMD ["npm", "start"]
