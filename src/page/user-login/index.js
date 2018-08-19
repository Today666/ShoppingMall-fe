"use strict";
require("./index.css");
require("page/common/nav-simple/index.js");
var _ShopM=require("util/ShopM.js");
var _user = require("service/user-service.js");
//表单里的错误提示
var formError = {
    show : function (errMsg) {
        $(".error-item").show().find(".error-msg").text(errMsg);
    },
    hide : function () {
        $(".error-item").hide().find(".error-msg").text("");

    }
};
//page逻辑部分
var page = {
    init : function () {
        this.bindEvent();
    },
    bindEvent : function () {
        var _this=this;
        //点击登录按钮提交
        $("#submit").click(function () {
            _this.submit();
        });
        //按下回车提交
        $(".user-content").keyup(function (e) {
           //keyCode===13表示回车键
            if(e.keyCode===13){
                _this.submit();
            }
        })
    },
    //提交表单
    submit : function () {
        var formData = {
            username : $.trim($("#username").val()),
            password : $.trim($("#password").val())
        },
            //表单验证结果
            validateResult = this.formValidate(formData);
        //验证成功
        if(validateResult.status){
            //提交
            _user.login(formData,function (res) {
                window.location.href = _ShopM.getUrlParam("redirect") || "./index.html";
            }, function (errMsg) {
                formError.show(errMsg);
            })

        }
        //验证失败
        else {
            //错误提示
            formError.show(validateResult.msg);
        }
    },
    //表单验证字段
    formValidate : function (formData) {
        var result = {
            status : false,
            msg : ""
        };
        if(!_ShopM.validate(formData.username,"require")){
            result.msg="用户名不能为空";
            return result
        }
        if(!_ShopM.validate(formData.password,"require")){
            result.msg="密码不能为空";
            return result
        }
        //通过验证，返回正确提示
        result.status = true;
        result.msg = "验证通过";
        return result
    }
};
$(function () {
    page.init();
});