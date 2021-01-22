FROM node:14.13.1

RUN apt-get update && apt-get install -y mariadb-client

WORKDIR /Mobius

COPY . .

RUN npm install

CMD ["node", "mobius.js"]