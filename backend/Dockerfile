FROM node:20-alpine
WORKDIR /app

# Copy package.json from the backend folder (relative to repo root)
COPY backend/package*.json ./

RUN npm install

# Copy the rest of the backend source code
COPY backend/. .

CMD ["node", "server.js"]
