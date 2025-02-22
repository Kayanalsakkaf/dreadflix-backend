FROM node:22
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 3007
CMD ["npm", "start"]