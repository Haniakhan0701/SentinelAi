FROM node:20-alpine
WORKDIR /app

# Copy package.json from the backend folder
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend source code (server.js, data, etc.)
COPY backend/. .

# Start the server
CMD ["node", "server.js"]
