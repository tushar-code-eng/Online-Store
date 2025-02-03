FROM node:18-bullseye

# Set the working directory
WORKDIR /app

COPY package.json package-lock.json ./

COPY prisma ./prisma


RUN npm ci

COPY . .

ENV NEXT_SKIP_ESLINT=true

ENV DATABASE_URL="postgresql://neondb_owner:npg_zMDbudO79lVo@ep-spring-rain-a4rdsw9o-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"

ENV REDIS_URL="https://keen-terrier-47577.upstash.io"
ENV REDIS_TOKEN="AbnZAAIjcDE0NDYwMzE3NTY0NGY0YTE5YjA0YWI0NGIwMDM1YWViYnAxMA"

ENV KINDE_CLIENT_ID="6ff0bbc06e404a0783974f8a1b3376a3"
ENV KINDE_CLIENT_SECRET="ExOhpcEyOoJGWZHS1fm86OjHh5wki6KzonIvWpNR1gupcVRqzW"
ENV KINDE_ISSUER_URL="https://shoemarketmarshal.kinde.com"
ENV KINDE_SITE_URL="http://localhost:3000"
ENV KINDE_POST_LOGOUT_REDIRECT_URL="http://localhost:3000"
ENV KINDE_POST_LOGIN_REDIRECT_URL="http://localhost:3000"

ENV UPLOADTHING_SECRET="sk_live_90547ba24f6b4ec35364e21eb00e01d41eca20f317e05087c95ad6f42c43e68a"
ENV UPLOADTHING_APP_ID="2ya68wz7tc"

ENV STRIPE_API_KEY="sk_test_51QnPlCA2GUczIOy87M6u0a2GQLvevh9yG6RF0hRsQtprQZQbF8BtDsBQVA9C5dK9HGRw1ieVGGyiI6BUSmLl7dmQ009VZzHYj9"

RUN npm run build

RUN npx prisma generate

ENV PRISMA_CLI_BINARY_TARGETS="debian-openssl-3.0.x"

EXPOSE 3000

ENTRYPOINT ["/bin/sh", "-c", "npx prisma migrate deploy && npm start"]
