FROM node:22.18.0-slim

RUN apt-get update && apt-get install curl make -y \
    && apt-get install libsqlite3-dev bzip2 icu-devtools uuid-dev -y

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]