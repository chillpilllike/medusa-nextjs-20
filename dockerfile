FROM node:latest

WORKDIR /app/medusa-storefront

RUN apt-get update && \
    apt-get install -y nano && \
    rm -rf /var/lib/apt/lists/*

# Copy only package.json and yarn.lock first to leverage Docker layer caching for dependencies
COPY package.json yarn.lock ./

# Install dependencies


# Remove old build files (if they exist) and copy new application files
RUN rm -rf /app/*

COPY . .

RUN corepack enable && corepack prepare yarn@3.2.3 --activate

RUN rm -rf .next

RUN yarn install --production

COPY . .

RUN yarn build

# Expose application port
EXPOSE 8000

# Start the development server
CMD ["yarn", "start"]
