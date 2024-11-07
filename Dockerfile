# Use the latest Node.js image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock first to leverage Docker cache
COPY package.json yarn.lock ./

# Enable Corepack and set the project Yarn version
RUN corepack enable && corepack prepare yarn@3.2.3 --activate

# Install dependencies
RUN yarn install

# Copy the rest of the application files
COPY . .

# Ensure the .next folder is cleaned up (optional)
RUN rm -rf .next

# Build the application
RUN yarn build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
