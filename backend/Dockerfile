# # STAGE 1:Builder
# FROM rust:1.92.0-bookworm as builder

# WORKDIR /app

# #Install build dependencies (needed for reqwest/OpenSSL)
# RUN apt-get update && apt-get install -y pkg-config libssl-dev && rm -rf /var/lib/apt/lists/*

# # Copy the source code
# COPY . .

# # Bulid in release mode
# RUN cargo build --release

# # STAGE 2: Runtime
# FROM debian:bookworm-slim


# # Install runtime dependencies (openSSL/CA certificates)
# RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*


# # Copy the binary from the builder stage(Matches Cargo.toml name: axum_streamger)
# COPY --from=builder /app/target/release/axum_streamger /usr/local/bin/app

# # Copy the video file correctly
# COPY assets ./assets

# # Expose the port
# ENV PORT=8000
# EXPOSE 8000

# # Run the app
# CMD ["app"]

# ======================
# STAGE 1: Builder
# ======================
FROM rust:1.92.0-bookworm AS builder

WORKDIR /app

# No OpenSSL needed anymore 🎉
# pkg-config can also be removed unless another crate needs it
# (keeping it out for now)
# RUN apt-get update && apt-get install -y pkg-config && rm -rf /var/lib/apt/lists/*

# Copy source
COPY . .

# Build in release mode
RUN cargo build --release


# ======================
# STAGE 2: Runtime
# ======================
FROM debian:bookworm-slim

# Only CA certs are needed for HTTPS
RUN apt-get update && \
    apt-get install -y ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the binary
COPY --from=builder /app/target/release/axum_streamger /usr/local/bin/app

# Copy assets
COPY assets ./assets

# Runtime config
ENV PORT=8000
EXPOSE 8000

CMD ["app"]


