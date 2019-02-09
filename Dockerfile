FROM node:10

# Create work directory and copy over dependency
WORKDIR /user/app

COPY package.json /user/app
RUN yarn install

COPY . /user/app

CMD yarn start

# Expose Port number Host OS 8082
# EXPOSE 8082