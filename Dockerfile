FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./

RUN npm i
RUN npm i -g serve

ENV PORT 8080
EXPOSE 8080

RUN npm run build

CMD ["serve", "-s", "build"]