# Use the official Node.js v18 image as the base image
FROM node:18-alpine

# Create a new directory for the app
WORKDIR /app

# Copy all files to the container
COPY . .

# Update the package manager
RUN apk update

# Install the app's dependencies
RUN yarn install

# Build the app
RUN yarn build

# Remove the dev dependencies
RUN yarn autoclean --production

# Start the app using the built code
CMD ["yarn", "start"]
