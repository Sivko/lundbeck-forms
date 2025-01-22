# Устанавливаем базовый образ Node.js
FROM node:18-alpine AS build
# Устанавливаем рабочую директорию
# Копируем конфигурационные файлы
COPY ./config/mime.types /etc/nginx/mime.types
COPY ./config/nginx.conf /etc/nginx/nginx.conf
COPY ./config/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /app

# Копируем package.json и package-lock.json
# COPY package*.json ./

# # Устанавливаем зависимости
# RUN yarn install --frozen-lockfile

# # Копируем остальные файлы приложения
# COPY . .

# # Собираем React приложение
# RUN yarn build

# Устанавливаем образ для веб-сервера
FROM nginx:alpine

# Копируем собранное приложение в папку веб-сервера
COPY ./build /usr/share/nginx/html


# Экспонируем порт
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]