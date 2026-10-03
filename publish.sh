#!/bin/bash

# Этот скрипт предназначен исключительно для ручной сборки и публикации Docker-образа с локального компьютера разработчика.

# Почему этот файл всё же иногда оставляют в проекте?
# • Локальная отладка: Разработчики используют его, чтобы быстро проверить, собирается ли Docker-образ локально перед отправкой кода в Git, или для тестирования инфраструктуры на своей машине.
# • Резервный вариант: На случай, если CI/CD сломается, а фикс нужно выкатить экстренно (хотя в DevOps-практиках ручной деплой в обход CI/CD считается плохим тоном, так как нарушает прозрачность версий).

USERNAME="juliebenchuk"
IMAGE="backend"
GIT_SHA=$(git rev-parse --short HEAD)

docker build -t $USERNAME/$IMAGE:$GIT_SHA .
docker tag $USERNAME/$IMAGE:$GIT_SHA $USERNAME/$IMAGE:latest

docker push $USERNAME/$IMAGE:$GIT_SHA
docker push $USERNAME/$IMAGE:latest

echo "Published: $USERNAME/$IMAGE:$GIT_SHA"