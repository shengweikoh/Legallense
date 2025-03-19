#!/bin/bash
set -e

echo "Running startup script..."

# Decode and write FIREBASE_SERVICE_ACCOUNT_KEY if set
if [ -n "$FIREBASE_SERVICE_ACCOUNT_KEY" ]; then
    echo "Decoding FIREBASE_SERVICE_ACCOUNT_KEY..."
    echo "$FIREBASE_SERVICE_ACCOUNT_KEY" | base64 -d > src/main/resources/serviceAccountKey.json
else
    echo "FIREBASE_SERVICE_ACCOUNT_KEY is not set"
fi

# Decode and write VERTEX_API_KEY if set
if [ -n "$VERTEX_API_KEY" ]; then
    echo "Decoding VERTEX_API_KEY..."
    echo "$VERTEX_API_KEY" | base64 -d > src/main/resources/vertex-api-key.json
else
    echo "VERTEX_API_KEY is not set"
fi

echo "Starting the Spring Boot application..."
exec java -jar target/LegaLensBackend-0.0.1-SNAPSHOT.jar