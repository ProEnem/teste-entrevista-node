FROM node:alpine

WORKDIR /usr/app

COPY package*.json nodemon*.json ./
RUN yarn

COPY . .
EXPOSE 3333

CMD [ "yarn", "dev" ]