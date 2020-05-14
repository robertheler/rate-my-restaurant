docker rm -f carousel_container
docker rmi carousel
docker build -t carousel .
docker run -p 3002:3002 --name carousel_container -v $(pwd):/src/app