var http = require('http')

http.createServer((request, response)=>{
    response.writeHead('200', {'Content-Type': 'text/plain'})
    response.end('Hello world\n')
}).listen(8899)

console.log('server running at 127.0.0.1:8899');