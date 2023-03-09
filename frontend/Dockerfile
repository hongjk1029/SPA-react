FROM node:alpine
WORKDIR /app/frontend
COPY package.json ./
COPY package-lock.json ./
COPY . /app/frontend
RUN yarn
EXPOSE 3000
CMD ["yarn", "start"]