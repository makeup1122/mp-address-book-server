const Router = require('koa-router')
const db = require("./sqlite")
// 路由实例
const router = new Router()

router.all('/*', async function(ctx, next){
    await next()
    console.log(ctx.method+" - " + ctx.path +"   [" + ctx.status + "]   " + JSON.stringify(ctx.body))
    // 通用全匹配规则
})

/**
 * 获取全部地址列表(暂不分页)
 */
router.get('/address/list', async function(ctx, next){
    await db.getAll({page:1}).then(function(rows){ctx.body=rows}).catch(function(err){result = err;})
    next();
})

/**
 * 获取个人信息
 */
router.get('/address/myself', function(ctx, next){
})

/**
 * 更新个人信息
 */
router.post('/address/myself', async function(ctx, next){
    let data = {
        $truename:'dd', 
        $mobile: '123' ,
        $city: 'ddddddd',
        $recent: '1231fsdf2f222',
        $create_time: '333', 
        $update_time: 'daqweqeqweq',
        $wx_id: '312312',
        $wx_name: '321312'
    };
    await db.insertInfo(data).then(function(lastID){
        ctx.body= {
            lastID: lastID
        }
    }).catch(function(err){
        console.log(err);
    })
    next();
})

/**
 * 删除个人信息
 */
router.del('/address/myself', function(ctx, next){
    // TODO 
})

/** 
 * 获取OPENID
*/
router.post('/wx/encryptOpenid',function(ctx, next){
    
})
module.exports = router