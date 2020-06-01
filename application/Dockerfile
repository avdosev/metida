FROM node:13
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm ci --only=production
# сработотает только с нормальным package-lock

# копируем исходный код
COPY . .
EXPOSE 7080
CMD ["node", "app.js" ]