FROM node:16.5
WORKDIR /app
COPY package.json /app
COPY . /app
RUN npm install
EXPOSE 4222
RUN npm run build


# from riley
# FROM node AS build
# WORKDIR /app
# COPY ./ /app
# RUN npm install
# RUN npm run build

# FROM nginx:stable-alpine
# Copy --from=build /app/dist/admin-portal /usr/share/nginx/html
# EXPOSE 4222