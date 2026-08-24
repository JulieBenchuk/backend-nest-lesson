#!/bin/bash
USERNAME="juliebenchuk"
IMAGE="nest-api-image"
GIT_SHA=$(git rev-parse --short HEAD)

docker build -t $USERNAME/$IMAGE:$GIT_SHA .
docker tag $USERNAME/$IMAGE:$GIT_SHA $USERNAME/$IMAGE:latest

docker push $USERNAME/$IMAGE:$GIT_SHA
docker push $USERNAME/$IMAGE:latest

echo "Published: $USERNAME/$IMAGE:$GIT_SHA"