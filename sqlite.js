var sqlite3 = require('sqlite3').verbose();

// 创建或打开数据库
var db = new sqlite3.Database('address-book.db',sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE)

// 创建表结构
db.run('CREATE TABLE tablelist(primary INTEGER PRIMARY KEY AUTOINCREMENT, openid TEXT, tablename TEXT);', {},
    function(err){
        if(!err){
            console.log(err);
        }
    });

// 根据openId获取通讯录列表
exports.getTables = function(body){
    return new Promise(function(resolve,reject){
        db.run('SELECT primary,tableName FROM tablelist WHERE openid=$openid;', body, function(err,rows){
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
        db.run('INSERT INTO tablelist VALUES (null, $openid, $tablename);', body, function(err,rows){
            if(!err){
                console.log(rows)
                resolve(body)
            }else{
                reject(err)
            }
        })
    })
}

// 创建新的通讯录表结构
exports.createTable = function(body){
    return new Promise(function(resolve,reject){
        db.run('CREATE TABLE $tablename(primary INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, mobile TEXT, city TEXT, status TEXT);', body,
            function(err, rows){
                if(!err){
                    resolve(rows)
                }else{
                    reject(err)
                }
            }
        )
    })
}

// 获取选定的通讯录详细信息
exports.getDetail = function(body){
    return new Promise(function(resolve,reject){
        db.run('SELECT primary,name,mobile,city,status FROM $tablename;', body, function(err, rows){
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
        db.run('INSERT INTO $tablename VALUES (null, $name, $mobile, $city, $status)', body, function(err, rows){
            if(!err){
                console.log(rows)
                resolve(body)
            }else{
                reject(err)
            }
        })
    })
}

// 修改选定的通讯录中的详细信息
exports.updateDetail = function(body){
    return new Promise(function(resolve,reject){
        db.run('UPDATE $tablename SET $modifykey=$newcontent where primary=$modifyid', body, function(err, rows){
            if(!err){
                console.log(rows)
                resolve(body)
            }else{
                reject(err)
            }
        })
    })
}

// 创建新用户
exports.insertInfo = function(data) {
    return new Promise(function(resolve, reject){
        data.$create_time = new Date().getTime();
        data.$update_time = '';
        db.run('INSERT INTO content VALUES (null, $truename, $mobile , $city, $recent, $create_time, $update_time, $wx_id, $wx_name);', data, function(err, row){
            if(!err){
                resolve(this.lastID);
            }else{
                reject(err);
            }
        })
    })
}
exports.createOrNothingTODO = function({session_key='',openid=''}){
    db.run('select * from content where openid = $openid',{$openid:openid},function(err,rows){
        if(!err){
            console.log(rows)
        }else{
            
        }
    })
}