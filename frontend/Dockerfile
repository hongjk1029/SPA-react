FROM node:16-alpine
WORKDIR /app/frontend
COPY package.json ./
COPY package-lock.json ./
COPY . /app/frontend
RUN npm install --force
EXPOSE 3000
CMD ["npm", "start"]