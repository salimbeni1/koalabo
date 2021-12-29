FROM node:17-alpine3.13

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN npm install express express-graphql graphql mongoose cors dotenv graphql-upload --save


EXPOSE 8080

CMD [ "node", "server.js" ]