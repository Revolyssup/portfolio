FROM nginx:1.17-alpine
EXPOSE 443
COPY build usr/share/nginx/html