# Use a lightweight Node.js image for building the app
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .
COPY .env .env
COPY nginx.conf  /usr/share/nginx/

# Build the Vite app
RUN npm run build

# Use Nginx to serve the production build
FROM nginx:stable-alpine

# Copy the built app to the Nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
