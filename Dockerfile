FROM node:14-alpine

WORKDIR /Mobius

COPY . .

RUN npm install

CMD ["node", "mobius.js"]