# MongoDB
Attach shell to container.

	mongosh -port 27017 -authenticationDatabase "admin" -u "root" -p "..."

Switch to account-microservice database.

	use account-microservice

Create user with read/write privileges.

	db.createUser({
  		user: "accountUser",
  		pwd: passwordPrompt(), // Securely prompts for password in the shell
  		roles: [
    		{ role: "readWrite", db: "account-microservice" }
  		]
	})

# Mongo Express
You access it by pointing your browser to the url [http:\\localhost:8081](http:\\localhost:8081). You will be prompted to enter a login and a password : you type the value defined for MONGO_EXPRESS_USERNAME and MONGO_EXPRESS_PASSWORD in the .env file.

# Curl
Create account with service.

	curl -H "Content-Type: application/json" -d '{"name":"AccName1","number":"Ac21345","type":"root","status":"new"}' localhost:3001/v1/accounts

Get all accounts.

	curl localhost:3001/v1/accounts

Get account by ID.

	curl localhost:3001/v1/accounts/6946d485b7030ddb47d597a9

Change account by ID.

	curl -H "Content-Type: application/json" -d '{ "name":"updated account", "number":"AE33333" }' localhost:3001/v1/accounts/6946d485b7030ddb47d597a9

