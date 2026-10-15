// server.js
import jsonServer from "json-server";
const server = jsonServer.create();
const router = jsonServer.router("src/db.json");
const middlewares = jsonServer.defaults();

server.use((req, res, next) => {
	setTimeout(next, 500);
});

server.use(middlewares);
server.use(router);

server.listen(3005, () => {
	console.log("JSON Server is running with delay");
});
