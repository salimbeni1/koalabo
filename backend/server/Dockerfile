FROM node:17-alpine3.13

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN npm install --save express@4.18.1
RUN npm install --save graphql@15.8.0
RUN npm install --save express-graphql@0.12.0
RUN npm install --save graphql-upload@13.0.0
RUN npm install --save mongoose
RUN npm install --save cors
RUN npm install --save dotenv

EXPOSE 8080

CMD [ "node", "server.js" ]