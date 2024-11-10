FROM node:latest

WORKDIR /app/medusa-storefront

COPY . .

RUN corepack enable && corepack prepare yarn@3.2.3 --activate

RUN rm -rf .next

RUN yarn

RUN yarn build

# Expose application port
EXPOSE 8000

# Start the development server
CMD ["yarn", "start"]
