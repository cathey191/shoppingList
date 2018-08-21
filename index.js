const http = require('http');
const fs = require('fs');
const path = require('path');
const data = require('./data/productPrice.json');

var server = http.createServer(function(request, response) {
	if (request.method === 'GET') {
		if (request.url === '/' || request.url === '/index') {
			fs.readFile('./public/index.html', 'UTF-8', function(error, contents) {
				if (error) {
					console.log('Error getting page data');
					console.log(error);
				} else {
					response.writeHead(200, { 'Content-Type': 'text/html' });
					response.end(contents);
				}
			});
		} else if (request.url === '/basket') {
			fs.readFile('./public/basket.html', 'UTF-8', function(error, contents) {
				if (error) {
					console.log('Error getting page data');
					console.log(error);
				} else {
					response.writeHead(200, { 'Content-Type': 'text/html' });
					response.end(contents);
				}
			});
		} else if (request.url.match(/.css$/)) {
			var cssPath = path.join(__dirname, 'public', request.url);
			var cssStream = fs.createReadStream(cssPath, 'UTF-8');
			response.writeHead(200, { 'Content-Type': 'text/css' });
			cssStream.pipe(response);
		} else if (request.url.match(/.js$/)) {
			var jsPath = path.join(__dirname, 'public', request.url);
			var jsStream = fs.createReadStream(jsPath, 'UTF-8');
			response.writeHead(200, { 'Content-Type': 'text/js' });
			jsStream.pipe(response);
		} else if (request.url === '/allProducts') {
			response.writeHead(200, { 'Content-Type': 'text/json' });
			response.end(JSON.stringify(data));
		} else if (request.url === '/inStock') {
			stock(response, true);
		} else if (request.url === '/outStock') {
			stock(response, false);
		}
	} else if (request.method === 'POST') {
	}
});
server.listen(3000);

function stock(response, boolean) {
	var stock = data.filter(function(item) {
		return item.inStock === boolean;
	});
	response.end(JSON.stringify(stock));
}
