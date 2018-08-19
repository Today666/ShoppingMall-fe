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
    data : {
      username : "",
      question: "",
      answer : "" ,
        token : ""
    },
    init : function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadStepUsername();
    },
    bindEvent : function () {
        var _this=this;
        //输入用户名后的下一步按钮点击
        $("#submit-username").click(function () {
            var username =$.trim($("#username").val());
            //用户名存在
            if(username){
                _user.getQuestion(username,function (res) {
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                },function (errMsg) {
                    formError.show(errMsg);
                })
            }
            //用户名不存在
            else {
                formError.show("请输入用户名")
            }
        });
        //输入提示问题答案中的下一步按钮点击
        $("#submit-answer").click(function () {
            var answer =$.trim($("#answer").val());
            //答案存在
            if(answer){
                //检查密码提示问题答案
                _user.checkAnswer({
                    username : _this.data.username,
                    question : _this.data.question,
                    answer : answer
                },function (res) {
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                },function (errMsg) {
                    formError.show(errMsg);
                })
            }
            //答案不存在
            else {
                formError.show("请输入密码提示问题的答案")
            }
        });
        //输入新密码后的下一步按钮点击
        $("#submit-password").click(function () {
            var password =$.trim($("#password").val());
            //密码是否为空
            if(password && password.length >=6){
                //检查密码提示问题答案
                _user.resetPassword({
                    username : _this.data.username,
                    passwordNew : password,
                    forgetToken : _this.data.token
                },function (res) {
                    window.location.href = "./result.html?type=pass-reset";
                },function (errMsg) {
                    formError.show(errMsg);
                })
            }
            //密码不存在
            else {
                formError.show("请输入不少于6位的新密码")
            }
        });

    },
    //加载输入用户名
    loadStepUsername : function () {
        $(".step-username").show();
    },
    //加载输入密码提示问题答案
    loadStepQuestion : function () {
        //清除错误提示
        formError.hide();
        //做容器切换
        $(".step-username").hide()
            .siblings(".step-question").show()
                    .find(".question").text(this.data.question);
    },
    //加载输入password
    loadStepPassword : function () {
        //清除错误提示
        formError.hide();
        //做容器切换
        $(".step-question").hide()
            .siblings(".step-password").show();
    }
};
$(function () {
    page.init();
});