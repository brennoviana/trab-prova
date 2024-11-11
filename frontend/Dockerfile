FROM node:20.16.0

WORKDIR /usr/src/app

COPY ./frontend/package*.json ./

RUN npm install

COPY ./frontend ./

EXPOSE 4000

CMD ["npm", "run", "start"]
