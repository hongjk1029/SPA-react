FROM node:16-alpine
WORKDIR /app/frontend
COPY package.json ./
COPY package-lock.json ./
RUN npm install --force
COPY . /app/frontend
EXPOSE 3000
CMD ["npm", "start"]