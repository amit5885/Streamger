# ======================
# STAGE 1: Builder
# ======================
FROM node:20-bookworm AS builder
WORKDIR /app

# Enable pnpm
RUN corepack enable

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the TanStack Start application
RUN pnpm build

# ======================
# STAGE 2: Runtime
# ======================
FROM node:20-bookworm-slim
WORKDIR /app

# Enable pnpm in runtime stage
RUN corepack enable

# Copy package files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

# Copy built application output from builder
COPY --from=builder /app/.output ./.output

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Start the application using the npm script
CMD ["pnpm", "start"]
