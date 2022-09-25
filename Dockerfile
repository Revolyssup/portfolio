FROM nginx:1.17-alpine
EXPOSE 443
COPY nginx/default.conf /etc/nginx/conf.d
COPY build usr/share/nginx/html