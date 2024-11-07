FROM node:latest

WORKDIR /app/medusa-storefront

COPY . .

RUN yarn

RUN yarn build

# Expose application port
EXPOSE 3000

# Start the development server
CMD ["yarn", "start"]
