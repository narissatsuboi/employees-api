FROM node:lts-bullseye-slim
WORKDIR /peoplesuite
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "node", "server.js" ]