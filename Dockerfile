FROM node:lts-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine AS production

RUN addgroup -g 1001 -S appgroup \
    && adduser -S -D -H -u 1001 -G appgroup appuser

RUN mkdir -p /var/cache/nginx /var/run/nginx \
    && chown -R appuser:appgroup /var/cache/nginx /var/run/nginx

RUN mkdir -p /var/run/nginx \
    && chown -R appuser:appgroup /var/run/nginx
RUN chmod -R 755 /var/cache/nginx /var/run/nginx

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/domain.conf /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf

RUN chown -R appuser:appgroup /usr/share/nginx/html

EXPOSE 80
USER appuser

CMD ["nginx", "-g", "daemon off;"]