'use strict';

var conf = {
    serverHost : 'http://localhost:8080'
};

var _common =  {
    //网络请求
    request : function (param) {
        $.ajax({
            type: param.method || 'get',
            url : param.url || '',
            dataType : param.type || 'json',
            data : param.data || '',
            success : function (res) {
                //请求成功
                if (200===res.code){
                    typeof param.success === 'function' && param.success(res.data,res.msg)
                }
                //未登录
                else if (10 === res.code) {
                    _this.doLogin();
                }
                else if(-1===res.code){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error : function (err) {
                typeof param.error === 'function' && param.error(res.statusText);
            }
        })
    },
    //获取服务器地址
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    //获取url参数
    getUrlParam : function(name){
        // ^表示开始   ^&表示非&   $表示结束
        var reg = new RegExp('(^|&)'+name+'=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //成功提示
    successTips : function(msg){
        alert(msg||'操作成功！');
    },
    //错误提示
    errorTips : function(msg){
        alert(msg||'哪里不对了~');
    },
    //字段的验证，支持是否为空、手机、邮箱
    validate : function(value,type){
        var value = $.trim(value);
        //非空验证
        if ('require' === type) {
            return !!value;
        }
        //手机号验证
        if ('phone' === type) {
            return /^1\d{10}$/.test(value);
        }
        //邮箱格式验证
        if ('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //统一登陆
    doLogin : function () {
        window.location.href = './login.html?redirect='+encodeURIComponent(window.location.href);
    },
    goHome : function () {
        window.location.href = './index.html';
    }
};