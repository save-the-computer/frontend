# --------------------
# Build stage
# --------------------
FROM node:16-alpine as build

WORKDIR /app
ENV NODE_ENV production
COPY package.json .
COPY yarn.lock .
RUN yarn install --production
COPY . .
RUN yarn build

# --------------------
# nginx stage
# --------------------
FROM nginx:alpine

ENV NODE_ENV production
COPY --from=build /app/build /usr/share/nginx/html

# react-router 사용 시 default.conf 삭제해야 함
# 아래의 경우 기존의 default.conf를 Overwrite하는 형식
# https://medium.com/swlh/dockerizing-a-react-application-with-docker-and-nginx-19e88ef8e99a
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3241

CMD ["nginx", "-g", "daemon off;"]