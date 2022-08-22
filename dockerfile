FROM node:16-alpine AS builder
WORKDIR /build

COPY . .

RUN npm ci
RUN npm run compile

CMD ["npm", "start"]
