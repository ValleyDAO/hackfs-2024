# Use the official Node.js 14 image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the WebSocket server will run on
EXPOSE 8080

# Define the command to run your script with Hardhat
CMD ["npx", "hardhat", "run", "--network", "galadriel", "scripts/getVerificationv2.ts"]