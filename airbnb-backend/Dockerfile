FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /src

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install NestJS dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that your NestJS application runs on
EXPOSE 3000

# Define the command to run your NestJS application using npm
CMD ["npm", "run", "start:prod"]
