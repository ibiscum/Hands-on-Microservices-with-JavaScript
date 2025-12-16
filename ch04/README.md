# Run MongoDB

	docker run -d --name mongodb-container -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=your_strong_password -v mongodb_data:/data/db mongo:latest

	docker ps  # Should list "mongodb-container" with status "Up"

	docker logs mongodb-container

# MongoDB Compass

	wget https://downloads.mongodb.com/compass/mongodb-compass_1.40.4_amd64.deb -O mongodb-compass.deb

	sudo dpkg -i mongodb-compass.deb

	mongodb-compass

	mongodb://admin:your_strong_password@localhost:27017/
