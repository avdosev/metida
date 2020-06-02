### STAGE 1: Build ###
FROM node:9.11.1 as build
WORKDIR /usr/src/app
COPY . .
RUN cd client && ls && npm install --silent && npm install react-scripts -g --silent && npm run build


### STAGE 2: Production Environment ###
FROM node:13
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/build /usr/src/app/build
COPY application application
RUN cd application && npm i --only=production

CMD ["node", "application/app.js" ]