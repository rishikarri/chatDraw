// INCLUDE A STATIC SERVER TO SERVE UP OUR FILES
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8081, ()=>{
    console.log('Static server is running on port 8081')    
});