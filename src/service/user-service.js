"use strict";
var _ShopM=require("util/ShopM.js");
var _user = {
    //检查登录状态
    checkLogin : function (resolve, reject) {
        _ShopM.request({
            url : _ShopM.getServerUrl("/use/get_user_info.do"),
            method : "POST",
            success : resolve,
            error : reject
        })
    },
    //登出
    logout : function (resolve, reject) {
             _ShopM.request({
                url : _ShopM.getServerUrl("use/logout.do"),
                method : "POST",
                success : resolve,
                error : reject
            })
         }
};
module.exports = _user;