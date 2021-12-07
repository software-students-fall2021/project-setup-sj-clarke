#!/bin/bash

docker stop tripsplit_frontend
echo " >>> Frontend stopped <<<"
docker stop compfood_backend
echo " >>> Backend stopped <<<"

docker container rm tripsplit_frontend
docker container rm tripsplit_backend
echo " >>> Cleaned up containers <<<"