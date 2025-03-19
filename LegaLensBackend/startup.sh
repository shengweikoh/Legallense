#!/bin/bash
set -e

echo "Running startup script..."

# Create a directory to hold the decoded credentials (adjust the path as needed)
mkdir -p /app/config

# Decode and write FIREBASE_SERVICE_ACCOUNT_KEY if set
if [ -n "$FIREBASE_SERVICE_ACCOUNT_KEY" ]; then
    echo "Decoding FIREBASE_SERVICE_ACCOUNT_KEY..."
    echo "$FIREBASE_SERVICE_ACCOUNT_KEY" | base64 -d > /app/config/serviceAccountKey.json
else
    echo "FIREBASE_SERVICE_ACCOUNT_KEY is not set"
fi

# Decode and write VERTEX_API_KEY if set
if [ -n "$VERTEX_API_KEY" ]; then
    echo "Decoding VERTEX_API_KEY..."
    echo "$VERTEX_API_KEY" | base64 -d > /app/config/vertex-api-key.json
else
    echo "VERTEX_API_KEY is not set"
fi

echo "Starting the Spring Boot application..."
exec java -jar /app/target/LegaLensBackend-0.0.1-SNAPSHOT.jar