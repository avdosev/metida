### STAGE 1: Build ###
FROM node:14 as build
WORKDIR /usr/src/app
COPY . .
RUN cd client && yarn install && yarn build


### STAGE 2: Production Environment ###
FROM mhart/alpine-node:14
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/client/dist /usr/src/app/client/dist
COPY application application
RUN cd application && npm i --only=production


CMD ["node", "application/app.ts" ]