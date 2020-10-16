FROM node:14.13.1

WORKDIR /Mobius

COPY . .

RUN npm install

CMD ["node", "mobius.js"]