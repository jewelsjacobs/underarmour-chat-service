#!/bin/bash
docker login jacobsregistry.azurecr.io -u jacobsregistry -p p+/n3G=+1f7/x=+m5==LH=+XWyIhQD=s
docker build -t underarmour-chat-service .
docker tag underarmour-chat-service:latest jacobsregistry.azurecr.io/underarmour-chat-service:current
docker push jacobsregistry.azurecr.io/underarmour-chat-service
docker pull jacobsregistry.azurecr.io/underarmour-chat-service:current
docker stop underarmour-chat-service || true
docker rm underarmour-chat-service || true
docker rmi underarmour-chat-service:current || true
docker run -d --restart always --name underarmour-chat-service -p 3000:3000 jacobsregistry.azurecr.io/underarmour-chat-service:current
