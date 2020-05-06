const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.express.use(cookieParser());

//1. decode the JWT so we can get the user Id on each request

// 2. Create a middleware that populates the user on each request

server.start(
	{
		cors: {
			credentials: true,
			origin: process.env.FRONTEND_URL
		}
	},
	(deets) => {
		console.log(`Server is now running on port http://localhost:${deets.port}`);
	}
);
