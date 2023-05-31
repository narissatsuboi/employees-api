ARG CODE_VERSION=latest
FROM node:${CODE_VERSION}

WORKDIR /peoplesuite
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 5000
CMD [ "node", "server.js" ]