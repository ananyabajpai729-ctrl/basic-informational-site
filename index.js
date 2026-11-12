const http = require('http');
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res)=>{
    let filePath = '';

    switch (req.url) {
    case '/':
    case '/index':
      filePath = path.join(__dirname, 'index.html');
      break;
    case '/about':
      filePath = path.join(__dirname, 'about.html');
      break;
    case '/contact-me':
      filePath = path.join(__dirname, 'contact-me.html');
      break;
    default:
      filePath = path.join(__dirname, '404.html');
      break;
  }
  fs.readFile(filePath, (err, content)=>{
    if(err){
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error');
    }else{
        const statusCode = req.url === '/' || req.url === '/index' || req.url === '/about' || req.url === '/contact-me' ? 200 : 404;
        res.writeHead(statusCode, { 'Content-Type': 'text/html' });
        res.end(content, 'utf8');
    }
  });

});
const PORT = 8080;
server.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})