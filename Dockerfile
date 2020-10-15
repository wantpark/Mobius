FROM node:7.6

WORKDIR /Mobius

COPY . .

RUN npm install

CMD ["node", "mobius.js"]