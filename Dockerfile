# builder
FROM node:24-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

#Никаких ENV NODE_ENV=production, ENV PORT=3000
#Образ намеренно environment-agnostic — один и тот же тег можно гонять в staging, production и CI,
#передавая NODE_ENV, PORT, DATABASE_URL и др через docker run -e KEY=... или --env-file.
#Если зашить эти ENV в Dockerfile, переопределить можно,
#но придётся помнить — а это лишний шанс выстрелить себе в ногу.

COPY . .
RUN npm run build
# prune удаляет всё из devDependencies, оставляя только то, что нужно в проде
RUN npm prune --omit=dev

# runner
FROM node:24-alpine AS runner
WORKDIR /app

# Node читает из package.json поле "type" и метаданные при запуске
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Инструкция USER node переключает контекст на встроенного в образ node-alpine обычного пользователя node,
# у которого нет административных прав.
USER node

EXPOSE 3000
# важно использовать именно CMD - exec-форма, чтобы Node стал PID 1 и получал сигналы SIGTERM напрямую от Docker
# (важно для корректного docker stop)
CMD ["node", "dist/main.js"]