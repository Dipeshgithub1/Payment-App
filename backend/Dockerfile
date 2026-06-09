FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.env ./.env

ARG MONGODB_URL
ARG JWT_SECRET
ARG FRONTEND_URL
ENV MONGODB_URL=$MONGODB_URL
ENV JWT_SECRET=$JWT_SECRET
ENV FRONTEND_URL=$FRONTEND_URL
ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "const http = require('http'); \
  http.get('http://localhost:3000/health', {timeout: 2000}, (res) => { \
    process.exit(res.statusCode === 200 ? 0 : 1); \
  }).on('error', () => process.exit(1));"

CMD ["npm","start"]
