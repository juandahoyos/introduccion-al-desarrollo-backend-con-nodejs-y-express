var http = require("http");
var url = require("url");
var queryString = require("querystring");
var fs = require("fs");
var log = require('./modules/my-log');
var { countries } = require('countries-list');

var server = http.createServer(function (request, response) {

    var parse = url.parse(request.url);
    console.log("Parse", parse);

    var pathname = parse.pathname;
    var query = queryString.parse(parse.query);
    console.log("query", query);

  if (pathname === "/") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("<html><body><p>HOME PAGE</p></body></html>");
    response.end();
  } else if (pathname === "/exit") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("<html><body><p>BYE</p></body></html>");
    response.end();
  } else if (pathname === "/country") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify(countries[query.code]));
    response.end();
  } else if (pathname === "/info") {
    var result = log.info(pathname);
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(result);
    response.end();
  } else if (pathname === "/error") {
    var result = log.error(pathname);
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(result);
    response.end();
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write("<html><body><p>NOT FOUND</p></body></html>");
    response.end();
  }
});

server.listen(4000);

console.log("running on 4000");