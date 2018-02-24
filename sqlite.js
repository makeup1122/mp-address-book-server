var sqlite3 = require('sqlite3').verbose();

// 创建或打开数据库
var db = new sqlite3.Database('address-book.db',sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE)

// 创建表结构
db.run('CREATE TABLE content(id INT PRIMARY KEY NOT NULL, truename TEXT, mobile TEXT, city TEXT, recent TEXT, create_time INT, update_time INT, wx_id TEXT, wx_name TEXT);',
    {},
    function(error){
        if(!error){
            console.log(error);
        }
    });
// 获取全部数据
exports.getAll = function(query){
    return new Promise(function(resolve,reject){
        db.all("select * from content", {}, function(err, rows){
            if(!err){
                resolve(rows)
            }else{
                reject(err);
            }
        })
    })
}

// 根据微信用户名获取信息
exports.getByName = function(name){

}

// 根据微信用户名更新信息
exports.updateByName = function(name, data){

}
