FROM node:latest

WORKDIR /app

COPY . .

RUN corepack enable && corepack prepare yarn@stable --activate

RUN yarn install

RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.

EXPOSE 8000

CMD ["yarn", "start"]
