FROM nginx:1.20
LABEL maintainer="admin@mainsoft.org"
COPY ./build/ /usr/share/nginx/html/
EXPOSE 80
