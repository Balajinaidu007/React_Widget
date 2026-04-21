# -------- Build stage --------
FROM node:20-alpine AS builder

WORKDIR /app

# Enable corepack for yarn
RUN corepack enable

# Install dependencies
COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --immutable

# Copy source
COPY . .

# IMPORTANT: copy vertex viewer runtime files into build output
RUN yarn build && \
    cp -r node_modules/@vertexvis/viewer/dist/* dist/

# -------- Production stage --------
FROM node:20-alpine AS runner

WORKDIR /app

RUN npm install -g serve

# Copy final build
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]