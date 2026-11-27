FROM node:24-bookworm-slim

WORKDIR /user/app

COPY package.json package-lock.json ./
RUN PUPPETEER_SKIP_DOWNLOAD=true npm ci

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
