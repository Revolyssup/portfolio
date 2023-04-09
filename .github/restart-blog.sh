#!/bin/bash
CONTAINER_NAME="blog"
docker stop $CONTAINER_NAME
docker rm $CONTAINER_NAME	
docker pull revoly/blog
docker container run --name $CONTAINER_NAME -d -p 8081:80 revoly/blog
