FROM nginx
MAINTAINER Polyglot polyglot@ordina.nl
EXPOSE 80
COPY build /usr/share/nginx/html
RUN chown -R nginx:nginx /usr/share/nginx/html/*
