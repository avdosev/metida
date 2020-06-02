FROM node:13
WORKDIR /usr/src/app


COPY . .
RUN cd client && npm i  && npm run build && cd ..
RUN cd application && npm i --only=production

CMD ["node", "application/app.js" ]