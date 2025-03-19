# Use an official Maven image for building
FROM maven:3.9.8-eclipse-temurin-17 AS build

# Set working directory
WORKDIR /app

# Accept build-time arguments for your keys
ARG FIREBASE_SERVICE_ACCOUNT_KEY
ARG VERTEX_API_KEY

# Copy the project files
COPY . /app

# Decode and write JSON files into src/main/resources BEFORE the Maven build
RUN if [ -n "$FIREBASE_SERVICE_ACCOUNT_KEY" ]; then \
        echo "$FIREBASE_SERVICE_ACCOUNT_KEY" | base64 -d > src/main/resources/serviceAccountKey.json; \
    else \
        echo "FIREBASE_SERVICE_ACCOUNT_KEY not provided"; \
    fi && \
    if [ -n "$VERTEX_API_KEY" ]; then \
        echo "$VERTEX_API_KEY" | base64 -d > src/main/resources/vertex-api-key.json; \
    else \
        echo "VERTEX_API_KEY not provided"; \
    fi

# Build the application and package it into a JAR
RUN ./mvnw clean install -DskipTests

# Use a runtime image (for example, a JRE image) for running the application
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/LegaLensBackend-0.0.1-SNAPSHOT.jar /app/LegaLensBackend.jar

# Expose the application port
EXPOSE 8080

# Run the Spring Boot application
CMD ["java", "-jar", "/app/LegaLensBackend.jar"]