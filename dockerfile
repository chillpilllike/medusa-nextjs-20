# Use the latest Node.js image
FROM node:latest

# Set the working directory
WORKDIR /app/medusa-storefront

# Update and install nano
RUN apt-get update && \
    apt-get install -y nano && \
    rm -rf /var/lib/apt/lists/*

# Copy only package.json and yarn.lock to leverage Docker layer caching for dependencies
COPY package.json yarn.lock ./

# Enable corepack and set the Yarn version
RUN corepack enable && corepack prepare yarn@3.2.3 --activate

# Install dependencies
RUN yarn install

# Remove any old build files
RUN rm -rf .next node_modules

# Copy all application files
COPY . .

# Build the project
RUN yarn build

# Expose the application port
EXPOSE 8000

# Start the development server
CMD ["yarn", "start"]
