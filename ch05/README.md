# MongoDB

	mongosh -port 27017 -authenticationDatabase "admin" -u "root" -p

# Mongo Express
You access it by pointing your browser to the url [http:\\localhost:8081](http:\\localhost:8081). You will be prompted to enter a login and a password : you type the value defined for MONGO_EXPRESS_USERNAME and MONGO_EXPRESS_PASSWORD in the .env file.

# Curl
create account:

	curl -d '{"name":"AccName1","number":"Ac21345","type":"root","status":"new"}' localhost:3001/v1/accounts

get all accounts:

	curl localhost:3001/v1
