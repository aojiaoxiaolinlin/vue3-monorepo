FROM nginx:latest

COPY ./apps/app-one/docker/nginx.conf /etc/nginx/nginx.conf

COPY ./apps/app-one/dist /usr/share/nginx/html

WORKDIR /usr/share/nginx/html
