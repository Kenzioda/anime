# Use Node.js 20 as the base image
FROM node:20-slim

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your API code
COPY . .

# Set the PORT environment variable
ENV PORT=4000

# Expose the port
EXPOSE 4000

# Start the application
CMD ["npm", "start"]