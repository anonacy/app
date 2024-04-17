FROM node:20-alpine

ENV VITE_ENVIRONMENT='production'
ENV VITE_API_URL='127.0.0.1'
ENV VITE_API_PORT='3001'

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
# WORKDIR /app
WORKDIR /usr/src/anonacy-app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm ci

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

EXPOSE 8080

CMD npm run build && http-server dist