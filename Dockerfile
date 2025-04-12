# Используем официальный образ с Node.js
FROM mcr.microsoft.com/playwright:v1.39.0-jammy

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем все файлы проекта в контейнер
COPY . .

# Открываем порты для Playwright и тестов
EXPOSE 3000


# Запускаем тесты Playwright при запуске контейнера
CMD ["npx", "playwright", "test"]