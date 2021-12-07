#!/bin/bash

cd front-end

echo " >>> Building frontend <<<"
docker build -t tripsplit_frontend -f Dockerfile .
echo " >>> Frontend built <<<"

cd ..
cd back-end

echo " >>> Building backend <<<"
docker build -t tripsplit_backend -f Dockerfile .
echo " >>> Backend built <<<"