FROM risingstack/alpine:3.3-v4.2.6-1.1.3
COPY package.json package.json
RUN npm install
COPY . .
CMD ["npm", "start"]
