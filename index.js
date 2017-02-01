// include a static server to serve up our files 



var http = require('http');
// fs stands for file system
var fs = require('fs');

var server = http.createServer((req, res)=>{
	// console.log('Someone connected via HTTP');
	// fs.readFile('index.html', 'utf-8', (error, fileData) =>{
	// 	if (error){
	// 		// respond with a 500 error!
	// 		res.writeHead(500, {'content-type':'text/html'});
	// 		res.end(error);
	// 	}else{
	// 		// the file was able to be read in 
	// 		res.writeHead(200, {'content-type':'text/html'});
	// 		res.end(fileData);
	// 	}

	// })
});

// Include the server version of socketIO and assign it to a variable
var socketUsers = [];
var socketIo = require('socket.io');
// Sockets are going to listen to the server whichi is listening on port 8080; 
var io = socketIo.listen(server);

// Handle socket connections...
// io whenever a socket connects
io.sockets.on('connect', (socket)=>{
	console.log('someone connected by socket!');
	socketUsers.push({
		socketID: socket.id,
		name: 'Anonymous'
	})
	io.sockets.emit('users', socketUsers);

	socket.on('messageToServer', (messageObject)=>{
		console.log('Someone sent a message. It is:', messageObject.message);
		io.sockets.emit('messageToClient',{
			message: messageObject.message,
			date: new Date()
		})
	})

	socket.on('drawingToServer',(drawingData)=>{
		if(drawingData.lastMousePosition !== null){
			io.sockets.emit('drawingToClient', drawingData)
		}
	})
});

server.listen(8080);
console.log('Listening on port 8080');	