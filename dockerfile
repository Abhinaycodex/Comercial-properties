FROM node:20-alpine

# Set working directory
WORKDIR /myapp

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (change if needed)
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]

