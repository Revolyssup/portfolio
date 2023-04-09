#!/bin/bash
CONTAINER_NAME="portfolio"
docker stop $CONTAINER_NAME
docker rm $CONTAINER_NAME	
docker pull revoly/portfolio
docker container run --name $CONTAINER_NAME -d -p 8080:80 revoly/portfolio
