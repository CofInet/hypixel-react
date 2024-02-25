# Stage 1: Build stage
FROM node:latest AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Stage 2: Production stage
FROM node:latest

# Set working directory
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Expose the port the application runs on
EXPOSE 1000

# Define the command to run the application
CMD [ "node", "app.js" ]