# Use Node.js 20 as the base image
FROM node:20-slim

# Set the working directory
WORKDIR /app

# Copy everything from your repo into the container
# This ensures that if package.json exists, it is found
COPY . .

# Run install only if package.json exists
RUN if [ -f package.json ]; then npm install; fi

# Set the PORT environment variable
ENV PORT=4000

# Expose the port
EXPOSE 4000

# Start the application
# If your repo doesn't have a "start" script in package.json, 
# you might need to change this to "node index.js" (or whatever your API file is named)
CMD ["npm", "start"]