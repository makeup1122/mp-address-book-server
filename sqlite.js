var sqlite3 = require('sqlite3').verbose();

// 创建或打开数据库
var db = new sqlite3.Database('addressbook.db',sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE)

// 创建表结构
db.run('CREATE TABLE IF NOT EXISTS tablelist (xid INTEGER PRIMARY KEY AUTOINCREMENT, openid TEXT, tablename TEXT);', [],
    function(err){
        if(err){
            console.log(err);
        }
    });

// 根据openId获取通讯录列表
exports.getTables = function(body){
    return new Promise(function(resolve,reject){
        db.all('SELECT xid,tablename FROM tablelist WHERE openid=' + '"' + body.openid + '"', function(err,rows){
            if(!err){
                resolve(rows)
            }else{
                reject(err)
            }
        })
    })
}

// 根据openId插入可获得通讯录信息
exports.insertTables = function(body){
    return new Promise(function(resolve,reject){
        db.serialize(function(){
            // 将可获得的新表插入tablelist中
            db.run('INSERT INTO tablelist (openid,tablename) VALUES (' + '"' + body.openid + '","' + body.tablename + '")', function(err){
                if(!err){
                    console.log(this)
                }else{
                    console.log(err)
                }
            })
            // 根据提交的tablename创建新表
            db.run('CREATE TABLE IF NOT EXISTS ' + '"' + body.tablename + '"' + ' (xid INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, mobile TEXT, city TEXT, status TEXT);', function(err){
                if(!err){
					console.log(this)
                }else{
                    console.log(err)
                }
            })
            // 重新获取tablelist中的可获得表单
            db.all('SELECT xid,tablename FROM tablelist WHERE openid=' + '"' + body.openid + '"', function(err,rows){
                if(!err){
                    resolve(rows)
                    console.log(rows)
                }else{
                    reject(err)
                    console.log(err)
                }
            })
        })
    })
}

// 获取选定的通讯录详细信息
exports.getDetail = function(body){
    return new Promise(function(resolve,reject){
        db.all('SELECT xid,name,mobile,city,status FROM ' + '"' + body.tablename + '"', function(err, rows){
            if(!err){
                resolve(rows)
            }else{
                reject(err)
            }
        })
    })
}

// 插入新的通讯录详细信息
exports.insertDetail = function(body){
    return new Promise(function(resolve,reject){
        db.serialize(function(){
            // 将新的详细信息插入选定表中
            db.run('INSERT INTO ' + '"' + body[0].tablename + '"' + ' (name, mobile, city, status) VALUES (' + '"' + body[0].name + '","' + body[0].mobile +'","' +  body[0].city +'","' +  body[0].status + '")', function(err){
                if(!err){
                    console.log(this)
				}else{
                    console.log(err)
                }
            })
            // 重新获取选定表的全部内容
            db.all('SELECT xid,name,mobile,city,status FROM ' + '"' + body[0].tablename + '"', function(err, rows){
                if(!err){
                    console.log(rows)
                    resolve(rows)
                }else{
                    console.log(err)
                    reject(err)
                }
            })
        })
    })
}

// 修改选定的通讯录中的详细信息
exports.updateDetail = function(body){
    return new Promise(function(resolve,reject){
        db.serialize(function(){
            // 根据新的详细信息修改选定表
            db.run('UPDATE ' + '"' + body.tablename + '"' + ' SET ' + body.modifykey + '=' + '"' + body.newcontent + '"' + ' where xid=' + body.modifyid, function(err){
                if(!err){
                    console.log(this)
                }else{
                    console.log(err)
                }
            })
            // 重新获取选定表的全部内容
            db.all('SELECT xid,name,mobile,city,status FROM ' + '"' + body.tablename + '"', function(err, rows){
                if(!err){
                    console.log(rows)
                    resolve(rows)
                }else{
                    console.log(err)
                    reject(err)
                }
            })
        })
	})
}
