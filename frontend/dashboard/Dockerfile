# Step 1: Use a base Node.js image for the build stage
FROM node:18-alpine AS build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Step 4: Copy the rest of the application files
COPY . .

# Step 5: Set execute permissions for react-scripts (if necessary)
RUN chmod +x node_modules/.bin/react-scripts

# Step 6: Build the app for production
RUN npm run build

# Step 7: Use an Nginx image to serve the built app
FROM nginx:alpine

# Step 8: Copy the build files from the build stage to the Nginx container
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose port 80 for Nginx to serve the app
EXPOSE 80

# Step 10: Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
