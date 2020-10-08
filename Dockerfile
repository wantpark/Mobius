FROM node:14-alpine

WORKDIR /Mobius

COPY . .

CMD ["node", "mobius.js"]