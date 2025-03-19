# Use an official Java runtime as a parent image
FROM maven:3.9.8-eclipse-temurin-17 AS build

# Set working directory
WORKDIR /app

# Copy your project files
COPY . /app

# Build your application (adjust if using Maven wrapper or not)
RUN ./mvnw clean install -DskipTests

# Copy the startup script and make sure it is executable
COPY startup.sh /app/startup.sh
RUN chmod +x /app/startup.sh

# Expose the port if needed (e.g., 8080)
EXPOSE 8080

# Use the startup script as the entrypoint
CMD ["/app/startup.sh"]