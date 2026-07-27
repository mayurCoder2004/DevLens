FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

# Install dependencies
RUN npm ci

# Copy application source
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Give ownership to the node user
RUN chown -R node:node /app

# Run as non-root user
USER node

EXPOSE 5000

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]