FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY backend/package*.json ./
CMD ["node", "server.js"]
