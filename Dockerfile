# Use the latest Node.js image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Enable Corepack and set the project Yarn version
RUN corepack enable && corepack prepare yarn@3.2.3 --activate

# Build the application
RUN yarn

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
