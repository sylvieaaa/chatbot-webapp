# Use Node.js Alpine as a lightweight base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json /usr/src/app/

# Install global Angular CLI and dependencies
RUN npm install -g @angular/cli && \
    npm install

# Copy the rest of the application code
COPY . /usr/src/app

# Expose the port used by Angular
EXPOSE 4200

# Command to run the Angular app
CMD ["ng", "serve", "--host", "0.0.0.0"]