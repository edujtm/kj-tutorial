FROM node:15.14.0-alpine3.10

WORKDIR /app
RUN npm install -g @angular/cli
COPY . .
