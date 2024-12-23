//console.log('测试写出日志'); //输出日志

//$notification.post('title标题', 'subTitle子标题子标题子标题','body内容内容内容内容') //用于通知栏提醒




//惠头条邀请码 51830362 


var $iosrule = iosrule();//声明必须
var app = "起点读书";


var rdurl = $iosrule.read("rdurl");
var wzbd = $iosrule.read("jlsp");
var spbd = $iosrule.read("ewsp");
var xspbd = $iosrule.read("bxysp");


task();


function task() {


    setTimeout(function () {
        asp();
    }, 1 * 100);

    setTimeout(function () {
        bsp();
    }, 33 * 1000);


    setTimeout(function () {
        csp();
    }, 66 * 1000);



}


//文章阅读
function asp() {


    const llUrl1 = { url: rdurl,headers: { "Content-Type": "application/json"}, body: xgbd(aspbd) };

    $iosrule.post(llUrl1, function (error, response, data) {

        console.log("[每日福利]:" + data);

        var obj = JSON.parse(data);

        if (obj.statusCode == 200) {
            
            console.log("[每日福利视频]:" + obj.incCredit );
            $iosrule.notify(app,"[每日视频福利]:" + obj.incCredit,"");
            
           
        }else{
            console.log("[每日视频失败]:" + obj.statusCode );
            $iosrule.notify(app,"[每日视频失败]:" + obj.statusCode,"");

        }
            
    })


}



function bsp() {



    const llUrl1 = { url: rdurl,headers: { "Content-Type": "application/json"}, body: nbd };

    $iosrule.post(llUrl1, function (error, response, data) {

        console.log("[额外视频返回数据]:" + data);

        var obj = JSON.parse(data);

        if (obj.statusCode == 200) {
            
            console.log("[额外视频奖励]:" + obj.incCredit );
            $iosrule.notify(app,"[额外视频奖励]:" + obj.incCredit,"");
            
           
        }else{
            console.log("[额外视频失败]:" + obj.statusCode );
            $iosrule.notify(app,"[额外视频失败]:" + obj.statusCode,"");
        }
            
    })


}



function csp() {

    

    const llUrl1 = { url: rdurl,headers: { "Content-Type": "application/json"}, body: nbd };

    $iosrule.post(llUrl1, function (error, response, data) {

        console.log("[额外不视频数据]:" + data);

        var obj = JSON.parse(data);

        if (obj.statusCode == 200) {
            
            console.log("[额外不视频奖励]:" + obj.incCredit );
            $iosrule.notify(app,"[额外不视频奖励]:" + obj.incCredit,"");
            
           
        }else{
            console.log("[额外不视频失败]:" + obj.statusCode );
            $iosrule.notify(app,"[额外不视频失败]:" + obj.statusCode,"");

        }
            
    })


}









function iosrule() {
    const isRequest = typeof $request != "undefined"
    const isSurge = typeof $httpClient != "undefined"
    const isQuanX = typeof $task != "undefined"
    const notify = (title, subtitle, message) => {
        if (isQuanX) $notify(title, subtitle, message)
        if (isSurge) $notification.post(title, subtitle, message)
    }
    const write = (value, key) => {
        if (isQuanX) return $prefs.setValueForKey(value, key)
        if (isSurge) return $persistentStore.write(value, key)
    }
    const read = (key) => {
        if (isQuanX) return $prefs.valueForKey(key)
        if (isSurge) return $persistentStore.read(key)
    }
    const get = (options, callback) => {
        if (isQuanX) {
            if (typeof options == "string") options = { url: options }
            options["method"] = "GET"
            $task.fetch(options).then(response => {
                response["status"] = response.statusCode
                callback(null, response, response.body)
            }, reason => callback(reason.error, null, null))
        }
        if (isSurge) $httpClient.get(options, callback)
    }
    const post = (options, callback) => {
        if (isQuanX) {
            if (typeof options == "string") options = { url: options }
            options["method"] = "POST"
            $task.fetch(options).then(response => {
                response["status"] = response.statusCode
                callback(null, response, response.body)
            }, reason => callback(reason.error, null, null))
        }
        if (isSurge) $httpClient.post(options, callback)
    }
    const end = () => {
        if (isQuanX) isRequest ? $done({}) : ""
        if (isSurge) isRequest ? $done({}) : $done()
    }
    return { isRequest, isQuanX, isSurge, notify, write, read, get, post, end }
};
