let fs = require("fs");
const ControlModel = require("../model/ControlModel.js");
let qs = require("qs");
const url = require('url');

class Controller{
    constructor() {
        this.control = new ControlModel();
        this.editButton = (obj) => {
            return `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" onclick='getEditButton(${obj})'>Edit</button>`;
        }
    }

    showPageList(req,res){
        this.control.getCity().then((dataDB) => {
            readFile(req,res,'./view/index.html').then(data => {
                let html = '';
                dataDB.forEach((item,index)=>{
                    html += '<tr>'
                    html += `<td>${index+1}</td>`
                    html += `<td><a href="/list/detail?id=${item.id}" style="color: black">${item.name}</a></td>`
                    html += `<td>${item.region}</td>`
                    html += `<td>
                            <a href="/list/delete?id=${item.id}" class="btn btn-danger">Delete</a>
                            ${this.editButton(JSON.stringify(item))}
                            </td>`
                    html += '</tr>'
                })
                data = data.replace('{list}', html);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            })
        })
    }

    deleteCity(id,req,res) {
        this.control.deleteCity(id).then(data => {
            res.writeHead(301, {Location: `http://localhost:8080/list`})
            res.end();
        })
    }

    showPageDetails(id,req,res) {
        this.control.getCityById(id).then(dataDB => {
            readFile(req, res,'./view/detailCity.html').then(data => {
                data = data.replace('{city}',dataDB[0].name);
                data = data.replace('{nameCity}',dataDB[0].name);
                data = data.replace('{region}',dataDB[0].region);
                data = data.replace('{area}',dataDB[0].area);
                data = data.replace('{populate}',dataDB[0].populate);
                data = data.replace('{GDP}',dataDB[0].GDP);
                data = data.replace('{describe}',dataDB[0].describeCity);
                data = data.replace('<a href="">{delete}</a>', `<a href="/list/delete?id=${dataDB[0].id}" class="btn btn-danger">Delete</a>`);
                data = data.replace('<a href="">{Chinh sua}</a>', `${this.editButton(JSON.stringify(dataDB[0]))}`);
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            })
        })

    }

    addCity(req,res){
        let data = ''
        req.on('data', chunk => {
            data += chunk
        })
        req.on('end', () => {
            const city = qs.parse(data);
            this.control.addCityQuery(city.addName, city.addRegion, city.addArea,city.addPopulate,city.addGDP, city.addDescribe).then(data =>{
                res.writeHead(301, {Location: `http://localhost:8080/list`});
                res.end();
            }).catch(err =>{
                readFile(req,res,'./view/add.html').then(data1 =>{
                    data1 = data1.replace('<p style="color: red; display: none">Nhap Sai Truong</p>','<p style="color: red; display: block">Nhap Sai Truong</p>')
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(data1);
                    res.end();
                })
            })
        })
    }

    showPageAdd(req, res) {
        readFile(req,res,'./view/add.html').then(data => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        })
    }

    editCity(req,res){
        let data = ''
        req.on('data', chunk => {
            data += chunk
        })
        req.on('end', () => {
            const product = qs.parse(data);
            this.control.editCityQuery(product.editId,product.editName, product.editRegion, product.editArea, product.editPopulate,product.editGDP, product.editDescription).then(data1 =>{
                res.writeHead(301, {Location: `http://localhost:8080/list`});
                res.end();
            })
        })
    }


}

module.exports = Controller;

function readFile(req, res, pathFile) {
    return new Promise((resolve, reject) => {
        fs.readFile(pathFile, 'utf-8', (err, data) => {
            if(err){
                reject(err.message);
            }else {
                resolve(data);
            }
        })
    })
}