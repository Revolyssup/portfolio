#!/bin/bash
docker stop "$(docker ps -a -q)"
docker rm "$(docker ps -a -q)"	
echo "all containers deleted. Recreating with fresh image"
docker pull revoly/portfolio
docker pull revoly/blogs
docker container run -d -p 8080:80 revoly/portfolio
docker container run -d -p 8081:80 revoly/blog