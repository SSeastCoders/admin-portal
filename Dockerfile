FROM node:16.5
WORKDIR /app
COPY package.json /app
COPY . /app
RUN npm install
EXPOSE 4222
RUN npm run build

