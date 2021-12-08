#!/bin/bash

cd front-end

docker run --name tripsplit_frontend --publish 3000:3000 gbs278/tripsplit-frontend:latest >/dev/null &
echo "Frontend started"

cd ..
cd back-end

docker run --name tripsplit_backend --volume $(pwd)/.env:/root/.env --publish 5000:5000 gbs278/tripsplit-backend:latest >/dev/null &
echo "Backend started"

