FROM node:8

RUN mkdir -p /usr/src/app

COPY . /usr/src/app/

WORKDIR /usr/src/app

RUN npm install

EXPOSE 3339

CMD npm run watch