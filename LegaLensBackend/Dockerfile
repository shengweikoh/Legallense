# Use an official Java runtime as a parent image
FROM maven:3.9.8-eclipse-temurin-17 AS build

# Create a directory for your app
WORKDIR /app

# Copy everything from the backend folder into the container
COPY . /app

# Build your application (Maven example)
# If you're using Gradle, adapt accordingly
RUN ./mvnw clean install -DskipTests

# Run the Spring Boot app
CMD ["java", "-jar", "target/LegaLensBackend-0.0.1-SNAPSHOT.jar"]
