# Use the latest Node.js image
FROM node:latest

# Set working directory
WORKDIR /app

# Enable Corepack and set the project Yarn version
RUN corepack enable && corepack prepare yarn@3.2.3 --activate

COPY . .

RUN yarn add sharp

RUN yarn 



# Expose application port
EXPOSE 3000

# Start the development server
CMD ["yarn", "start"]
