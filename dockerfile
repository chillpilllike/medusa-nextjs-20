# Use the latest Node.js image
FROM node:latest

# Set the working directory
WORKDIR /app/medusa-storefront

# Copy only package.json and yarn.lock to leverage Docker layer caching for dependencies
COPY package.json yarn.lock ./

# Enable corepack and set the Yarn version
RUN corepack enable && corepack prepare yarn@3.2.3 --activate

# Install dependencies
RUN rm -rf node_modules .next
RUN yarn

# Copy all application files
# COPY . .

# Build the project
RUN yarn build

# Expose the application port
EXPOSE 8000

# Start the development server
CMD ["yarn", "start"]
