# Use official Node LTS image
FROM node:18

# Set working directory in the container
WORKDIR /app

# Copy package files first (to optimize caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your backend code
COPY . .

# Optional: expose your port
EXPOSE 5001

# Default command to run the server
CMD ["node", "server.js"]