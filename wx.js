const http = require('https')
const querystring = require('querystring')
const WXBizDataCrypt = require('./WXBizDataCrypt')
const config = require('./config')

exports.getSessionKey = function(temp_code) {
    return new Promise(function(resolve,reject){
        let params = {
            appid: config.WX.AppID,
            secret: config.WX.AppSercet,
            js_code: temp_code,
            grant_type: 'authorization_code'
        };
        let params_string = querystring.stringify(params);
        
        const options = {
            protocol: 'https:',
            port: 443,
            hostname: 'api.weixin.qq.com',
            method: 'GET',
            path: '/sns/jscode2session?' + params_string
          };
        console.log(`path: ${options.path}`)
        var req = http.request(options,(res)=>{
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                console.log(`响应主体: ${chunk}`);
                resolve(chunk)
            });
            res.on('end', () => {
                console.log('响应中已无数据。');
            });
        })
        req.on('error', (e) => {
            reject(e)
            console.error(`请求遇到问题: ${e.message}`);
        });
        req.end();
    })
}
exports.decryptData = function(encryptData,iv) {
    return new Promise(function(resolve, reject) {
        var pc = new WXBizDataCrypt(config.WX.AppID, session_Key)
        var cryptedData = pc.decryptData(encryptedData , iv)
        // console.log('解密后 data: ', cryptedData)
        resolve(cryptedData);
    })
}