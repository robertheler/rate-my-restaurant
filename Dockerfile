FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY loaderio-35191e4f7dafe6433e6c5622632edf99.html /var/www
