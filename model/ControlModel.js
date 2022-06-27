let Database = require('./Database.js');

class ControlModel{
    constructor() {
        this.con = Database.connect();
    }


    getCity(){
        return new Promise((resolve, reject)=>{
            let sql = `SELECT * FROM city `;
            this.con.query(sql, (err, data)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            })
        })
    }

    getCityById(id){
        return new Promise((resolve, reject)=>{
            let sql = `SELECT * FROM city WHERE id = ${id}`;
            this.con.query(sql, (err, data)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            })
        })
    }

    deleteCity(id){
        return new Promise((resolve, reject)=>{
            let sql = `DELETE FROM city WHERE id = ${id}`;
            this.con.query(sql, (err, data)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            })
        })
    }

    addCityQuery(name,region,area,populate,GDP,describe){
        return new Promise((resolve, reject)=>{
            let sql = `INSERT INTO city(name,region,area,populate,GDP,describeCity) VALUES ('${name}', '${region}', ${area},${populate}, ${GDP}, '${describe}')`;
            this.con.query(sql, (err, data)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            })
        })
    }

    editCityQuery(id,name,region,area,populate,GDP,describe){
        return new Promise((resolve, reject)=>{
            let sql = `UPDATE city SET name = '${name}', region = '${region}', area = ${area}, populate = ${populate}, GDP = ${GDP}, describeCity = '${describe}' WHERE id = ${id}`;
            this.con.query(sql, (err, data)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            })
        })
    }


}

module.exports = ControlModel;