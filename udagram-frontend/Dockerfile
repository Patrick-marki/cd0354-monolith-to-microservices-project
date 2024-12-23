### Build
FROM beevelop/ionic:latest AS ionic

## Create app directory
WORKDIR /usr/src/app

## Install app dependencies
## A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

## Set NODE_OPTIONS to use legacy OpenSSL provider
ENV NODE_OPTIONS=--openssl-legacy-provider

RUN npm ci --legacy-peer-deps

## Bundle app source
COPY . .

## Build the Ionic app
RUN ionic build

### Run
FROM nginx:alpine

## Copy built files to Nginx HTML directory
COPY --from=ionic /usr/src/app/www /usr/share/nginx/html