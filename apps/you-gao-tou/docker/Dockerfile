FROM nginx:latest

COPY ./apps/you-gao-tou/docker/nginx.conf /etc/nginx/nginx.conf

# test
# COPY ./apps/you-gao-tou/dist /usr/share/nginx/html/test/activity_you_gao_tou/h5/
# production
COPY ./apps/you-gao-tou/dist /usr/share/nginx/html/activity_you_gao_tou/h5/

WORKDIR /usr/share/nginx/html
