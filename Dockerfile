# Use Node.js with Debian (which supports Prisma)
FROM node:18-bullseye

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for efficient caching)
COPY package.json package-lock.json ./

# Install dependencies (excluding dev dependencies)
RUN npm ci --omit=dev

# Copy the entire project
COPY . .

# Generate Prisma client inside the container
RUN npx prisma generate

# Set Prisma binary targets to match the container OS
ENV PRISMA_CLI_BINARY_TARGETS="debian-openssl-3.0.x"

# Expose the application port
EXPOSE 3000

# Ensure Prisma migrations are applied before starting the app
ENTRYPOINT ["/bin/sh", "-c", "npx prisma migrate deploy && npm start"]
