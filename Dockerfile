FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./

RUN npm i
RUN npm i -g serve

RUN npm run build

CMD ["serve", "-s", "build"]