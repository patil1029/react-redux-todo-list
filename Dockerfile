FROM node:20.19.1-alpine AS frontend-build

# Copy the frontend code and the related dependencies
WORKDIR /
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./

# Install frontend dependencies
RUN yarn

# Build the frontend
COPY / .
RUN yarn build


# Create the frontend image
FROM node:20.19.1-alpine AS frontend

WORKDIR /app
COPY --from=frontend-build /frontend/.output ./

# Expose port 3001 and run the frontend server
EXPOSE 3001
CMD ["node", "server/index.mjs"]