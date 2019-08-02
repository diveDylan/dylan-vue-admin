FROM u-registry-name

COPY dist /var/www/html/
# node 自定义node启动
# COPY node /var/www/
# WORKDIR /var/www
# RUN npm install
# EXPOSE 9092
# CMD ["npm", "start"]

# nginx start
COPY nginx_app.conf /etc/nginx/conf.d/
# if default port cannot work
Run rm -f /etc/nginx/sites-enabled/default
EXPOSE 9092
CMD ["nginx", "-g", "daemon off;"]


