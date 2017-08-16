FROM node:8-alpine

# Expose is NOT supported by Heroku
# EXPOSE 3000

# Run the image as a non-root user
RUN adduser -D myuser
USER myuser

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN mkdir /app
WORKDIR /app
ADD package.json yarn.lock /app/
RUN yarn --pure-lockfile
ADD . /app

# Run the app.  CMD is required to run on Heroku
# $PORT is set by Heroku
CMD ["yarn", "--bind 0.0.0.0:$PORT", "docker:start"]
