#!/bin/bash
docker build -t {docker-login}/underarmour-chat-service .
docker push {docker-login}/underarmour-chat-service

ssh deploy@$DEPLOY_SERVER << EOF
docker pull {docker-login}/underarmour-chat-service
docker stop underarmour-chat-service || true
docker rm underarmour-chat-service || true
docker rmi {docker-login}/underarmour-chat-service || true
docker tag {docker-login}/underarmour-chat-service:latest {docker-login}/underarmour-chat-service:current
docker run -d --restart always --name {docker-login}/underarmour-chat-service -p 3000:3000 {docker-login}/underarmour-chat-service:current
EOF
