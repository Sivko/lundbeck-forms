# Устанавливаем базовый образ Node.js
FROM node:16 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы приложения
COPY . .

# Собираем React приложение
RUN npm run build

# Устанавливаем образ для веб-сервера
FROM nginx:alpine

# Копируем собранное приложение в папку веб-сервера
COPY --from=build /app/build /usr/share/nginx/html

# Экспонируем порт
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]