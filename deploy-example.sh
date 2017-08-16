#!/bin/bash
docker build -t {docker-login}/underarmour-chat-service .
docker push {docker-login}/underarmour-chat-service

docker login --username={heroku login} --password={heroku auth token} registry.heroku.com << EOF
docker push registry.heroku.com/underarmour-chat-service/web
docker pull {docker-login}/underarmour-chat-service
docker stop underarmour-chat-service || true
docker rm underarmour-chat-service || true
docker rmi {docker-login}/underarmour-chat-service || true
docker tag {docker-login}/underarmour-chat-service:latest {docker-login}/underarmour-chat-service:current
docker tag {docker-login}/underarmour-chat-service:latest registry.heroku.com/underarmour-chat-service/web
docker run -d --restart always --name {docker-login}/underarmour-chat-service -p 3000:3000 {docker-login}/underarmour-chat-service:current
EOF
