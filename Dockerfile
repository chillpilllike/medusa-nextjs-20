FROM node:latest

WORKDIR /app/medusa-storefront

COPY . .

RUN corepack enable && corepack prepare yarn@3.2.3 --activate

RUN yarn

RUN yarn build

# Expose application port
EXPOSE 3000

# Start the development server
CMD ["yarn", "dev"]
