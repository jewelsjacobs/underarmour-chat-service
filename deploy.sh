#!/bin/bash
docker build -t jewelsjacobs/underarmour-chat-service .
docker push jewelsjacobs/underarmour-chat-service

ssh deploy@$DEPLOY_SERVER << EOF
docker pull jewelsjacobs/underarmour-chat-service
docker stop underarmour-chat-service || true
docker rm underarmour-chat-service || true
docker rmi jewelsjacobs/underarmour-chat-service:current || true
docker tag jewelsjacobs/underarmour-chat-service:latest jewelsjacobs/underarmour-chat-service:current
docker run -d --restart always --name underarmour-chat-service -p 3000:3000 jewelsjacobs/underarmour-chat-service:current
EOF
