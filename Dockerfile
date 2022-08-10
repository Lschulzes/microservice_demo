FROM node:alpine

ENV CI=true
ENV WDS_SOCKET_PORT=0

WORKDIR /app
COPY package.json ./
RUN yarn
COPY ./ ./

CMD ["yarn", "build"]
CMD ["yarn", "preview"]