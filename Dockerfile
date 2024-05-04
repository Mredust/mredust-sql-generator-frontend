FROM nginx

WORKDIR /usr/mydata/nginx/html/
USER root

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./dist  /usr/mydata/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
