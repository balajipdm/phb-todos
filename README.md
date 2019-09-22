## PHB Todos (CRUD) - MERN Stack

## Start Application

```bash
# Install server dependencies
npm install

# Run Unit Tests
npm test

# Install frontend dependencies
cd frontend
npm install

# Run Express Server & React from root in Dev Environment
npm run start

# Build for production
cd frontend
npm run build
```

##### API Routes
* Register (POST) - http://localhost:5000/api/users
* Login (POST) - http://localhost:5000/api/users
* Get User (GET) - http://localhost:5000/api/auth
* Todo List (GET) - http://localhost:5000/api/todos
* Add Todo (POST) - http://localhost:5000/api/todos
* View Todo (GET) - http://localhost:5000/api/todos/5d85e7f941caf60ccc4b8c9c
* Update Todo (PUT) - http://localhost:5000/api/todos/5d85e7f941caf60ccc4b8c9c
* Delete Todo (DELETE) - http://localhost:5000/api/todos/5d85e7f941caf60ccc4b8c9c

##### Frontend Routes
* Register - http://localhost:3000/register
* Login - http://localhost:3000/login
* Todo List - http://localhost:3000/todos
* New Todo - http://localhost:3000/todos/new
* Update Todo - http://localhost:3000/todos/update/5d85e7f941caf60ccc4b8c9c

#### Author
Balaji Peddamuthu <balaji.pdm@gmail.com>

#### Version
1.0.0

### License
This project is licensed under the ISC License

```
# You can change default.json file in config folder if you want

# this file is located in config/default.json

# you can modify uri of the mongodb connection if you want, I have used MongoDB Atlas (Cloud Free Tier - DaaS [Data as a Service])

 "mongoURI": "mongodb://localhost/phb-todos",

```