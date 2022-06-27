const http = require('http');
const url = require('url');
const PORT = 8080;
const control = require('./controller/Controller.js')

let server = http.createServer(function (req, res) {
    let parseUrl = url.parse(req.url, true);
    let path = parseUrl.pathname;
    let trimPath = path.replace(/^\/+|\/+$/g, '');
    let chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notFound;
    chosenHandler(req, res);

});

server.listen(PORT, function () {
    console.log('server running at localhost: ' + PORT)
});

let handlers = {};

handlers.list = function (req, res) {
    let contr = new control();
    if (req.method === 'GET') {
        contr.showPageList(req, res);
    } else {
        contr.editCity(req, res);
    }
}

handlers.notFound = function (req, res) {

}

handlers.delete = function (req, res) {
    let contr = new control();
    const urlPath = url.parse(req.url, true);
    let queryString = urlPath.query;
    let index = queryString.id;
    contr.deleteCity(index,req, res);
}

handlers.details = function (req, res) {
    let contr = new control();
    const urlPath = url.parse(req.url, true);
    let queryString = urlPath.query;
    let index = queryString.id;
    contr.showPageDetails(index,req, res);
}

handlers.add = function (req, res) {
    let contr = new control();
    if (req.method === 'GET') {
        contr.showPageAdd(req, res);
    }else{
        contr.addCity(req, res);
    }
}

let router = {
    'list' : handlers.list,
    'list/delete' : handlers.delete,
    'list/detail': handlers.details,
    'list/add' : handlers.add,
}
